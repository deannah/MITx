

// function setup_button(this){

// }

$(document).ready(function(){
   $('.tallButton').bind('click', function() {
       var expression = $('#expression');
       var input = expression.text().trim();
       
       expression.text(String(calculate(input)));
   });
   $('.numberButton').bind('click', function(){
       var expression = $('#expression');
       var input = $(this).text(); //this being the button that was pressed
       console.log(expression);
       expression.append(input);
   });
   $('.expressionButton').bind('click', function(){
       var expression = $('#expression');
       var input = $(this).text(); //this being the button that was pressed
       var temp=input;
       switch(input.charCodeAt(0)){
                case 247:
                    temp='/';
                    break;
                case 215:
                    temp='*';
                    break;
                case 8722:
                    temp='-';
                    break;
           }
    
       console.log(input);
       expression.append(input);
   });
   $('.mButton').bind('click', function(){
       
   });
    // $('.squareButton').each(function(){
      //'this' refers to the <div> with class calculator
    //  setup_button(this);
   //}); 
});