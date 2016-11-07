/**
 * Created by Mahmoud on 11/6/2016.
 */



socket.on('chat', function (data) {

});
socket.on('map 1', function (data) {

});




//'chat message'
function emit(msgHeader,msg) {
    socket.emit(msgHeader, msg);
}


