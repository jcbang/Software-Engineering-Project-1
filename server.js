const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
// const db = require('./config/keys').mongoURI; // our access key for the database

const app = express();

app.use(bodyParser.json());

const db = require('./config/keys').mongoURI;

// Connect to Mongo (this is promise based)
mongoose
  .connect(db)
  .then(() => console.log('MongoDB Connected!'))
  .catch(err => console.log(err));

// Use routes
app.use('/contacts', require('./routes/api/contacts'));
app.use('/user', require('./routes/api/user'));

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server started up on ${port}`));