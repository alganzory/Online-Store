const express = require ('express');
const bodyParser = require ('body-parser');
const ejs = require ('ejs');
const path = require ("path");
const app = express();

app.set ("view engine", "ejs");
app.set ("views", "views");

app.use (express.static (path.join (__dirname, "assets")));

app.get ('/', (req,res,next) => {
    res.render("index", {
        userType: "-admin"
    });
})

app.listen (3000, (err)=> console.log ("Listening on port 3000"));
