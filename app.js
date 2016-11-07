var express = require('express');
var passport = require('./config/passport.js');
var session = require('express-session');
var favicon = require('serve-favicon');
var path = require('path');
var cookieParser = require('cookie-parser');
var index = require('./routes/index');
var game = require('./routes/game');
var gameHandler = require('./handlers/gameHandler');

// Create a new Express application.
var app = express();

// Configure view engine to render EJS templates.
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(express.static(__dirname + '/public'));
var sessionMiddleware = session({
        secret: 'SomeSecretStuffThatYouShouldNotReadAnyMore',
        resave: true,
        saveUninitialized: true,
        cookieParser: cookieParser
});

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
    // add a item

    if(typeof socket.request.session.passport !== 'undefined') {
        var user = socket.request.session.passport.user;
        console.log(user + "connected");
        gameHandler.handleNewConnection(user);
    }
    console.log('someone connected with socket Id' + socket.id);
  //  socket.join('room1');
   // nsp.emit('nsp1','Connected to namespace1');
    socket.on('chat message', function(msg){
        console.log('message: ' + msg);
    });

    socket.on('move', function(msg){
        var user = socket.request.session.passport.user;
        gameHandler.handleMove(user,msg);
        console.log('message: ' + msg);
        console.log(user);


    });
});
