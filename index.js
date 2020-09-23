// packages
const express = require ('express');
const bodyParser = require ('body-parser');
const ejs = require ('ejs');
const path = require ("path");
const session = require("express-session");
const SessionStore = require("connect-mongodb-session")(session);
const flash = require ("connect-flash");

const STORE = new SessionStore({
    uri: "mongodb://localhost:27017/online-store",
    collection: 'sessions'
  });

// routers
const homeRouter = require ("./routes/home-route");
const productRouter = require ("./routes/product-route");
const signupRouter = require ('./routes/signup-route');
const loginRouter = require ('./routes/login-route');
const logoutRouter = require ('./routes/logout-route');
// app
const app = express();

app.use (session({
    secret: "Secret encryption message for sessions",
    saveUninitialized: false,
    store: STORE
}))
app.set ("view engine", "ejs");
app.set ("views", "views");
app.use (express.static (path.join (__dirname, "assets")));
app.use (express.static (path.join (__dirname, "images")));


app.use (flash());
app.use ('/', homeRouter);
app.use ('/product',productRouter);
app.use ('/signup', signupRouter);
app.use ('/login', loginRouter);
app.use ('/logout', logoutRouter)
app.listen (3000, (err)=> console.log ("Listening on port 3000"));
