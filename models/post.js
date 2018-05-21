const MongoClient = require('./db').MongoClient

const insertDocuments = require('./db').insertDocuments

const createUniqueIndex = require('./db').createUniqueIndex

const dbName = require('../settings').db

const dbUrl = require('../settings').mongoUrl


class Post{

	constructor(username, post, time){
		this.user = username
		this.post = post
		this.time = time? time : new Date()
	}

	save(cb){

		var post = {
		    user: this.user,
		    post: this.post,
		    time: this.time,
		  }

		MongoClient.connect(dbUrl, (err,client) => {

			if(err){
				return cb(err)
			}

			const db = client.db(dbName)

			const collection = db.collection('post')

			insertDocuments(post, collection, function(){

				createUniqueIndex(collection, () => {

					client.close()

					cb(err, post)
				})
			})
		})

	}
}

Post.get = function get(username, cb){
	
	var clientConnect = MongoClient.connect(dbUrl)
			   .then(
			   		async (client) =>{

			   			const db = client.db(dbName)

			   			const collection = db.collection('post')

			   			let findObj = username? {user: username} : {}

			   			const docs = await collection.find(findObj).sort({time: -1}).toArray()

			   			client.close()

			   			var posts = docs.map( (doc, docindex) => {

			   				return new Post(doc.user, doc.post, doc.time)
			   			})

			   			return cb(null, posts)

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


module.exports = Post