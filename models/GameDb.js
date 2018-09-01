const MongoClient	= require('mongodb').MongoClient;

const DB_HOST		= 'mongodb://localhost';
const DB_NAME		= 'random-game';
const DB_COLLECTION	= 'games';

const QUERY_OPTIONS	= null;

/**
 * Utility class allowing interaction with the mongo database.
 * Do not create instances of this one it is useless.
 */
class GameDb {
	/**
	 * Create a connection with the DB and returns the db object.
	 * @returns {MongoClient.db} db
	 */
	static connect() {
		MongoClient.connect(DB_HOST, { useNewUrlParser: true }, (err, client) => {
			if (err)
				throw err;
			let db = client.db(DB_NAME);
			return (db);
			//client.close();
		});
	}

	/**
	 * Returns an array containing all the games found in the db.
	 * @returns {Object} results
	 */
	static all() {
		let db = this.connect();

		if (!db)
			return (undefined);
		db.collection(DB_COLLECTION).find().toArray((err, results) => {
			if (err) throw err;
			return (results);
		});
	}

	/**
	 * Add a game with the name passed as parameter in the db.
	 * @param {String} name 
	 */
	static add(gameName) {
		let db = this.connect();
		let newGame = { name: gameName };

		if (!db)
			return (undefined);
		db.collection(DB_COLLECTION).insert(newGame, QUERY_OPTIONS, (err, results) => {
			if (err) throw err;
			console.log("Inserted.");
		});
	}

	/**
	 * Edit the name of a game by a new one.
	 * @param {String} oldName 
	 * @param {String} newName 
	 */
	static edit(oldName, newName) {
		let db = this.connect();
		
		if (!db)
			return (undefined);
		db.collection(DB_COLLECTION).update(
			{ name: oldName }, 
			{ name: newName }
		);
	}
	
	/**
	 * Deletes a game from the database.
	 * @param {String} id 
	 */
	static delete(id) {
		let db = this.connect();
		let objToDelete = { _id: new MongoObjectID(id) };

		if (!db)
			return (undefined);
		db.collection(DB_COLLECTION).remove(objToDelete, QUERY_OPTIONS, (err, results) => {
			if (error) throw err;
		});
	}
}

module.exports = GameDb;
