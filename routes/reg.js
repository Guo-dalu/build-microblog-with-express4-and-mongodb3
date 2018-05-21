var express = require('express');
var router = express.Router();

var crypto = require('crypto');
var User = require('../models/user.js');
var checkNotLogin = require('../utils/check').checkNotLogin
/* GET users listing. */
router.get('/', checkNotLogin, function(req, res, next) {
  res.render('layout',{
  	title: 'register',
  })
});

router.post('/', checkNotLogin, function(req, res, next) {
  if(req.body['password-repeat'] !== req.body['password']){
  	req.flash('error','两次输入的口令不一致');
  	return res.redirect('/reg')
  }

  var md5 = crypto.createHash('md5');
  var password = md5.update(req.body.password).digest('base64');

  var newUser = new User({
  	name: req.body.username,
  	password: password
  })

  User.get(newUser.name, (err, user) => {
  	if(user){
  		err = 'Username already exists. '
  	}
  	if(err){
  		req.flash('error', err)
  		return res.redirect('/reg')
  	}
  	//console.log('now in save')
  	newUser.save((err) => {
		if(err){
		//console.log(err)
		req.flash('error', err)
		return res.redirect('/reg')
		}
		req.session.user = newUser
		req.flash('success', '注册成功')
		res.redirect('/')
  	})
  })


});



module.exports = router;
