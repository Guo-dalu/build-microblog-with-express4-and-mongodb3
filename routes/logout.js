var express = require('express');
var router = express.Router();
var checkLogin  = require('../utils/check').checkLogin

/* GET users listing. */
router.get('/', checkLogin, function(req, res) {
  
  	req.session.user = null

  	req.flash('success', '登出成功')

  	res.redirect('/')

})




module.exports = router;
