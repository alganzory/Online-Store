const bodyParser = require("body-parser");

const router = require("express").Router();
const signupController = require("../controllers/signup-controller");
const check = require("express-validator").check;
const authGuard = require("./guards/auth-guard");

router.get("/", authGuard.notAuth, signupController.getSignup);

router.post(
  "/",
  authGuard.notAuth,
  bodyParser.urlencoded({ extended: true }),
  check("username").not().isEmpty().withMessage("Username can't be blank!"),
  check("email")
    .not()
    .isEmpty()
    .withMessage("Email can't be empty!")
    .isEmail()
    .withMessage("Not a valid Email format!"),
  check("password")
    .not()
    .isEmpty()
    .withMessage("Password can't be empty!")
    .isLength({ min: 6 })
    .withMessage("Password needs to be at least 6 chatacters"),
  check("confirmPassword").custom((value, { req }) => {
    if (value === req.body.password) return true;
    else throw "passwords don't match!";
  }),
  signupController.postSignup
);

module.exports = router;
