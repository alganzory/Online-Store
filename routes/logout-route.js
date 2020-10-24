const router = require("express").Router();
const logoutController = require("../controllers/logout-controller");
const authGuard = require("./guards/auth-guard");

router.all("/", authGuard.isAuth, logoutController.logout);
module.exports = router;
