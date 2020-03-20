/*var express = require('express');
var router = express.Router();
var userModel	= require.main.require('./models/user-model');


router.get('/',function(req,res){
	console.log('login page requested!');
	res.render('login');
});

router.post('/', function(req, res){
	
	var today = new Date();
	var sysDate = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
	var sysTime = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();

	userModel.validate(user, function(result){
		if(result){
			res.cookie('username', req.body.uname);
			res.cookie('password', req.body.password);
			res.cookie('date', sysDate);
			res.cookie('time', sysTime);
			res.redirect('/AdminHome');
		}else{
			res.redirect('/login');
		}
	});

	userModel.getRole(req.body.uname,function(result) {
		//console.log(result);
		var user ={
		userid: req.body.uname,
		password: req.body.password,
		role : result.role_name
		};
		if (user.role) {
			userModel.validate(user,function(status) {
				//console.log(status.status);
				if () {}

			});
		}
		else{
			res.redirect('/login');
		}

	});
});

module.exports = router;*/


var express = require('express');
var router = express.Router();
var md5 = require('md5');
var userModel	= require.main.require('./models/AdminUserModel');


router.get('/',function(req,res){
	console.log('login page requested!');
	res.render('login',{error:null});
});

router.post('/', function(req, res){
	
	var today = new Date();
	var sysDate = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
	var sysTime = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
	userModel.getRole(req.body.uname,function(result) {
		//console.log(result);
		if (result==null) {
			res.redirect('/login');
		}
		else
		{
			var user ={
			userid: req.body.uname,
			password: req.body.password,
			role : result.role_name
			};
			if (user.role) {
				userModel.validate(user,function(status) {
					if (status.status && user.role=='faculty') {
						res.send("Faculty");
					}
					else if (status.status && user.role=='student') {
						res.send("Student");
					}
					else if (status.status==1) {
						res.cookie('username', req.body.uname);
						res.cookie('token', md5(md5(req.body.password)));
						//res.cookie('date', sysDate);
						//res.cookie('time', sysTime);
						res.redirect('/AdminHome');
					}
					else{
						res.redirect('/login');
					}
				});
			}
			else{
				res.redirect('/login');
			}
			}
	});
});

module.exports = router;