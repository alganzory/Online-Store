const bodyParser = require("body-parser");

const router = require("express").Router();
const loginController = require("../controllers/login-controller");
const check = require("express-validator").check;
const authGuard = require("./guards/auth-guard");

router.get("/", authGuard.notAuth, loginController.getLogin);

router.post(
  "/",
  authGuard.notAuth,
  bodyParser.urlencoded({ extended: true }),
  check("email")
    .not()
    .isEmpty()
    .withMessage("Email is required!")
    .isEmail()
    .withMessage("Invalid Email format!"),
  check("password")
    .not()
    .isEmpty()
    .withMessage("Password is required!")
    .isLength({ min: 6 })
    .withMessage("Password needs to be at least 6 chatacters"),
  loginController.postLogin
);

module.exports = router;
