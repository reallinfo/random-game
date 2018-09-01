// ( https://zestedesavoir.com/tutoriels/312/debuter-avec-mongodb-pour-node-js/ )
const MongoClient	= require('mongodb').MongoClient;

const DB_HOST		= 'mongodb://localhost';
const DB_NAME		= 'random-game';
const DB_COLLECTION	= 'games';

/* Connect function : create a connection with the DB and returns the db
 * object.
 */
MongoClient.connect(DB_HOST, { useNewUrlParser: true }, (err, client) => {
	if (err)
		throw err;
	let db = client.db(DB_NAME);
	client.close();
});

/* Query function
 * Le paramètre null correspond aux OPTIONS voir :
 * https://docs.mongodb.com/manual/reference/write-concern/
 */
/* ALL GAMES */
db.collection(DB_COLLECTION).find().toArray((err, results) => {
	if (err)
		throw err;
	console.log(results);
});

/* Add function : NEED THE NAME */
let newGame = { name: "name" };
db.collection(DB_COLLECTION).insert(newGame, null, (err, results) => {
	if (err)
		throw err;
	console.log("Inserted.")
});

/* Update function : NEED THE NAME */
let toEdit = "name";
let newName = "name2";
db.collection(DB_COLLECTION).update(
    { name: toEdit }, 
    { name: newName }
);

/* Delete function : NEED THE ID */
let idToFind = "53dfe7bbfd06f94c156ee96e";
let objToDelete = { _id: new MongoObjectID(idToFind) };
db.collection(DB_COLLECTION).remove(objToDelete, null, (err, results) => {
	if (error)
		throw err;
});
