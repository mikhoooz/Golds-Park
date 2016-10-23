var passport = require('passport');
var Strategy = require('passport-facebook').Strategy;

// load the auth variables
var configAuth = require('./auth');
passport.use(new Strategy({
        clientID: configAuth.facebookAuth.clientID,
        clientSecret: configAuth.facebookAuth.clientSecret,
        callbackURL: configAuth.facebookAuth.callbackURL
    },
    function(accessToken, refreshToken, profile, cb) {
        console.log('Hi' + profile.displayName +  ' your ID is ' + profile.id );
        return cb(null, profile);
    }));


passport.serializeUser(function(user, cb) {
    cb(null, user);
});

passport.deserializeUser(function(obj, cb) {
    cb(null, obj);
});



module.exports = passport;