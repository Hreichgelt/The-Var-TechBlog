// router sammy
const router = require("express").Router();
const apiRoutes = require("./api");
const homeRoute = require('./homeRoutes');
const postRoute = require('./createPostRoutes');

router.use("/api", apiRoutes);
router.use("/", homeRoute);
router.use("/", postRoute);

module.exports = router;
