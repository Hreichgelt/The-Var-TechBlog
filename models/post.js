const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

class post extends Model {}

post.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    post_text: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        len: [5],
      },
    },
    user_id: {
      type: DataTypes.INTEGER,
      References: {
        model: "user",
        key: "id",
      },
    },
  },

  {
    sequelize,
    freezeTableName: true,
    underscored: true,
    modelName: "gallery",
  }
);
module.exports = post;
