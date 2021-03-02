const express = require("express");
const app = express();
const port = 3000;
const  data = require("./data.json");
const { projects } = data
const bodyParser = require("body-parser");
app.set("view engine", "pug");

//body parser
app.use(bodyParser.urlencoded({extended:false}));

//static route
app.use("/static", express.static("public"))

//home route
app.get("/", (req, res) => {
    res.render("index", {portfolioProjects: projects})
    res.locals.projects = data.projects
    req.query.portfolioProjects = projects
})

//about route
app.get("/about", (req, res) => {
    res.render("about.pug")
})

//projects route
app.get("/projects/:id", (req, res) => {
    req.query.description = projects[req.params.id].description
    req.query.technologies = projects[req.params.id].technologies
    req.query.live_link = projects[req.params.id].live_link
    req.query.github_link = projects[req.params.id].github_link
    req.query.image_urls = projects[req.params.id].image_urls
    req.query.project_images = req.query.image_urls
    res.render("project", { projectName: projects[req.params.id].project_name,
                            projectDescription: req.query.description,
                            technologies: req.query.technologies,
                            liveLink: req.query.live_link,
                            githubLink: req.query.github_link,
                            project_images: req.query.project_images});
})

//non existing route handler
app.use((req, res, next) => {
    res.status(404).send("Sorry, this page doesn't exist.")
    const err = new Error("Sorry, this page doesn't exist.");
    console.log(err);
    next(err);
})

app.use((err, req, res, next) =>{
    res.locals.error = err;
    err.status = 500
    err.message = "Sorry, an error occurred."
    console.log("Status: ", err.status, "Message: ", err.message)
}) 

//listening
app.listen(port, () => {
    console.log(`Greetings! Listening on port ${port}.`)
});