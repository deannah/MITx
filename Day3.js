function test_clear() {
    // clears the canvas
    var JQcanvas = $('#test:first');
    var DOMcanvas = JQcanvas[0];
    var ctx = DOMcanvas.getContext('2d');
    
    ctx.clearRect(0,0, JQcanvas.width(), JQcanvas.height()); // ( x, y, width, height) with x and y being top left corner
}

function test_line() {
    // draws a line. Except now it draws a rectangle.
    var JQcanvas = $('#test:first');
    var DOMcanvas = JQcanvas[0];
    var ctx = DOMcanvas.getContext('2d');
    
    ctx.beginPath();
    ctx.moveTo(50,50);
    ctx.lineTo(50,150);
    ctx.lineTo(150,150);
    ctx.lineTo(150,50);
    ctx.lineTo(50,50);
    ctx.lineWidth = 10;
    ctx.strokeStyle = "red";
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.stroke();
    ctx.fillStyle = "black";
    ctx.fill();
}

function test_rectangle() {
    // draws a couple of squares
    var JQcanvas = $('#test:first');
    var DOMcanvas = JQcanvas[0];
    var ctx = DOMcanvas.getContext('2d');
    
    ctx.beginPath();
    ctx.fillStyle = "red";
    ctx.fillRect(25,25,100,100);
    ctx.fillStyle = "blue";
    ctx.fillRect(75,75,100,100);
}

function test_smiley() {
    // Draws a smiley face
    var JQcanvas = $('#test:first');
    var DOMcanvas = JQcanvas[0];
    var ctx = DOMcanvas.getContext('2d');
    
    ctx.beginPath(); // Yellow circle with black border
    ctx.arc(100, 100, 75, 0, 2*Math.PI); // (centerX, centerY, radius, start angle, end angle) angles measured down from horizontal
    ctx.lineWidth = 5;
    ctx.fillStyle = "yellow";
    ctx.fill();
    ctx.strokeStyle = "black";
    ctx.stroke();
    
    ctx.beginPath(); // left eye
    ctx.moveTo(80,70);
    ctx.lineTo(80,90);
    ctx.strokeStyle = "black";
    ctx.lineCap = "round";
    ctx.lineWidth = 5;
    ctx.stroke();
    
    ctx.beginPath(); // right eye
    ctx.moveTo(120,70);
    ctx.lineTo(120,90);
    //ctx.strokeStyle = "black";
    ctx.lineCap = "round";
    ctx.lineWidth = 5;
    ctx.stroke();
    
    ctx.beginPath(); //mouth
    ctx.arc(100,115,32,Math.PI/6,Math.PI*5/6);
    ctx.stroke();
}

function test_mouse() {
    // mousey mousey things.
    var JQcanvas = $('#test:first');
    var DOMcanvas = JQcanvas[0];
    var ctx = DOMcanvas.getContext('2d');
    
    // below will update it dynamically and allow for a background image
    var bg_image = $("<canvas></canvas>")[0]; // we make it the DOM object
    bg_image.width = 200;
    bg_image.height = 200;
    
    // the below creates a background image so that the crosshairs won't be infinite
    var bctx = bg_image.getContext('2d');
    bctx.fillStyle = "#F0FFF0";
    bctx.fillRect(0,0,200,200);
    bctx.fillStyle = "#FF00FF";
    bctx.fillRect(10,10,100,100);
    ctx.drawImage(bg_image, 0, 0);
    
    // below will update the crosshairs and draw them
    JQcanvas.on("mousemove", function(event) {
        var mousex = event.pageX; // this gives X,Y wrt origin at top left of browser. we want them wrt the canvas origin 
        var mousey = event.pageY;
        var offset = JQcanvas.offset(); // {left: ..., top: ...} little array
        mousex = Math.round(mousex - offset.left); // we're rounding to make it neat, not strictly necessary
        mousey = Math.round(mousey - offset.top);
        
        ctx.drawImage(bg_image, 0, 0); // prevents infinite crosshairs
        
        ctx.beginPath(); //drawing a crosshair over cursor location
        ctx.moveTo(mousex-10, mousey);
        ctx.lineTo(mousex+10, mousey);
        ctx.moveTo(mousex, mousey-10);
        ctx.lineTo(mousex, mousey+10);
        ctx.strokeStyle="black";
        ctx.lineWidth = 1;
        ctx.stroke();
    });
}

function test_text() {
    // draws text
    var JQcanvas = $('#test:first');
    var DOMcanvas = JQcanvas[0];
    var ctx = DOMcanvas.getContext('2d');
    
    ctx.fillStyle = "black";
    ctx.font = "20px Georgia";
    ctx.textAlign = "center"; // or could do left or right. Vertical alignment.
    ctx.textBaseline = "middle"; // or top, buttom, or alphabetic. Horizontal alignment.
    ctx.fillText("Hi!", 100, 100); // (string, x, y);
}