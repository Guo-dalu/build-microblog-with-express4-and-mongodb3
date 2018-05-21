var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var settings = require('./settings');
var session = require('express-session');
var MongoStore = require('connect-mongo')(session);
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var flash = require('connect-flash');
var favicon = require('serve-favicon'); 


var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var postRouter = require('./routes/post');
var regRouter = require('./routes/reg');
var loginRouter = require('./routes/login');
var logoutRouter = require('./routes/logout');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(favicon(path.join(__dirname, '/public/images/favicon.ico')));
app.use(express.static(path.join(__dirname, 'public')));
app.use('/lib', express.static(path.join(__dirname, 'node_modules')))


app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(methodOverride());
app.use(cookieParser());
app.use(session({
	secret: settings.cookieSecret,
	name: settings.sessionId,
	resave: true,
	saveUninitialized: false,
	store: new MongoStore({
		url: settings.mongoUrl
	})
}))
app.use(flash())


app.use((req, res, next) =>{

	res.locals.user = req.session.user

	var err = req.flash('error')

	var success = req.flash('success')

	res.locals.error = err? err : ''

	res.locals.success = success? success : ''

	next()

})

app.use('/', indexRouter);

app.use('/u', usersRouter);

app.use('/post', postRouter);

app.use('/reg', regRouter);

app.use('/login', loginRouter);

app.use('/logout', logoutRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});




module.exports = app;
