'use strict';

var express = require('express');
var routes = require('./app/routes/index.js');
//var mongoose = require('mongoose');
//var passport = require('passport');
//var session = require('express-session');

var app = express();
//require('dotenv').load();
//require('./app/config/passport')(passport);

//mongoose.connect(process.env.MONGO_URI);

app.use('/controllers', express.static(process.cwd() + '/app/controllers'));
app.use('/public', express.static(process.cwd() + '/public'));
app.use('/common', express.static(process.cwd() + '/app/common'));

/*app.use(session({
	secret: 'secretClementine',
	resave: false,
	saveUninitialized: true
}));


app.use(passport.initialize());
app.use(passport.session());

routes(app, passport);
*/

app.get('/:name', function(req, res) {
	var months = ['January','February','March','April','May','June','July','August','September','October','November','December'];
	var name = req.params.name;
	var checkInt = Number.isInteger(Number(name));
	//console.log(check);
	function getDateString(newDate) {
		var month = months[newDate.getMonth()];
		var day = newDate.getDay();
		var year = newDate.getFullYear();
		return month + ' ' + day + ', ' + year;
	}
	
	if (checkInt) {
		// check if unix timestamp
		var unixTime = Number(name)*1000;
		var unixDate = new Date(unixTime);
		res.setHeader('Content-Type', 'application/json');
		res.json({"unix":Number(name), "natural":getDateString(unixDate)});
		res.status(200);
	} else {
		// check if valid date
		//res.send('Got ' + name);
		//res.status(200);
	}
});


var port = process.env.PORT || 8080;
app.listen(port,  function () {
	console.log('Node.js listening on port ' + port + '...');
});