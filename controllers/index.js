// router sammy
const router = require("express").Router();
const apiRoutes = require("./api");
const homeRoute = require('./homeRoutes.js');
const dashRoute = require('./dashboardRoutes.js');


router.use("/api", apiRoutes);
router.use("/", homeRoute);
router.use("/", dashRoute);

router.use((req, res) => {
    res.status(404).end();
});


module.exports = router;
