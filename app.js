const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const { json } = require("body-parser");
const _ = require("lodash");
const mongoose = require("mongoose");

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static("public"));
app.set("view engine", "ejs");


mongoose.connect("mongodb+srv://admin-deniz:BackendWebsiteProjectsMongo2@cluster0.nmsht.mongodb.net/<dbname>?retryWrites=true&w=majority", { useNewUrlParser: true, useUnifiedTopology: true });



const db = mongoose.connection;
db.on('error', console.error.bind(console, "connection error"));
db.once("open", function () {
    console.log("It is connected");
});

const postSchema = new mongoose.Schema({
    title: String,
    content: String
});

const Post = mongoose.model("Post", postSchema);

const homePageContent = "“Someday everything will make perfect sense. So for now, laugh at confusion, smile through the tears and keep reminding yourself that everything happens for a reason.”";

const aboutPageContent = "Ut ac ornare sapien, vel posuere ipsum. Sed pharetra diam sed eleifend fringilla. Ut laoreet nulla quis mauris rutrum pellentesque. Pellentesque facilisis ligula vel nulla malesuada gravida. In ultrices mauris est, quis rhoncus ligula finibus et. Phasellus sodales, libero ut cursus lobortis, risus urna auctor nibh, sed tempor velit est eu metus. Nulla iaculis tincidunt convallis. Maecenas tincidunt nunc vitae diam elementum ultricies. Vestibulum tortor augue, finibus sed tempus sit amet, faucibus id leo. Aenean dictum ut elit et pharetra. In vitae placerat arcu. In hac habitasse platea dictumst. Donec eros nisi, egestas et tincidunt vehicula, consectetur sagittis neque. Donec mattis, urna at imperdiet finibus, erat massa dapibus tellus, id iaculis purus sapien non urna. Nunc tempor, est vitae ultrices convallis, urna mi tristique lacus, vel gravida leo ex id purus. Proin id est quis mauris fermentum eleifend a at mauris. Sed gravida laoreet urna, et condimentum tortor lacinia luctus. Nam facilisis massa nec ante faucibus faucibus. Maecenas maximus bibendum urna vitae tempor. Maecenas finibus, arcu ut accumsan venenatis, tellus nisl sagittis turpis, non aliquam neque ex vitae urna. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Aliquam tellus mi, tincidunt et tempus eu, eleifend vel augue. Fusce purus ipsum, rutrum nec laoreet ultricies, placerat laoreet sem. Nam nulla mauris, mattis et ante vel, tristique pretium risus.";


app.get("/", function (req, res) {

    Post.find({}, function (err, posts) {

        res.render("home", {
            homePage: homePageContent,
            pagePosts: posts,
        });
    });
});

app.get("/posts/:postId", function (req, res) {

    const requestedPostId = req.params.postId;

    Post.findOne({ _id: requestedPostId }, function (err, post) {
        res.render("post", {
            title: post.title,
            content: post.content
        });
    });
});


app.get("/about", function (req, res) {
    res.render("about", { aboutPage: aboutPageContent });
});

app.get("/contact", function (req, res) {
    res.render("contact");
});

app.get("/compose", function (req, res) {
    res.render("compose");
});

app.post("/", function (req, res) {

    const postPublish = {
        title: req.body.postTitle,
        body: req.body.postBody,
    };

    const post = new Post({
        title: req.body.postTitle,
        content: req.body.postBody
    });

    post.save();
    res.redirect("/");
});

let port = process.env.PORT;
if (port == null || port == "") {
    port = 3000;
}
app.listen(port, function() {
    console.log("Server started on port 3000");
});
