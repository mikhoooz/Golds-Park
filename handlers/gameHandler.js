/**
 * Created by Mahmoud on 11/7/2016.
 */
var HashMap = require('hashmap');
var mapOfConnectedPlayers = {};


module.exports.handleMove = function handleMove(user,move){
    mapOfConnectedPlayers[user.id].x++;
    mapOfConnectedPlayers[user.id].y--;
    console.log(mapOfConnectedPlayers[user.id]);
};


module.exports.handleNewConnection = function handleMove(user){
    mapOfConnectedPlayers[user.id] = {x:5,y:5};
};

