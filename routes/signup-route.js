const bodyParser = require("body-parser");

const router = require ("express").Router();
const signupController = require ('../controllers/signup-controller');

router.get ('/', signupController.getSignup);

router.post ('/', bodyParser.urlencoded({extended:true}), signupController.postSignup);

module.exports = router;