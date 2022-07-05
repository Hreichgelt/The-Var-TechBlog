const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

class post extends model {}

post.init({});

// {
//     sequelize,
//     freezeTableName: true,
//     underscored: true,
//     modelName: 'gallery',
//   }

module.exports = post;
