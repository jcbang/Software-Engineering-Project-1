process.env.NODE_TLS_REJECT_UNAUTHORIZED = false

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const db = require('./config/keys').mongoURI; // our access key for the database
const path = require('path');
const port = process.env.PORT || 5000;

// Attempt to pull from Heroku
const aws = require('aws-sdk');
let s3 = new aws.S3({
  db: process.env.mongoURI
});

const user = require('./routes/api/user');
const contacts = require('./routes/api/contacts');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Connect to Mongo (this is promise based)
mongoose
	.connect(db)
	//.connect(String(s3.db), { useNewUrlParser: true })
	.then(() => console.log('MongoDB Connected!'))
	.catch(err => console.log(err));

// Use routes
app.use('/api/user', user);
app.use('/api/contacts', contacts);

// Anything that doesn't match the above, send back the index.html file
app.get('*', (req, res) => {
	res.sendFile(path.join(__dirname + '/client/build/index.html'))
})

app.listen(port, () => console.log(`Listening on port ${port}`));

