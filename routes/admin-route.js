const router = require("express").Router();
const bodyParser = require("body-parser");
const adminGuard = require("./guards/admin-guard");
const adminController = require("../controllers/admin-controller");
const multer = require("multer");
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "images");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});
const check = require("express-validator").check;

router.get("/add", adminGuard, adminController.getAdd);
router.post(
  "/add",
  adminGuard,
  multer({ storage: storage }).single("image"),
  check("name").not().isEmpty().withMessage("A name is required"),
  check("price")
    .not()
    .isEmpty()
    .withMessage("A price is required")
    .isFloat({ min: 0.0000000009 })
    .withMessage("The price must be greater than 0"),
  check("description").not().isEmpty().withMessage("A description is required"),
  check("category").not().isEmpty().withMessage("A category is required"),
  check("image").custom((value, { req }) => {
    if (req.file) return true;
    //if a file was uploaded a property .file would be defined
    else throw "An image is required";
  }),
  adminController.postAdd
);

router.get("/orders", adminGuard, adminController.getOrders);

router.post(
  "/orders/update",
  adminGuard,
  bodyParser.urlencoded({ extended: true }),
  adminController.updateStatus
);

module.exports = router;
