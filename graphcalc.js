function setup_calc(div){
    
	var canvas1 = $('<canvas></canvas>', {id: "screen", width: 385, height:300});
	var input1 = $('<input></input>', {type: 'text', id: "input1"});
	var input2 = $('<input></input>', {type: 'text', id: "input2"});
	var input3 = $('<input></input>', {type: 'text', id: "input2"});
	var plotB = $('<button>Plot</button>', {onclick: "graph(canvas1, input1.val(), input2.val(), input3.val())"});
	var text1 = $('<text>f(x): </text>');
	var text2 = $('<text> min x: </text>');
	var text3 = $('<text> max x: </text>');
	
	var screenDiv = $('<div></div>');
	var divR1 = $('<div></div>');
	var divR2 = $('<div></div>');
	var divR3 = $('<div></div>');
	
	$(screenDiv).append(canvas1);
	$(divR1).append(text1, input1);
	$(divR2).append(text2, input2, text3, input3);
	$(divR3).append(plotB);


	$(div).append(screenDiv, divR1, divR2, divR3);
}

function graph(canvas, func, min, max){
	try{
		var tree = calculator.parse(func);
	}catch(err){
		// error on canvas
		//var JQcanvas = $('#screen');
		var DOMcanvas = canvas[0];    
		var ctx = DOMcanvas.getContext('2d'); // ctx: context
		ctx.beginPath();
	
		ctx.fillStyle = "black";
		ctx.font = "20px Georgia";
		ctx.textAlign = "center"; //left, right
		ctx.textBaseline = "middle"; //top, bottom, alphabetic
		ctx.fillText(err, 100, 100);//string, x, y
		
	}
}

$(document).ready(function(){
   $('.graphcalc').each(function(){
       setup_calc(this);
   })
});