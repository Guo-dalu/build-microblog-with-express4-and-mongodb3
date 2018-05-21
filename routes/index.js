var express = require('express');
var router = express.Router();
var Post = require('../models/post')


/* GET home page. */
router.get('/', function(req, res, next) {

  Post.get(null, (err, posts) => {

  	if(err){
  		posts = []
  	}
  	res.render('layout', { 
  		title: 'index',
  		posts: posts
	});

  })	
});



module.exports = router;
