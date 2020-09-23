const bodyParser = require("body-parser");

const router = require ("express").Router();
const loginController = require ('../controllers/login-controller');

router.get ('/', loginController.getLogin);

router.post ('/', bodyParser.urlencoded({extended:true}), loginController.postLogin);

module.exports = router;