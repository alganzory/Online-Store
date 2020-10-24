const router = require("express").Router();
const productController = require("../controllers/product-controller");

router.get("/", productController.firstProduct);
router.get("/:id", productController.getProduct);
module.exports = router;