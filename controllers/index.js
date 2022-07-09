// router sammy
const router = require("express").Router();

const apiRoutes = require("./api");

// const withAuth = require('../utils/auth');

router.use("./api", apiRoutes);
// router.use('/', withAuth, secrureRoutes)
module.exports = router;
