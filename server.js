'use strict';

var express = require('express');
var app = express();

app.set('view engine', 'ejs');

app.get('/', function(req, res) {
	res.render('index');	
});

app.get('/:name', function(req, res) {
	var months = ['January','February','March','April','May','June','July','August','September','October','November','December'];
	var name = req.params.name;
	var checkInt = Number.isInteger(Number(name));
	
	function getDateString(newDate) {
		var month = months[newDate.getMonth()];
		var day = newDate.getDay();
		var year = newDate.getFullYear();
		return month + ' ' + day + ', ' + year;
	}
	
	function capitalizeStr(string) {
		return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
	}
	
	function returnNull() {
		res.setHeader('Content-Type', 'application/json');
		res.json({"unix":null, "natural":null});	
	}
	
	// check if parameter is an integer
	if (checkInt) {
		// check if unix timestamp
		var unixTime = Number(name)*1000;
		var unixDate = new Date(unixTime);
		res.setHeader('Content-Type', 'application/json');
		res.json({"unix":Number(name), "natural":getDateString(unixDate)});
		res.status(200);
	} else {
		// check if valid date
		var strArr = name.split(' ');
		if (strArr[0] && strArr[1] && strArr[2]) {
			var year = Number(strArr[2]);
			var day = Number(strArr[1].replace(/,/gi,''));
			var month = capitalizeStr(strArr[0]);
			var indexMonth = months.indexOf(month);
			if (indexMonth != -1 && day && year) {
				var dateString = month + ' ' + day + ', ' + year;
				var unix = new Date(year, indexMonth, day).getTime();
				res.setHeader('Content-Type', 'application/json');
				res.json({"unix":unix/1000, "natural":dateString});
				res.status(200);
			} else {
				returnNull();
			}
		} else {
			returnNull();
		}
	}
});


var port = process.env.PORT || 8080;
app.listen(port,  function () {
	console.log('Node.js listening on port ' + port + '...');
});