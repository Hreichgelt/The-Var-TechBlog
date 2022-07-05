const { user } = require("../models");

const userData = [
  {
    username: "Bucky",
    email: "F_EmBucky@gmail.com",
    password: "thispassword33",
  },
  {
    username: "Golpher",
    email: "Golpher@gmail.com",
    password: "thispassword33",
  },
  {
    username: "CornHusk",
    email: "CornHusk@gmail.com",
    password: "thispassword33",
  },
  {
    username: "Perdue",
    email: "Perdue@gmail.com",
    password: "thispassword33",
  },
  {
    username: "BuckEye",
    email: "Buckeye@gmail.com",
    password: "thispassword33",
  },
  {
    username: "Spartan",
    email: "Spartan@gmail.com",
    password: "thispassword33",
  },
  {
    username: "Wolverine",
    email: "Wolverine@gmail.com",
    password: "thispassword33",
  },
  {
    username: "Hawkeye",
    email: "Hawkeye@gmail.com",
    password: "thispassword33",
  },
];

const userSeed = () => user.bulkCreate(userData);
module.exports = userSeed;
