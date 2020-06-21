
const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");



const app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));
app.set("view engine", "ejs");


const homePageContent = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur sagittis fermentum tortor nec venenatis. Mauris ac arcu sagittis, bibendum sapien id, tincidunt sapien. Aliquam eget scelerisque urna. Nunc finibus velit iaculis lacus luctus tempor. Phasellus tristique pharetra auctor. Pellentesque blandit, justo at consequat eleifend, nisi ipsum consequat est, id ultrices mauris ligula luctus augue. Nunc cursus pretium enim, scelerisque tristique enim. Curabitur suscipit, turpis et posuere cursus, nulla nunc dapibus dolor, in finibus ex velit vitae sem."


app.get("/", function(req, res) {

    res.render("home", {pageContent: homePageContent});

    
});

app.listen(3000, function() {
    console.log("Server started on port 3000");
});