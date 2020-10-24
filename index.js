// packages
const express = require("express");
const path = require("path");
const session = require("express-session");
const SessionStore = require("connect-mongodb-session")(session);
const flash = require("connect-flash");

const STORE = new SessionStore({
  uri: "mongodb://localhost:27017/online-store",
  collection: "sessions",
});

// routers
const homeRouter = require("./routes/home-route");
const productRouter = require("./routes/product-route");
const signupRouter = require("./routes/signup-route");
const loginRouter = require("./routes/login-route");
const logoutRouter = require("./routes/logout-route");
const cartRouter = require("./routes/cart-route");
const ordersRouter = require("./routes/orders-route");
const adminRouter = require("./routes/admin-route");
// app
const app = express();

app.use(
  session({
    secret: "Secret encryption message for sessions",
    saveUninitialized: false,
    resave: true,
    store: STORE,
  })
);
app.set("view engine", "ejs");
app.set("views", "views");
app.use(express.static(path.join(__dirname, "assets")));
app.use(express.static(path.join(__dirname, "images")));

app.use(flash());
app.use("/", homeRouter);
app.use("/product", productRouter);
app.use("/signup", signupRouter);
app.use("/login", loginRouter);
app.use("/logout", logoutRouter);
app.use("/cart", cartRouter);
app.use("/orders", ordersRouter);
app.use("/admin", adminRouter);

app.get("/not-admin", (req, res, next) => {
  res.status(403);
  res.render("not-admin", {
    pageTitle: "Not authorized",
    isUser: req.session.userId,
    isAdmin: false,
  });
});
app.get("/error", (req, res, next) => {
  res.status(500);
  res.render("error", {
    pageTitle: "Error",
    isUser: req.session.userId,
    isAdmin: req.session.isAdmin,
  });
});
app.use((error, req, res, next) => {
  res.redirect("/error");
});

app.use((req, res, next) => {
  res.status(404).send("Sorry can't find that!");
});

app.listen(3000, (err) => console.log("Listening on port 3000"));
