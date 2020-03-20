var express 					= require('express');
var path 						= require('path');
var bodyParser 					= require('body-parser');
var ejs 						= require('ejs');
var exSession 					= require('express-session');
var cookieParser 				= require('cookie-parser');
var login 						= require('./controllers/login');
var logout 						= require('./controllers/logout');
var facultyHome 				= require('./controllers/faculty/home');
var facultyProfile 				= require('./controllers/faculty/profile');
var facultyChngPass 			= require('./controllers/faculty/changePassword');
var facultyStudentApproval 		= require('./controllers/faculty/studentApproval');
var facultyStudentDetails 		= require('./controllers/faculty/studentDetails');
var facultyStudentReg 			= require('./controllers/faculty/studentReg');
var facultyTopicAdd 			= require('./controllers/faculty/topicAdd');
var facultyViewTopic 			= require('./controllers/faculty/viewTopic');
var facultyFileUpdate 			= require('./controllers/faculty/uploadFile');
var facultyProgressUpdate 		= require('./controllers/faculty/progressUpdate');


var app = express();

//configuration
app.set('view engine', 'ejs');


//middleware
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({extended: false}));
app.use('/login', login);
app.use('/', login);
app.use('/logout', logout);
app.use('/home', facultyHome);
app.use('/profile', facultyProfile);
app.use('/changePassword', facultyChngPass);
app.use('/studentDetails', facultyStudentDetails);
app.use('/studentApproval', facultyStudentApproval);
app.use('/studentReg', facultyStudentReg);
app.use('/studentReg', facultyStudentReg);
app.use('/topicAdd', facultyTopicAdd);
app.use('/uploadFiles', facultyFileUpdate);
app.use('/viewTopic', facultyViewTopic);
app.use('/progressUpdate', facultyProgressUpdate);




//routes
app.get('/', function(req, res){
	res.render('index');
});

//server startup
app.listen(3000, function(){
	console.log('server started at 3000!');
});
