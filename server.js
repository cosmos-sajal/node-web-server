const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

var app = express();

app.set('View Engine', 'hbs');
hbs.registerPartials(__dirname + '/views/partials');

app.use((req, res, next) => {
	var now = new Date(),
	log = now + ":" + req.method + " " + req.url;
	fs.appendFile('server.log', log + "\n" , (err) => {
		if (err) {
			console.log("Unable to append log to server log file");	
		}
	});
	next();
});

app.use((req, res, next) => {
	res.render('maintenance.hbs');
});

app.use(express.static(__dirname + '/public'));

app.get('/', (req, res) => {
	res.render('home.hbs', {
		pageTitle: 'Home Page',
		currentYear: new Date().getFullYear(),
		welcomeMsg: 'Welcome sir'
	})
});

app.get('/about', (req, res) => {
	res.render('about.hbs', {
		pageTitle: 'About Page',
		currentYear: new Date().getFullYear()
	});
});

app.get('/bad', (req, res) => {
	res.send({
		'errorMessage' : 'Unable to fulfill request'
	});
});

app.listen(3000);