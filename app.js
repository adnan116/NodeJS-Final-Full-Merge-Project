
//declaration
var express 		= require('express');
var path 			= require('path');
var bodyParser 		= require('body-parser');
var ejs 			= require('ejs');
var exSession 		= require('express-session');
var cookieParser 	= require('cookie-parser');
var expressValidator= require('express-validator');
var login 			= require('./controllers/login');
var logout 			= require('./controllers/logout');
var studentHome 	= require('./controllers/student/home');
var studentReg 		= require('./controllers/student/reg');
var studentCngPass 	= require('./controllers/student/changePassword');
var studentUpload 	= require('./controllers/student/upload');
var studentDownload = require('./controllers/student/download');
var availableTopics = require('./controllers/student/topics');
var studentResearch = require('./controllers/student/myResearch');
var studentGroup = require('./controllers/student/group');
//var studentRegInfo 		= require('./controllers/student/regInfo');
var app = express();

//configuration
app.set('view engine', 'ejs');


//middleware
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({extended: false}));

app.use(exSession({secret: 'my value', saveUninitialized: true, resave: false}));
//app.use(expressValidator());
app.use('/login', login);
app.use('/', login);
app.use('/studentHome', studentHome);
app.use('/studentReg', studentReg);
app.use('/studentCngPass', studentCngPass);
app.use('/studentUpload', studentUpload);
app.use('/studentDownload', studentDownload);
app.use('/studentTopics', availableTopics);
app.use('/studentResearch', studentResearch);
app.use('/studentGroup', studentGroup);
//app.use('/studentRegInfo', studentRegInfo);
app.use('/logout', logout);

//routes
app.get('/', function(req, res){

	res.render('index');
});

//server startup
app.listen(3000, function(){
	console.log('server started at 3000!');
});