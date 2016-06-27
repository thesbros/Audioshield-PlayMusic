const fs = require('fs');
const read = require('read');
const PlayMusic = require('playmusic');
const API_FILE = './apikey.json';
var apikey = require(API_FILE);
var pm = new PlayMusic();

read({prompt: 'Email: '}, (err, email) => {
	read({prompt: 'Password (generate an app password if using 2 factor authentication): ', silent: true}, (err, password) => {
		pm.login({email: email, password: password}, (err, resp) => {
		if (err) 
			console.log('Email or Password incorrect.');
		else {
			apikey.androidId = resp.androidId;
			apikey.masterToken = resp.masterToken;
			fs.writeFile(API_FILE, JSON.stringify(apikey, null, 4), (err) => {
				if (err) 
					console.error(err);
				else 
					console.log('Successfully logged into Google Play Music.');
			});
		}
	});
	});
});