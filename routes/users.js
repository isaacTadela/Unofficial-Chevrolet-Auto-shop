const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const passport = require('passport');

const { ensureAuthenticated, forwardAuthenticated } = require('../config/auth');
 
// Welcome Page
router.get('/', forwardAuthenticated , (req, res) => res.render('welcome'));
router.get('/users', forwardAuthenticated , (req, res) => res.render('welcome'));

// Load User model
const User = require('../models/user');

// Login Page
router.get('/users/login', forwardAuthenticated, (req, res) => res.render('login'));

router.post('/users/login', (req, res, next) => {
  passport.authenticate('local', {
    successRedirect: '/treatments/list',
    failureRedirect: '/users/login',
    failureFlash: true
  })(req, res, next);
}); 
 
// Login with google
router.get('/users/google',passport.authenticate('google', { scope: ['profile','email','openid'] }));
 
router.get('/users/google/callback', 
  passport.authenticate('google', {
	successRedirect: '/treatments/list',
    failureRedirect: '/users/login'
  })
);
	  
// Login with facebook
router.get('/users/facebook',passport.authenticate('facebook'));

router.get('/users/facebook/callback'
,passport.authenticate('facebook', {
    successRedirect: '/',
    failureRedirect: '/users/login'
  })
);

// Register Page
router.get('/users/register',forwardAuthenticated,(req, res) => res.render('register'));

router.post('/users/register', (req, res) => {
  const { name, email, password, password2 } = req.body;
  let errors = [];

  if (!name || !email || !password || !password2) {
    errors.push({ msg: 'Please enter all fields' });
  }

  if (password != password2) {
    errors.push({ msg: 'Passwords do not match' });
  }

  if (password.length < 6) {
    errors.push({ msg: 'Password must be at least 6 characters' });
  }

  if (errors.length > 0) {
    res.render('register', {
      errors,
      name,
      email,
      password,
      password2
    });
  } else {
    User.findOne({ email: email }).then(user => {
      if (user) {
        errors.push({ msg: 'Email already exists' });
        res.render('register', {
          errors,
          name,
          email,
          password,
          password2
        });
      } else {
        const newUser = new User({
          name,
          email,
          password
        });

        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) throw err;
            newUser.password = hash;
            newUser
              .save()
              .then(user => {
                req.flash(
                  'success_msg',
                  'You are now registered and can log in'
                );
                res.redirect('/users/login');
              })
              .catch(err => console.log(err));
          });
        });
      }
    });
  }
});
  
// Logout
router.get('/users/logout', (req, res) => {
  req.logout();
  req.flash('success_msg', 'You are logged out');
  res.redirect('/');
});

module.exports = router;
