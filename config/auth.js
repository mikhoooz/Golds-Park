/**
 * Created by Mahmoud on 10/15/2016.
 */


// config/auth.js

// expose our config directly to our application using module.exports
module.exports = {

    'facebookAuth' : {
        'clientID'      : '1774606829468352', // your App ID
        'clientSecret'  : '1e44565bfdd91233570c549cadd286af', // your App Secret
        'callbackURL'   : 'http://localhost:3000/login/facebook/return'
    }
};