const express = require('express');
const app = express();

const SERVER_PORT = 8080;

/* Set the view engine to EJS. */
app.set("view engine", "ejs");
/* Specify that static files are located in the public folder. */
app.use(express.static("public"));

app.get('/', (req, res) => {
	res.render("index");
});

/* Redirect pages that do not exist to a 404 error. */
app.use((req, res, next) => {
	res.status(404).render("404");
});

/* Start the server. */
app.listen(SERVER_PORT, () => {
	console.log("Server for Random Game started on port " + SERVER_PORT + ".");
});
