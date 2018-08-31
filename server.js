const http = require('http');
const path = require('path');
const fs = require('fs');

const PORT = 8080;
const FOLDER_VIEWS = "views/";
const FILE_INDEX = "index.html";

let server = http.createServer((req, res) => {
	let pathname = req.url;
	if (pathname == '/')
		pathname = '/' + FOLDER_VIEWS + FILE_INDEX;
	
	let ext = path.extname(pathname);
	let typeExt = {
		'.html': 'text/html',
		'.js':   'text/javascript',
		'.css':  'text/css'
	};
	let contentType = typeExt[ext] || 'text/plain';

	fs.readFile(__dirname + pathname, (err, data) => {
		if (err) {
			res.writeHead(500);
			return (res.end("Error loading: " + pathname));
		}
		res.writeHead(200, {'Content-Type': contentType});
		res.end(data);
	});
});

server.listen(PORT);
console.log("Server started on port 8080.");
