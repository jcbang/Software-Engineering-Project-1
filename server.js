const express = require('express');
// const mongoose = require('mongoose');
const bodyParser = require('body-parser');
// const db = require('./config/keys').mongoURI; // our access key for the database

// For our routes to work
// const contacts = require('./routes/api/contacts');
const app = express();

app.use(bodyParser.json());

// Connect to Mongo (this is promise based)
// mongoose
//     .connect("mongodb+srv://JCBang:G73XgEPumDZEMGJm@ucf-spc-poosw-project1-exub3.azure.mongodb.net/test?retryWrites=true&w=majority")
//     .then(() => console.log('MongoDB Connected!'))
//     .catch(err => console.log(err))

// Use routes
// app.use('/api/contacts', contacts)
app.use('/', require('./routes/api/register'));

const port = process.env.PORT || 5000

app.listen(port, () => console.log(`Server started up on ${port}`))
