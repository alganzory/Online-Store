// packages
const express = require ('express');
const bodyParser = require ('body-parser');
const ejs = require ('ejs');
const path = require ("path");


// routers
const homeRouter = require ("./routes/home-route");


// app
const app = express();
app.set ("view engine", "ejs");
app.set ("views", "views");
app.use (express.static (path.join (__dirname, "assets")));
app.use (express.static (path.join (__dirname, "images")));


app.use ('/', homeRouter);




app.listen (3000, (err)=> console.log ("Listening on port 3000"));