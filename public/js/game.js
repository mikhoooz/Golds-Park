/**
 * Created by Mahmoud on 11/3/2016.
 */

var canvas;
var tileSize = 70;
var size;
// Returns an object specifying a semi-random color
// The color will always have a red value of 0
// and will be semi-transparent (the alpha value)
function randomColor() {

    return {
        red: 0,
        green: Math.random(),
        blue: Math.random(),
        alpha: ( Math.random() * 0.25 ) + 0.05
    };
}

function init(){
    paper.install(window);
    canvas = document.getElementById('myCanvas');
    canvas.width = mapWidth*tileSize;
    canvas.height = mapHieght*tileSize;
    paper.setup('myCanvas');
    size = new Size(tileSize,tileSize);
}

function drawMap(){
    var i = 0;
    for (var y = 0; y<mapHieght;y++){
        for (var x = 0; x<mapWidth;x++){
            var t = gameMap[i];
            i+=2;

            draw(x,y,0);
            if(t=="1")
                draw(x,y,t)
        }
    }
}




window.onload = function () {

    init();
    drawMap();
    // Create a simple drawing tool:
    var tool = new Tool();
    var path;

    circle = new Path.Circle({
        center: [80, 50],
        radius: 5,
        fillColor: 'red'
    });


    // view.onFrame = function(event){
    //     // Each frame, rotate the path by 3 degrees:
    //     // console.warn("ssd");
    //     // circle.position.x = circle.position.x + 3;
    //
    // };

    document.onkeydown = function(e) {
        switch (e.keyCode) {
            case 37:
                emit("move","Left");
                circle.position.x = circle.position.x - 3;
                break;
            case 38:
                emit("move","Up");
                circle.position.y = circle.position.y - 3;
                break;
            case 39:
                emit("move","Right");
                circle.position.x = circle.position.x + 3;
                break;
            case 40:
                emit("move","Down");
                circle.position.y = circle.position.y + 3;
                break;
        }
    };

    // Define a mousedown and mousedrag handler
    tool.onMouseDown = function (event) {
        path = new Path();
        path.strokeColor = 'black';
        path.add(event.point);
    };

    tool.onMouseDrag = function (event) {
        //path.add(event.point);
        onMouseDragFunc(event);
    };
};





var circle

function draw(placementX, placementY,tileType)
{

    var width = paper.view.size.width;
    var height = paper.view.size.height;
    var raster;

    if(tileType=="0"){
        raster = new paper.Raster({source: '/textures/tile_grass.png'});
    } else if (tileType=="1"){
        raster = new paper.Raster({source: '/textures/tree_1.png'});
    }
    raster.size.width = tileSize;
    raster.size.height = tileSize;

    // Move the raster to the center of the view
   // raster.position.x += (paper.view.size.width/2) + placementX*tileSize;
   // raster.position.y += (paper.view.size.height/2) + placementY*tileSize;
    raster.position.x = (tileSize/2) + placementX*tileSize;
    raster.position.y = (tileSize/2) + placementY*tileSize;


    raster.scale(1);



}

// function onMouseDragFunc(event) {
//     // Take the click/touch position as the centre of our circle
//     var x = event.middlePoint.x;
//     var y = event.middlePoint.y;
//     // The faster the movement, the bigger the circle
//     var radius = event.delta.length / 2;
//     // Generate our random color
//     var color = randomColor();
//     // Draw the circle
//     drawCircle( x, y, radius, color );
//     // Pass the data for this circle
//     // to a special function for later
// }
// var circle;
// function drawCircle( x, y, radius, color ) {
//     // Render the circle with Paper.js
//     circle = new Path.Circle( new Point( x, y ), radius );
//     circle.fillColor =  color.red;
//     // Refresh the view, so we always get an update, even if the tab is not in focus
//     view.draw();
// }

