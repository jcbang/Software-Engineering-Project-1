const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
// const db = require('./config/keys').mongoURI; // our access key for the database

// For our routes to work
const contacts = require('./routes/api/contacts');
// const user = require('./routes/api/user')

const app = express();

app.use(bodyParser.json());

// Connect to Mongo (this is promise based)
mongoose
    // .connect("mongodb+srv://JCBang:fgT!aETWybGke5H@ucf-spc-poosw-project1-exub3.azure.mongodb.net/test?retryWrites=true&w=majority\n")
    .connect("mongodb+srv://JCBang:G73XgEPumDZEMGJm@ucf-spc-poosw-project1-exub3.azure.mongodb.net/contact_manager?retryWrites=true&w=majority")
    .then(() => console.log('MongoDB Connected!'))
    .catch(err => console.log(err))

// Use routes
app.use('/api/contacts', contacts)
app.use('/user', require('./routes/api/user'));

const port = process.env.PORT || 5000

app.listen(port, () => console.log(`Server started up on ${port}`))
