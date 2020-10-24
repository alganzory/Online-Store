const router = require("express").Router();

const homeContoller = require("../controllers/home-controller");

router.get("/", homeContoller.getHome);

module.exports = router;
