/**
 * Created by Mahmoud on 11/3/2016.
 */



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

// every time the user drags their mouse
// this function will be executed

paper.install(window);
var canvas;
var tileSize = 70;
window.onload = function () {
    canvas = document.getElementById('myCanvas');
    canvas.width = mapWidth*tileSize;
    canvas.height = mapHieght*tileSize;


    paper.setup('myCanvas');
    // Create a simple drawing tool:
    var tool = new Tool();
    var path;

    var i = 0;
    for (var y = 0; y<mapHieght;y++){
        for (var x = 0; x<mapWidth;x++){
            var t = gameMap[i];
            i+=2;
            if(t=="1")
                draw(x,y);
        }
    }




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



function draw(placementX, placementY)
{
    var circle = new Path.Circle({
        center: [80, 50],
        radius: 5,
        fillColor: 'red'
    });
    var width = paper.view.size.width;
    var height = paper.view.size.height;
    var raster = new paper.Raster({source: '/textures/tile_grass.png'});

    raster.size.width = tileSize;
    raster.size.height = tileSize;

    // Move the raster to the center of the view
   // raster.position.x += (paper.view.size.width/2) + placementX*tileSize;
   // raster.position.y += (paper.view.size.height/2) + placementY*tileSize;
    raster.position.x = (tileSize/2) + placementX*tileSize;
    raster.position.y = (tileSize/2) + placementY*tileSize;


    raster.scale(1);



}

function onMouseDragFunc(event) {
    // Take the click/touch position as the centre of our circle
    var x = event.middlePoint.x;
    var y = event.middlePoint.y;
    // The faster the movement, the bigger the circle
    var radius = event.delta.length / 2;
    // Generate our random color
    var color = randomColor();
    // Draw the circle
    drawCircle( x, y, radius, color );
    // Pass the data for this circle
    // to a special function for later
}

function drawCircle( x, y, radius, color ) {
    // Render the circle with Paper.js
    var circle = new Path.Circle( new Point( x, y ), radius );
    circle.fillColor =  color.red;
    // Refresh the view, so we always get an update, even if the tab is not in focus
    view.draw();
}

