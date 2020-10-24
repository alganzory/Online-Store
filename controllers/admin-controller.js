const validationResult = require("express-validator").validationResult;
const productsModel = require("../models/products-model");
const ordersModel = require("../models/orders-model");

exports.getAdd = (req, res, next) => {
  res.render("add-product", {
    pageTitle: "Add Product",
    inputErrors: req.flash("inputErrors"),
    isUser: true,
    isAdmin: true,
  });
};

exports.postAdd = (req, res, next) => {
  if (validationResult(req).isEmpty()) {
    productsModel
      .newProduct({
        name: req.body.name,
        price: req.body.price,
        category: req.body.category,
        img: req.file.filename,
        description: req.body.description,
      })
      .then((newProductId) => {
        res.redirect("/product/" + newProductId);
      })
      .catch((err) => next(err));
  } else {
    req.flash("inputErrors", validationResult(req).array());
    res.redirect("/admin/add");
  }
};

exports.getOrders = (req, res, next) => {
  let status = req.query.status;
  let ordersModelPromise;
  let validStatuses = ["pending", "sent", "complete"];

  let search = req.query.search;

  // if filtering:
  if (status && validStatuses.includes(status))
    ordersModelPromise = ordersModel.getOrdersByStatus(status);
  else ordersModelPromise = ordersModel.getAllOrders();

  // get the order from the Database,
  ordersModelPromise
    .then((orders) => {
      if (search) {
        orders = orders.filter((order) => order.username.includes(search));
      }
      res.render("manage-orders", {
        pageTitle: "Manage Orders",
        searchErrors: req.flash("searchErrors")[0],
        isUser: true,
        isAdmin: true,
        orders: orders,
      });
    })
    .catch((err) => next(err));
};

exports.updateStatus = (req, res, next) => {
  let status = req.body.status;
  if (status == undefined) {
    res.redirect("/admin/orders");
  } else {
    ordersModel
      .updateOrderById(req.body.orderId, {
        timeStamp: Date.now(),
        status: status,
      })
      .then(() => {
        res.redirect("/admin/orders");
      })
      .catch((err) => next(err));
  }
};
