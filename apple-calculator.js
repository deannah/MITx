// Day 2

// function setup_button(this){

// }
var actual_expression='';
var last_click='';
$(document).ready(function(){
   $('.tallButton').bind('click', function() {
       var expression = $('#expression');
       
       console.log(actual_expression);
       var input = actual_expression.trim();
       last_click='equal';
       expression.text(String(calculate(input)));
       actual_expression=expression.text();
   });
   $('.numberButton').bind('click', function(){
       
       var expression = $('#expression');
       var current= $('#current');
       var input = $(this).text();
       
       if(last_click==='equal'){
           expression.text('');
           actual_expression='';
       }else if(last_click==='number'||last_click===''){
           current.append(input);
       }else if(last_click==='operation'){
           current.text('');
           current.append(input);
       }
        //this being the button that was pressed
       last_click='number';
   });
   $('.expressionButton').bind('click', function(){
       var expression = $('#expression');
       var current= $('#current');
       var input = $(this).text(); //this being the button that was pressed
       var actual_input=input;
           switch(input.charCodeAt(0)){
                    case 247:
                        actual_input='/';
                        break;
                    case 215:
                        actual_input='*';
                        break;
                    case 8722:
                        actual_input='-';
                        break;
               }
    
       if(last_click==='number'){
           
           expression.append(current.text()+input);
           actual_expression=actual_expression.concat(current.text+actual_input);
       }else if(last_click==='operation'){
           var current_exp=expression.text();
           var current_actual_exp=actual_expression;
           expression.text(current.substring(0,current.length-2) + input);
           actual_expression=actual_expression.substring(0, actual_expression.length-2)+actual_input;
       
       }
       last_click='operation';
       
       console.log(actual_expression);
   });
   $('.mButton').bind('click', function(){
       last_click='m';
   });
   $('.clearButton').bind('click', function(){
       $('#expression').text('');
       actual_expression='';
       last_click='clear';
   });
});