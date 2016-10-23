var express = require('express');
var game = express.Router();

/* GET game page, put user in board and start chat app. */
game.get('/',
    function(req, res) {
      if(!req.isAuthenticated()) {
        res.redirect('/');
      } else {
        res.render('game', { user: req.user });
      }
    });

module.exports = game;
