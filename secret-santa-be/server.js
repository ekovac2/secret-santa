const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
var bcrypt = require("bcryptjs");

const app = express();
var corsOptions = {
  origin: "http://localhost:3000"
};

app.use(cors(corsOptions));

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({
  extended: true
}));

const db = require("./models");
const Op = db.Sequelize.Op;

db.sequelize.sync({force: true}).then(() => {
  initial();
});

function initial() {
  db.role.create({
    id: 1,
    name: "user"
  });
  db.role.create({
    id: 2,
    name: "admin"
  });
  db.user.create({
      name: "Administrator",
      surname: "Adminić",
      username: "admin1",
      password: bcrypt.hashSync("admin123", 8)
    })
    .then(user => {
      user.setConnections(user.id);
      db.role.findAll({
        where: {
          name: {
            [Op.or]: ["admin"]
          }
        }
      }).then(roles => {
        user.setRoles(roles);
      });
    });
}

app.get("/", (req, res) => {
  res.json({
    message: "Welcome to Secret Santa Application."
  });
});

require('./routes/authRoutes')(app);
require('./routes/userRoutes')(app);

const PORT = process.env.PORT || 8081;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});