// router sammy
const router = require("express").Router();
const apiRoutes = require("./api");
const homeRoute = require('./homeRoutes.js');
const dashRoute = require('./dashboardRoutes.js');
const withAuth = require("../utils/auth");


router.use("/api", apiRoutes);
router.use("/", homeRoute);
router.use("/", withAuth, dashRoute);




module.exports = router;
