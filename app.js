
const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const { json } = require("body-parser");
const _ = require("lodash");



const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static("public"));
app.set("view engine", "ejs");


const homePageContent = "“Someday everything will make perfect sense. So for now, laugh at confusion, smile through the tears and keep reminding yourself that everything happens for a reason.”";

const aboutPageContent = "Ut ac ornare sapien, vel posuere ipsum. Sed pharetra diam sed eleifend fringilla. Ut laoreet nulla quis mauris rutrum pellentesque. Pellentesque facilisis ligula vel nulla malesuada gravida. In ultrices mauris est, quis rhoncus ligula finibus et. Phasellus sodales, libero ut cursus lobortis, risus urna auctor nibh, sed tempor velit est eu metus. Nulla iaculis tincidunt convallis. Maecenas tincidunt nunc vitae diam elementum ultricies. Vestibulum tortor augue, finibus sed tempus sit amet, faucibus id leo. Aenean dictum ut elit et pharetra. In vitae placerat arcu. In hac habitasse platea dictumst. Donec eros nisi, egestas et tincidunt vehicula, consectetur sagittis neque. Donec mattis, urna at imperdiet finibus, erat massa dapibus tellus, id iaculis purus sapien non urna. Nunc tempor, est vitae ultrices convallis, urna mi tristique lacus, vel gravida leo ex id purus. Proin id est quis mauris fermentum eleifend a at mauris. Sed gravida laoreet urna, et condimentum tortor lacinia luctus. Nam facilisis massa nec ante faucibus faucibus. Maecenas maximus bibendum urna vitae tempor. Maecenas finibus, arcu ut accumsan venenatis, tellus nisl sagittis turpis, non aliquam neque ex vitae urna. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Aliquam tellus mi, tincidunt et tempus eu, eleifend vel augue. Fusce purus ipsum, rutrum nec laoreet ultricies, placerat laoreet sem. Nam nulla mauris, mattis et ante vel, tristique pretium risus.";

const contactPageContent = "Proin at erat rutrum, fringilla nisi id, placerat lectus. Duis at suscipit quam, in cursus nulla. Maecenas elementum leo ut orci tempor, sed vehicula lectus rhoncus. Vivamus feugiat massa nec lacus sollicitudin, nec blandit nisl vulputate. Fusce quis magna est. Sed ornare rhoncus nisi et dictum.";

let posts = [];


app.get("/", function (req, res) {

    res.render("home", {
        homePage: homePageContent,
        pagePosts: posts,
    });
});


app.get("/posts/:postId", function (req, res) {

    const requestedTitle = _.lowerCase(req.params.postId);

    posts.forEach(function (postPublish) {

        const storedTitle = _.lowerCase(postPublish.title);

        if (requestedTitle == storedTitle) {

            res.render("post", {
                postTopicTitle: postPublish.title,
                postTopicBody: postPublish.body
            });
        } 
    });
});


app.get("/about", function (req, res) {

    res.render("about", { aboutPage: aboutPageContent });

});

app.get("/contact", function (req, res) {

    res.render("contact", { contactPage: contactPageContent });
});


app.get("/compose", function (req, res) {

    res.render("compose");
});


app.post("/", function (req, res) {

    const postPublish = {
        title: req.body.postTitle,
        body: req.body.postBody,
    };

    posts.push(postPublish);

    res.redirect("/");
});

app.listen(3000, function () {
    console.log("Server started on port 3000");
 });
