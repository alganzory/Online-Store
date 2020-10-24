const router = require("express").Router();
const bodyParser = require("body-parser");
const authGuard = require("./guards/auth-guard");
const check = require("express-validator").check;
const ordersController = require("../controllers/orders-controller");

router.post(
  "/new-one",
  authGuard.isAuth,
  bodyParser.urlencoded({ extended: true }),
  check("address").not().isEmpty().withMessage("Delivery Address is required!"),
  ordersController.buyOne
);

router.post(
  "/new-all",
  authGuard.isAuth,
  bodyParser.urlencoded({ extended: true }),
  check("address").not().isEmpty().withMessage("Delivery Address is required!"),
  ordersController.buyAll
);

router.get("/", authGuard.isAuth, ordersController.getOrders);
module.exports = router;

router.post(
  "/save",
  authGuard.isAuth,
  bodyParser.urlencoded({ extended: true }),
  check("amount")
    .not()
    .isEmpty()
    .withMessage("Quantity is required!")
    .isInt({ min: 1 }),
  ordersController.editOrder
);

router.post(
  "/cancel",
  authGuard.isAuth,
  bodyParser.urlencoded({ extended: true }),
  ordersController.deleteFromOrder
);
