const express = require('express');
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
const path = require('path');

const db = require('./config/database');       //calling exported codes from database.js file

db.authenticate()         //testing the database
    .then(() => console.log('Database connected...'))
    .catch(err => console.log('Error: ' + err))

const app = express();      //initialize app
app.use(bodyParser());      //initialize body parser

//Handlebars
// app.engine('handlebars', exphbs({defaultLayout: 'main'}));
// app.set('view engine', 'handlebars');

app.get('/', (req, res) => res.send('INDEX'));      //route to access server. res.send to check in browser

//Gigs route
app.use('/gigs', require('./routes/gigs'));

const PORT = process.env.PORT || 5000;      //defining local port

app.listen(PORT, console.log(`Server started on port ${PORT}`)); //run server. ${} to insert other data type