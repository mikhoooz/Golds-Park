var express = require('express');
var passport = require('./config/passport.js');
var session = require('express-session');
var favicon = require('serve-favicon');
var path = require('path');

var index = require('./routes/index');
var game = require('./routes/game');


// Create a new Express application.
var app = express();

// Configure view engine to render EJS templates.
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(express.static(__dirname + '/public'));
var sessionMiddleware = session({
        secret: 'SomeSecretStuffThatYouShouldNotReadAnyMore',
        resave: true,
        saveUninitialized: true });

// Use application-level middleware for common functionality, including
// logging, parsing, and session handling.
//app.use(favicon(path.join(__dirname, 'public/ico', 'favicon.ico')));
app.use(require('morgan')('combined'));
app.use(require('cookie-parser')());
app.use(require('body-parser').urlencoded({ extended: true }));

// Initialize Passport and restore authentication state, if any, from the
// session.
app.use(sessionMiddleware);
app.use(passport.initialize());
app.use(passport.session());



app.use('/',index);
app.use('/game',game);

app.get('/login/facebook',
    passport.authenticate('facebook'));

app.get('/login/facebook/return',
    passport.authenticate('facebook', { failureRedirect: '/login' }),
    function(req, res) {
        res.redirect('/game');
    });




var server = require('http').Server(app);
var io = require('socket.io')(server);

server.listen(3000);

io.use(function(socket,next){
    sessionMiddleware(socket.request,socket.request.res,next);
});


var nsp = io.of('/game');
nsp.on('connection', function(socket){
    console.log('someone connected');
    nsp.emit('nsp1','Connected to namespace1');
});
