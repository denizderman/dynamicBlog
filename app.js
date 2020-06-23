
const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const { json } = require("body-parser");



const app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(express.static("public"));
app.set("view engine", "ejs");


const homePageContent = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur sagittis fermentum tortor nec venenatis. Mauris ac arcu sagittis, bibendum sapien id, tincidunt sapien. Aliquam eget scelerisque urna. Nunc finibus velit iaculis lacus luctus tempor. Phasellus tristique pharetra auctor. Pellentesque blandit, justo at consequat eleifend, nisi ipsum consequat est, id ultrices mauris ligula luctus augue. Nunc cursus pretium enim, scelerisque tristique enim. Curabitur suscipit, turpis et posuere cursus, nulla nunc dapibus dolor, in finibus ex velit vitae sem.";

const aboutPageContent = "Ut ac ornare sapien, vel posuere ipsum. Sed pharetra diam sed eleifend fringilla. Ut laoreet nulla quis mauris rutrum pellentesque. Pellentesque facilisis ligula vel nulla malesuada gravida. In ultrices mauris est, quis rhoncus ligula finibus et. Phasellus sodales, libero ut cursus lobortis, risus urna auctor nibh, sed tempor velit est eu metus. Nulla iaculis tincidunt convallis. Maecenas tincidunt nunc vitae diam elementum ultricies.";

const contactPageContent = "Proin at erat rutrum, fringilla nisi id, placerat lectus. Duis at suscipit quam, in cursus nulla. Maecenas elementum leo ut orci tempor, sed vehicula lectus rhoncus. Vivamus feugiat massa nec lacus sollicitudin, nec blandit nisl vulputate. Fusce quis magna est. Sed ornare rhoncus nisi et dictum.";


let posts = [];



app.get("/", function(req, res) {

    res.render("home", {
        homePage: homePageContent,
        posts: posts 
    });
});

app.get("/about", function(req, res) {

    res.render("about", {aboutPage: aboutPageContent});
});

app.get("/contact", function(req, res) {

    res.render("contact", {contactPage: contactPageContent});
});

app.get("/compose", function(req, res) {

    res.render("compose");
});

app.post("/", function(req, res) {

    let postPublish = {
       title: req.body.postTitle,
       body: req.body.postBody
    }; 

    posts.push(postPublish);

    res.redirect("/");
   
});

app.listen(3000, function() {
    console.log("Server started on port 3000");
});