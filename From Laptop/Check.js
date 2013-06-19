var sys = require("sys"),  
my_http = require("http"); 
my_url = require("url"); 
my_http.createServer(function(request,response){  
    sys.puts("I got kicked");  
    var data = my_url.parse(request.url, true).query;
    response.writeHeader(200, {"Content-Type": "text/plain",
    	'Access-Control-Allow-Origin': '*'
	});  
    //response.write(checkAnswer());
    var currentQuestionIndex = data.question;
    var answer = data.ans;
    var checked = checkAnswer(currentQuestionIndex, answer);
    console.log("checked: " + checked);
    response.write(checked);
    response.end();  
}).listen(8080);  
sys.puts("Server Running on 8080");  


	
var solutions = [0, 0, 2];
	
function checkAnswer(q, a) {
	// takes a question index and student's input. will return true if answer correct.
    var correctAns = solutions[q];
    if (correctAns == a) {return "true";}
    else {return "false";}
}
