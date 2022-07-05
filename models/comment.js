const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

class comment extends Model {}

comment.init({});

// sequelize,
// freezeTableName: true,
// underscored: true,
// modelName: 'painting',

module.exports = comment;
