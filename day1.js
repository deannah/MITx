 function calculate(text) {
     // takes input from the user and returns the result
    var pattern = /\d+|\+|\-|\*|\/|\(|\)/g;
    var tokens = text.match(pattern); //this will tokenize (into an array) the text by the pattern we just created
    try {
        var result = evaluate(tokens);
        if (tokens.length !== 0) throw new Error("ill-formed expression");
        return String(result);
    }
    catch(err) {
        return err.message;
    }
}
            
function setup_calc(div) {
    // Sets up the input bar and button for the user.
    var input = $('<input></input>', {type: "text", size: 50}); //giving attributes with "associative array"
    var output = $('<div></div>');
    var button = $('<button>Calculate</button>');
    button.bind("click", function() {
        output.text(String(calculate(input.val()))); //we're converting it to a string
    });
    $(div).append(input,button,output);
}

function read_operand(array) {
    // Interprets the first token of the array as a number or parentheses
    // Also deals with negative numbers
    try {
        var num = 1;
        if (array[0] == "(") {
            array.shift();
            num = evaluate(array);
            if (array[0] == ")") array.shift();
            else throw new Error("Missing Parenthesis");
        }
        else {
            if (array[0] == "-") num = -1;
            num *= parseInt(array[0], 10);
            if (isNaN(num)) throw new Error ("number expected");
            array.shift();
        }
        return num;
    }
    catch (err) {
        return err.message;
    }
}

function evaluate(array) {
    // attempts to solve entered problem
    try {
        if (array.length === 0) throw new Error("missing operand");
        var value = read_operand(array);
        while (array.length !== 0) {
            var operator = array[0];
            array.shift();
            if (array.length === 0) throw new Error ("missing operand");
            var temp = read_operand(array);
            if (operator == "+") value += temp;
            else if (operator == "-") value -= temp;
            else if (operator == "*") value *= temp;
            else if (operator == "/") value /= temp;
            else throw new Error ("unrecognized operator");
            if (array[0] == ")") return value;
        }
        return value;
    }
    catch (err) {
        return err.message;
    }
}
            
$(document).ready(function () { //says to read through entire document, when it is ready, do the function
    $('.calculator').each(function () { // # is id . is class
        // this (the keyword) refers to the <div> with class calculator
        setup_calc(this);
    });
});