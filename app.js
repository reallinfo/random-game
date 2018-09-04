const express		= require('express');
const app			= express();
const GameDb		= require('./models/GameDb');

const SERVER_PORT	= 8080;


/* Set the view engine to EJS. */
app.set('view engine', 'ejs');
/* Specify that static files are located in the public folder. */
app.use(express.static('public'));


/* Routes */
// INDEX
app.get('/', (req, res) => {
	res.render('index');
});

// GAME LIST
app.get('/list', (req, res) => {
	GameDb.connect().then((client) => {
		let db = client.db('random-game');
		db.collection('games').find({}).toArray().then((docs) => {
			res.render('list', { title: 'Game list | ',
	                             games: docs });
		}).catch(err => {
			res.render('list', { title: 'Game list | ',
                                 games: undefined })
		});
		client.close();
	});
});

// FORM ADD A NEW GAME
app.get('/add-game', (req, res) => {
	res.render('add-game', {title: 'Add game | '});
});

/* Redirect pages that do not exist to the 404 error page. */
app.use((req, res, next) => {
	res.status(404).render('404');
});


/* Start the server. */
app.listen(SERVER_PORT, () => {
	console.log('Server for Random Game started on port ' + SERVER_PORT + '.');
});
