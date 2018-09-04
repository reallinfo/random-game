const MongoClient		= require('mongodb').MongoClient;

const DB_HOST			= 'mongodb://localhost';
const DB_NAME			= 'random-game';
const DB_COLLECTION		= 'games';

/** See: http://minilink.es/3stl */
const CONNECT_OPTIONS	= { useNewUrlParser: true };
/** Use no options for the query */
const QUERY_NO_OPTIONS	= null;

/**
 * Utility class allowing interaction with the mongo database.
 * Do not create instances of this it is useless.
 */
class GameDb {
	/**
	 * Create a connection with the DB.
	 * @return {Promise}
	 */
	static connect() {
		return (MongoClient.connect(DB_HOST, CONNECT_OPTIONS));
	}

	/**
	 * Add a game with the name passed as parameter in the db.
	 * @param {String} gameName
	 */
	static add(gameName) {
		let newGame = { name: gameName };
		
		this.connect().then((client) => {
			let db = client.db(DB_NAME);
			db.collection(DB_COLLECTION).insertOne(newGame, QUERY_NO_OPTIONS, (err, results) => {
				if (err) throw err;
				console.log("Inserted.");
			});
			client.close();
		});
	}

	/**
	 * Edit the name of a game by a new one.
	 * @param  {String} oldName
	 * @param  {String} newName
	 */
	static edit(oldName, newName) {
		this.connect().then((client) => {
			let db = client.db(DB_NAME);
			db.collection(DB_COLLECTION).updateOne(
				{ name: oldName }, 
				{ $set: { name: newName } }
			);
			client.close();
		});
	}
	
	/**
	 * Deletes a game from the database with its id.
	 * @param  {String} id [The ID of the game we want to delete from the DB]
	 */
	static delete(id) {
		let MongoObjectID = require("mongodb").ObjectID;
		let objToDelete = { _id: new MongoObjectID(id) };

		this.connect().then((client) => {
			let db = client.db(DB_NAME);
			db.collection(DB_COLLECTION).deleteOne(objToDelete, QUERY_NO_OPTIONS, (err, results) => {
				if (err) throw err;
			});
			client.close();
		});
	}
}

module.exports = GameDb;
