const validationResult = require("express-validator").validationResult;
const ordersModel = require("../models/orders-model");
const cartModel = require("../models/cart-model");
const { body } = require("express-validator");

exports.buyOne = (req, res, next) => {
  if (validationResult(req).isEmpty()) {
    let cartId = req.body.cartId;
    cartModel
      .getItemById(cartId)
      .then((item) => {
        return ordersModel.addNewOrder({
          name: item.name,
          price: item.price,
          amount: item.amount,
          userId: item.userId,
          productId: item.productId,
          timeStamp: Date.now(),
          address: req.body.address,
        });
      })
      .then(() => {
        return cartModel.deleteItemById(cartId);
      })
      .then(() => {
        res.redirect("/orders");
      })
      .catch((err) => next(err))
      .catch((err) => next(err))
      .catch((err) => next(err));
  } else {
    req.flash("addressErrors", validationResult(req).array());
    res.redirect("/cart/confirm/" + req.body.cartId); // redirect them to wherever they came from
  }
  // get the info of the item from the cart
  // delete it from the cart
  // add it to the orders
};

exports.buyAll = (req, res, next) => {
  if (validationResult(req).isEmpty()) {
    let userId = req.session.userId;
    cartModel
      .getItemsByUserId(userId)
      .then((items) => ordersModel.addManyOrders(items, req.body.address))
      .then(() => {
        cartModel
          .deleteAllByUserId(userId)
          .then(() => {
            res.redirect("/orders");
          })
          .catch((err) => next(err));
      })
      .catch((err) => next(err))
      .catch((err) => next(err));
  } else {
    req.flash("addressErrors", validationResult(req).array());
    res.redirect("/cart/confirm/all"); // redirect them to wherever they came from
  }
};

exports.getOrders = (req, res, next) => {
  // get the Orders Items of the user
  ordersModel
    .getOrdersByUserId(req.session.userId)
    .then((orders) =>
      res.render("orders", {
        pageTitle: "Orders",
        OrdersErrors: req.flash("ordersErrors")[0],
        isUser: req.session.userId,
        orders: orders,
        isAdmin: req.session.isAdmin,
      })
    )
    .catch((err) => next(err));
};

exports.editOrder = (req, res, next) => {
  if (validationResult(req).isEmpty()) {
    ordersModel
      .updateOrderById(req.body.orderId, {
        timeStamp: Date.now(),
        amount: req.body.amount,
      })
      .then(() => {
        res.redirect("/orders");
      })
      .catch((err) => next(err));
  } else {
    req.flash("ordersErrors", validationResult(req).array());
    res.redirect("/orders"); // redirect them to wherever they came from
  }
};

exports.deleteFromOrder = (req, res, next) => {
  if (validationResult(req).isEmpty()) {
    ordersModel
      .deleteOrderById(req.body.orderId)
      .then(() => {
        res.redirect("/orders");
      })
      .catch((err) => next(err));
  } else {
    req.flash("ordersErrors", validationResult(req).array());
    res.redirect("/orders"); // redirect them to wherever they came from
  }
};
