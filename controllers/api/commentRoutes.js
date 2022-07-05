// @/api/comments
// dependencies
const router = require("express").router();
// const bcrypt = require("bcrypt"); - not being used?
const { user, post, comment } = require("../../models");
const SequelizeStore = require("connect-session-sequelize")(session.Store);
const withAuth = require("../../utils/auth");
