function checkLogin(req, res, next){

	if(!req.session.user){
		req.flash('error', '尚未登录')
		res.redirect('/')
	}
	next()
}

function checkNotLogin(req, res, next){

	if(req.session.user){
		req.flash('error', '已经登录了')
		return res.redirect('/')
	}
	next()
}

module.exports = { checkLogin, checkNotLogin }

