const express = require('express');
const app = express();

const SERVER_PORT = 8080;

app.set("view engine", "ejs");
app.use(express.static("public"));

app.get('/', (req, res) => {
	res.render("index");
});

app.use((req, res, next) => {
	res.status(404).render("404");
});

app.listen(SERVER_PORT, () => {
	console.log("Server for Random Game started on port " + SERVER_PORT + ".");
});
