var express = require('express');
var router = express.Router();
var checkLogin  = require('../utils/check').checkLogin
var Post = require('../models/post')

/* GET users listing. */
router.post('/', checkLogin, function(req, res, next) {
  
  var currentUser = req.session.user
  var post = new Post(currentUser.name, req.body.post)
  post.save((err) => {
  	if(err){
  		req.flash('error', err)
  		return res.redirect('/')
  	}
  	req.flash('success','微博发表成功')
  	res.redirect('/u/' + currentUser.name)
  })

});

module.exports = router;
