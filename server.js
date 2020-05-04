require('./models/db');
  
const express = require('express');
const path = require('path');
const exphbs = require('express-handlebars');
const bodyparser = require('body-parser');
const passport = require('passport');
const flash = require('connect-flash');
const session = require('express-session');
const mongoose = require('mongoose');
const treatmentController = require('./controllers/treatmentController');
const FacebookStrategy = require('passport-facebook').Strategy;

// Passport Config
require('./config/passport')(passport);

var app = express();
app.use(bodyparser.urlencoded({
    extended: true
}));

// Express session
app.use(
  session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
  })
);

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// Connect flash
app.use(flash());

// Global variables
app.use(function(req, res, next) {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error = req.flash('error');
  next();
});

app.use(bodyparser.json());
app.set('views', path.join(__dirname, '/views/'));
app.engine('hbs', exphbs(
{ 	extname: 'hbs', 
	defaultLayout: 'mainLayout', 
	layoutsDir: __dirname + '/views/layouts/' }));
app.set('view engine', 'hbs');

// Routes 
app.use('/', require('./routes/users.js'));
//app.use('/users', require('./routes/users.js'));
app.use('/treatments', require('./controllers/treatmentController.js'));

const PORT = process.env.PORT || 3000;

app.listen(PORT, console.log(`Server started on port ${PORT}`));