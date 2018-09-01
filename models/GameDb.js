const MongoClient	= require('mongodb').MongoClient;

const DB_HOST		= 'mongodb://localhost';
const DB_NAME		= 'random-game';
const DB_COLLECTION	= 'games';

const CONNECT_OPTIONS = { useNewUrlParser: true };
const QUERY_OPTIONS	= null;

/**
 * EXPLICATIONS SUR PQ CA FUCKED UP :
 * 
 * @Aihe Ta fonction connect() retourne toujours undefined.
 * (parce qu'elle retourne rien). Ton return est dans le callback de
 * MongoClient.connect, ce qui n'est pas la même chose. J'ai tendance à
 * conseiller d'utiliser l'api de promise si elle est dispo (je connais pas
 * trop mongo, je sais pas si il y en a une dans la lib officielle). Dans
 * ton cas, c'est ta fonction connect qui devrait prendre un callback et dans
 * ta fonction all, tu dois lui passer une fonction qui fait la suite du
 * traitement. C'est un peu compliqué le code async... On arrive vite dans le
 * callback hell sans utiliser de promise.
 */

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
		MongoClient.connect(DB_HOST, CONNECT_OPTIONS, (err, client) => {
			if (err) throw err;
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
