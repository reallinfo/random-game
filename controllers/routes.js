const GameDb		= require('../models/GameDb');

module.exports = function(app) {
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
}
