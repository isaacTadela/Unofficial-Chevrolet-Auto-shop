const LocalStrategy = require('passport-local').Strategy;
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const FacebookStrategy = require('passport-facebook').Strategy;
const GoogleStrategy = require('passport-google-oauth20').Strategy;
require('dotenv').config();


// Load User model
const User = require('../models/user');

module.exports = function(passport) {
  
  // Use LocalStrategy within Passport.
  passport.use( 
    new LocalStrategy({ usernameField: 'email' }, (email, password, done) => {
      // Match user
      User.findOne({
        email: email
      }).then(user => {
        if (!user) {
          return done(null, false, { message: 'That email is not registered' });
        }
        // Match password
        bcrypt.compare(password, user.password, (err, isMatch) => {
          if (err) throw err;
          if (isMatch) {
            return done(null, user);
          } else {
            return done(null, false, { message: 'Password incorrect' });
          }
        });
      });
    })
  ); 
 
  // Use the FacebookStrategy from Passport
  passport.use(new FacebookStrategy({
    clientID: process.env.facebook_api_key,
    clientSecret: process.env.facebook_api_secret,
    callbackURL: process.env.facebook_callback_url,
	profileFields: ["email", "name"]
   }, function(accessToken, refreshToken, profile, done) {
		var user = {
             name: profile._json.first_name+" "+profile._json.last_name,
			 email: profile._json.email,
			 password: profile._json.id,
             //birthday: profile._json.birthday
        };
        User.findOneOrCreate({name: user.name, email: user.email, password: user.password }
		, user, function (err, user) {
			 return done(err, user);
        });
		}
	)); 
 
	// Use the GoogleStrategy from Passport
	passport.use(new GoogleStrategy({
    clientID: process.env.google_client_id,
    clientSecret: process.env.google_client_secret,
    callbackURL: process.env.google_callback_url
	},function(accessToken, refreshToken, profile, done) {
		var user = {
             name: profile.displayName,
			 email: profile.emails[0].value,
			 password: profile.id
        }; 
    User.findOneOrCreate({name: user.name, email: user.email, password: user.password }
		, user, function (err, user) {
			 return done(err, user);
        });
		}
	));

  passport.serializeUser(function(user, done) {
    done(null, user.id);
  });

  passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
      done(err, user);
    });
  });
  
};
