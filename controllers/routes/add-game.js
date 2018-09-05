const GameDb		= require('../../models/GameDb');

const FILENAME		= 'add-game';
const TITLE_PAGE	= 'Add game | ';


module.exports = function(app) {
	app.get('/' + FILENAME, (req, res) => {
		res.render(FILENAME, {title: TITLE_PAGE});
	});	
}
