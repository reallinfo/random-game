const express = require('express');
const app = express();

const SERVER_PORT = 8080;

/* Set the view engine to EJS. */
app.set("view engine", "ejs");
/* Specify that static files are located in the public folder. */
app.use(express.static("public"));

/* Routes */
app.get('/', (req, res) => {
	res.render("index");
});
app.get('/list', (req, res) => {
	res.render("list");
});
app.get('/add-game', (req, res) => {
	res.render("add-game");
});

/* Redirect pages that do not exist to the 404 error page. */
app.use((req, res, next) => {
	res.status(404).render("404");
});

/* Start the server. */
app.listen(SERVER_PORT, () => {
	console.log("Server for Random Game started on port " + SERVER_PORT + ".");
});
