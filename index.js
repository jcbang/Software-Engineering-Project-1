const express = require('express');
const cowsay = require('cowsay');
const cors = require('cors');
const path = require('path');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const mongoose = require('mongoose');

// Create the server using express
const app = express();
app.use(bodyParser.json());
app.use(helmet());
app.use(cors());

// Serve static files from the React frontend app
app.use(express.static(path.join(__dirname, 'client/build')))

// Loads keys based on production deploy or localhost
var db;
var env = process.env.NODE_ENV || 'dev';
console.log("Starting up the server in " + env + " mode");
switch (env) {
	case 'dev':
		db = require('./config/keys').mongoURI; // our access key for the database
		break;
	case 'production':
		db = process.env.mongoURI;
		break;
}

// Connect to Mongo
mongoose
	.connect(String(db), { useNewUrlParser: true })
	.then(() => console.log('MongoDB Connected!'))
	.catch(err => console.log(err));

// Import the routes
const routes = require('./routes');

// Login API
app.post('/api/user/login', routes.postLogin);

// Serve our api route /cow that returns a custom talking text cow
app.get('/api/cow/:say', cors(), async (req, res, next) => {
  try {
    const text = req.params.say
    const moo = cowsay.say({ text })
    res.json({ moo })
  } catch (err) {
    next(err)
  }
})

// Serve our base route that returns a Hellow World cow
app.get('/api/cow/', cors(), async (req, res, next) => {
  try {
    const moo = cowsay.say({ text: 'Hello World!' })
    res.json({ moo })
  } catch (err) {
    next(err)
  }
})

// Anything that doesn't match the above, send back the index.html file
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname + '/client/build/index.html'))
})

// Choose the port and start the server
const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
  console.log(`Mixing it up on port ${PORT}`)
})
