const GameDb		= require('../../models/GameDb');
const DB_NAME		= 'random-game';
const DB_COLLECTION	= 'games';

const FILENAME		= 'list';
const TITLE_PAGE	= 'Game list | ';


module.exports = function(app) {
	app.get('/' + FILENAME, (req, res) => {
		GameDb.connect().then((client) => {
			let db = client.db(DB_NAME);
			let cursor = db.collection(DB_COLLECTION).find({});
			/* Sort results by name asc */
			cursor.sort({ name: 1 });
			cursor.toArray().then((docs) => {
				res.render(FILENAME, { title: TITLE_PAGE,
		                               games: docs });
			}).catch((err) => {
				res.render(FILENAME, { title: TITLE_PAGE,
	                                   games: undefined });
			});
			client.close();
		}).catch((err) => {
			console.log('couldn\'t connect to the db.');
			res.render(FILENAME, { title: TITLE_PAGE,
	                               games: undefined });
		} );
	});
}
