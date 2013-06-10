 function calculate(text) {
    var pattern = /\d+|\+|\-|\*|\/|\(|\)/g; //using regular expressions or regexp
    var tokens = text.match(pattern); //this will tokenize (into an array) the text by the pattern we just created
    return JSON.stringify(tokens); //JSON takes things from javascript and makes it into text for the server
}
            
function setup_calc(div) {
    var input = $('<input></input>', {type: "text", size: 50}); //giving attributes with "associative array"
    var output = $('<div></div>');
    var button = $('<button>Calculate</button>');
    button.bind("click", function() {
        output.text(String(calculate(input.val()))); //we're converting it to a string
    });
    
    $(div).append(input,button,output);
}

function read_operand(array) {
    try {
        var num = parseInt(array[0]);
        array.shift();
        if (isNaN(num)) throw "number expected";
        return num;
    }
    catch (err) {
        
    }
}
            
$(document).ready(function () { //says to read through entire document, when it is ready, do the function
    $('.calculator').each(function () { // # is id . is class
        // this (the keyword) refers to the <div> with class calculator
        setup_calc(this);
    });
});