const Sequelize = require("sequelize");

module.exports = function (sequelize, DataTypes) {
    const User = sequelize.define("user", {
        name: Sequelize.STRING,
        surname: Sequelize.STRING,
        username: {
            type: Sequelize.STRING,
            unique: true,
        },
        password: Sequelize.STRING,
    })
    return User;
};