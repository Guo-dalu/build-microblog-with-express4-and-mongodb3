const settings = require('../settings')
const mongo = require('mongodb');
const Db = mongo.Db
const Server = mongo.Server
const MongoClient = mongo.MongoClient

const db = new Db(settings.db, new Server(settings.host, settings.mongoport, {}))


exports.db = db
exports.MongoClient = MongoClient

exports.insertDocuments = function(insertObj, collection, cb){

	collection.insertOne(insertObj, (err, result) =>{

		cb(err,result)
	})

}


exports.createUniqueIndex = function(collection, cb){

	collection.createIndex({
		name:"text"
	},{
		unique: true
	},(err,result) =>{
		cb(err, result)
	})
}
