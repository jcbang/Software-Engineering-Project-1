const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const db = require('./config/keys').mongoURI; // our access key for the database

// Attempt to pull from Heroku
const aws = require('aws-sdk');
let s3 = new aws.S3({
  db: process.env.mongoURI
});

const user = require('./routes/api/user');
const contacts = require('./routes/api/contacts');

const app = express();

app.use(bodyParser.json());

// Connect to Mongo (this is promise based)
mongoose
	.connect(db)
	//.connect(String(s3.db), { useNewUrlParser: true })
	.then(() => console.log('MongoDB Connected!'))
	.catch(err => console.log(err));

// Use routes
app.use('/user', user);
app.use('/contacts', contacts);

// const port = process.env.PORT || 5000;
// app.listen(port, () => console.log(`Server started up on ${port}`));

// Dynamic Heroku Port replaces the above two lines of code
app.listen(process.env.PORT || 5000, function(){
	console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
  });
