const MongoClient = require('./db').MongoClient

const insertDocuments = require('./db').insertDocuments

const createUniqueIndex = require('./db').createUniqueIndex

const dbName = require('../settings').db

const dbUrl = require('../settings').mongoUrl


class User{

	constructor(user){
		this.name = user.name
		this.password = user.password
	}

	save(cb){

		let user = {
			name: this.name,
			password: this.password
		}

		console.log('in save', user)

		MongoClient.connect(dbUrl, (err,client) => {

			if(err){
				return cb(err)
			}

			const db = client.db(dbName)

			const collection = db.collection('users')

			insertDocuments(user, collection, function(){

				createUniqueIndex(collection, () => {

					client.close()

					cb(err, user)
				})
			})
		})

	}
}

User.get = function get(username, cb){
	
	var clientConnect = MongoClient.connect(dbUrl)
			   .then(
			   		async (client) =>{

			   			const db = client.db(dbName)

			   			const collection = db.collection('users')

			   			const docs = await collection.find({name: username}).limit(1).toArray()

			   			if(docs && docs.length){

			   				console.log(docs)

			   				let user = new User(docs[0])

			   				cb(null, user)

			   			}

			   			else{

			   				cb(null, null)
			   			}

			   			client.close()

			   		},
			   		(err) =>{
			   			console.log('db collection error')
			   			return cb(err)
			   		}
			   	)
			   .catch( err => {

			   		console.log('not collect')

			   		clientConnect.close()

			   		return cb(err)
			   })
}


module.exports = User