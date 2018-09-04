const fs 			= require('fs');

const FOLDER_ROUTES = '/routes';
const PATH 			= __dirname + FOLDER_ROUTES;


/**
 * Run each ./routes functions.
 */
module.exports = function(app) {
	fs.readdirSync(PATH).forEach((file) => {
        let fileName = file.substr(0, file.indexOf('.'));
        require(PATH + '/' + fileName)(app);
    });
}
