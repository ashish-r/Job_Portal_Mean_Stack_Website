var express = require('express');
var router = express.Router();
var User = require('../models/user');
var passport = require('passport');
/* GET users listing. */
router.get('/', function(req, res, next) {
    User.find({}, function(err, car) {
        res.json(car);
    });
});

router.get('/cuser', function(req, res, next) {
    res.json(req.user);
});

/* Transfer call to facebook */
router.get('/auth/facebook', passport.authenticate('facebook'));
/* Handle callback requests */
router.get('/facebook/callback', function(req, res, next) {
    console.log('Enter');
    passport.authenticate('facebook', function(user) {
        // Checking if user object is present
        if(user.user){
            req.logIn(user.user, function(err){});
        }
        res.redirect('/');
    })(req, res, next);
});
/* logout */
router.get('/logout', function(req, res) {
    req.logout();
    res.redirect('/');
});
/* Get Current User */
router.get('/user', function (req, res) {
    if (req.user) {
        res.json(req.user);
    } else {
        res.json({error: 'Not Logged In!'});
    }
});
/* Demo login */

router.get('/dlogin', function(req, res) {
    User.findOne({
        name: 'Prashant Kumar'
    }, function(err, user) {
        if (err || !user) {
            return res.send('False');
        }
        req.logIn(user, function(err) {});
        res.json(req.user);
    });
});

//logout
router.get('/logout', function(req, res) {
    req.logout();
    res.send({success: 'Logout successful'});
});

module.exports = router;
