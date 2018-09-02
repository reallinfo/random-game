const MongoClient		= require('mongodb').MongoClient;

const DB_HOST			= 'mongodb://localhost';
const DB_NAME			= 'random-game';
const DB_COLLECTION		= 'games';

const CONNECT_OPTIONS	= { useNewUrlParser: true };
const QUERY_OPTIONS		= null;

/**
 * Utility class allowing interaction with the mongo database.
 * Do not create instances of this it is useless.
 * @TODO: all() should return the object
 * @TODO: findId()
 * @TODO: delete()
 */
class GameDb {
	/**
	 * Create a connection with the DB and returns the db object.
	 */
	static connect() {
		return (MongoClient.connect(DB_HOST, CONNECT_OPTIONS));
	}

	/**
	 * Returns an array containing all the games found in the db.
	 */
	static all() {
		this.connect().then((client) => {
			let db = client.db(DB_NAME);
			db.collection(DB_COLLECTION).find({}).toArray().then((docs) => {
				console.log(docs);
			});
			client.close();
		});
	}

	/**
	 * Add a game with the name passed as parameter in the db.
	 */
	static add(gameName) {
		let newGame = { name: gameName };
		
		this.connect().then((client) => {
			let db = client.db(DB_NAME);
			db.collection(DB_COLLECTION).insertOne(newGame, QUERY_OPTIONS, (err, results) => {
				if (err) throw err;
				console.log("Inserted.");
			});
			client.close();
		});
	}

	/**
	 * Edit the name of a game by a new one.
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
	 * Returns the id of the game.
	 */
	static findId(name) {
		/* TODO */
		return (name);	
	}

	/**
	 * Deletes a game from the database.
	 */
	static delete(name) {
		let id = this.findId(name);
		let objToDelete = { _id: new MongoObjectID(id) };

		this.connect().then((client) => {
			let db = client.db(DB_NAME);
			db.collection(DB_COLLECTION).remove(objToDelete, QUERY_OPTIONS, (err, results) => {
				if (error) throw err;
			});
			client.close();
		});
	}
}

module.exports = GameDb;
