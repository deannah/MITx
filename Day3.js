function test_clear() {
    // clears the canvas
    var JQcanvas = $('#test:first');
    var DOMcanvas = JQcanvas[0];
    var ctx = DOMcanvas.getContext('2d');
    
    ctx.clearRect(0,0, JQcanvas.width(), JQcanvas.height()); // ( x, y, width, height) with x and y being top left corner
}

function test_line() {
    // draws a line.
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
}