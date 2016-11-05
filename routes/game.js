var express = require('express');
var game = express.Router();




/* GET game page, put user in board and start chat app. */
game.get('/',
    function(req, res) {
      if(!req.isAuthenticated()) {
        res.redirect('/');
      } else {
          var map = ['1','1','1','1','1','1','1','1','1'
                    ,'1','0','1','1','0','1','1','0','1'
                    ,'1','0','0','0','0','0','0','0','1'
                    ,'1','0','1','1','0','1','1','0','1'
                    ,'1','0','0','0','0','0','0','0','1'
                    ,'1','0','1','1','0','1','1','0','1'
                    ,'1','1','1','1','1','1','1','1','1'];
          var width = 9;
          var height = 7;
          var tileSize = 70;
          res.render('game', { user: req.user, myGameMap: map, mapWidth:width,mapHieght:height,tileSize:tileSize });
      }
    });

module.exports = game;
