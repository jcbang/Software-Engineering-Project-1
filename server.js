const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const db = require('./config/keys').mongoURI; // our access key for the database

// For our routes to work
const contacts = require('./routes/api/contacts')

const app = express();

// Bodyparser Middleware
app.use(bodyParser.json());

// Connect to Mongo (this is promise based)
mongoose
    .connect(db)
    .then(() => console.log('MongoDB Connected!'))
    .catch(err => console.log(err))

// Use routes
app.use('/api/contacts', contacts)

// For Heroku deployment
const port = process.env.PORT || 5000

app.listen(port, () => console.log(`Server started up on ${port}`))
