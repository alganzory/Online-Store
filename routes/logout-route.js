const router = require ("express").Router();
const logoutController =require ("../controllers/logout-controller");
router.all ('/',logoutController.logout);
module.exports= router;