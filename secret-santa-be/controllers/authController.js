const db = require("../models");
const config = require("../config/authConfig");

const Op = db.Sequelize.Op;

var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

exports.signup = (req, res) => {
  db.user.create({
      name: req.body.name,
      surname: req.body.surname,
      username: req.body.username,
      password: bcrypt.hashSync(req.body.password, 8)
    })
    .then(user => {
      user.setConnections(user.id);
      if (req.body.roles) {
        db.role.findAll({
          where: {
            name: {
              [Op.or]: req.body.roles
            }
          }
        }).then(roles => {
          user.setRoles(roles).then(() => {
            res.send({
              message: "User was registered successfully!"
            });
          });
        });
      } else {
        user.setRoles([1]).then(() => {
          res.send({
            message: "User was registered successfully!"
          });
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: err.message
      });
    });
};

exports.signin = (req, res) => {
  db.user.findOne({
      where: {
        username: req.body.username
      }
    })
    .then(user => {
      if (!user) {
        return res.status(404).send({
          message: "User Not found."
        });
      }

      var passwordIsValid = bcrypt.compareSync(
        req.body.password,
        user.password
      );

      if (!passwordIsValid) {
        return res.status(401).send({
          accessToken: null,
          message: "Invalid Password!"
        });
      }

      var token = jwt.sign({
        id: user.id
      }, config.secret, {
        expiresIn: 86400 // 24 hours
      });

      var authorities = [];
      user.getRoles().then(roles => {
        for (let i = 0; i < roles.length; i++) {
          authorities.push("ROLE_" + roles[i].name.toUpperCase());
        }
        res.status(200).send({
          id: user.id,
          name: user.name,
          surname: user.surname,
          username: user.username,
          roles: authorities,
          accessToken: token
        });
      });
    })
    .catch(err => {
      res.status(500).send({
        message: err.message
      });
    });
};