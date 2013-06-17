// From Day 6, Monday the 17th

var quiz = function() {
    
    
    var exports = {};
    
    var questions = [
        {"questionText": "Sam thinks y=2x is going to ___ as x goes from 1 to 10.",
        "options": ["increases", "decreases", "goes up then down", "goes down then up"],
        "solutionIndex": 0 },
        
        {"questionText": "Jill thinks y=2x-5 is going to ___ as x goes from 1 to 10.",
        "options": ["increases", "decreases", "goes up then down", "goes down then up"],
        "solutionIndex": 0 },
        
        {"questionText": "What color is the sky?",
        "options": ["red", "green", "blue", "yellow", "clear"],
        "solutionIndex": 2 }
    ]; 
    // structure with questionText, solution, options
    // questions = ["text of question", solution, options], ...., ....
    
    
    
    var flag = localStorage.flag; // if true, use local storage to store student data
    var score, currentQuestionIndex; //Student, student;
    
    
    function checkAnswer() {
        // takes a question index and student's input. will return true if answer correct.
        var correctAns = questions[currentQuestionIndex].solutionIndex;
        var input = $('input[name=option]:checked').val();
        return correctAns==input;
    };
    
    function displayQuestion() {
        // display current quiz question to the student, by dynamically creating HTML.
        
        var quizDiv = $(".quiz");
        var questionDiv = $("<div class='question'></div>");
        var qText = questions[currentQuestionIndex].questionText;
        questionDiv.append(currentQuestionIndex+1, ".) ", qText);
        
        quizDiv.append(questionDiv);
        
        
        for(var i=0; i<questions[currentQuestionIndex].options.length; i++) {
            var optText = questions[currentQuestionIndex].options[i];
            
            var optDiv = $("<div class='option'></div>");
            
            var optRadio = $("<input type='radio' name='option' value='" + i + "'>" + optText + "</input>");
            optDiv.append(optRadio);
            quizDiv.append(optDiv);
        }
        
        var checkDiv= $("<div class='check'></div>");
        var checkButton = $("<button class='checkButton'>Check</button>");
        checkDiv.append(checkButton);
        
        quizDiv.append(checkDiv);
        
        var responseDiv = $("<div class='response'></div>");
        var scoreDiv = $("<div class='score'></div>");
        checkButton.on("click", function() {
            // need to do: checkAnswer, something something, depends on how he wants to format it
            $(".response").html("");
            if (checkAnswer() === true) {
                responseDiv.append("Good job!");
                incrementScore();
            }
            else {
                responseDiv.append("Wrong, you're a terrible person, you should feel bad.");
            }
            scoreDiv.html("");
            scoreDiv.append("Current score: " + score);
            
            quizDiv.append(responseDiv, scoreDiv);
            $(".check").html(""); // clears check button
            
            if (currentQuestionIndex < questions.length-1) {
                var nextDiv = $("<div class='next'></div>");
                var nextButton = $("<button class='nextButton'>Next</button>");
                nextDiv.append(nextButton);
                quizDiv.append(nextDiv);
                currentQuestionIndex++;
                if (flag===true) { localStorage.currentQuestionIndex = currentQuestionIndex; }
                nextButton.on("click", function() {
                    $(".quiz").html("");
                    displayQuestion();
                });
            }
            else {
                var congratsDiv = $("<div class='congrats'></div>");
                congratsDiv.append("Congratulations, you finished the quiz!")
                
                scoreDiv.html("");
                scoreDiv.append("Final score: " + score);
                
                quizDiv.append(congratsDiv, scoreDiv);
            };
        });
        
        console.log("Question has been displayed");
    };
    
    function incrementScore() {
        // called when a student gets a question right.
        score++;
        if (flag===true) { localStorage.score=score; }
    };
    
    function setup() {
        if (flag === undefined) {
            var r=confirm("Would you like to use local storage? If you press cancel, your data will be stored on our server instead.");
            if (r=== true) {
                flag=true;
                localStorage.flag=true;
            }
            else {
                flag=false;
                localStorage.flag=false;
                var Student = Parse.Object.extend("Student");
                var student = new Student();
                student.set("score", 0);
                student.set("currentQuestionIndex", 0);
                console.log("About to save");
                student.save(null, {
                    success: function(student) {
                        alert("Your file has been created on our server!");
                    },
                    failure: function(student, error) {
                        alert("Our server is malfunctioning! Error Code: " + error.description);
                    }
                });
                console.log("just tried to save");
                // student.save({
                //     score:0,
                //     currentQuestionIndex: 0
                // }, {
                //     success: function(student) {
                //         alert("Your file has been created on our server!");
                //     },
                //     failure: function(student, error) {
                //         alert("Our server is malfunctioning! Error Code: " + error.description);
                //     }
                // });
            }
        }
        if (flag===true) {
            if (localStorage.score === null) {
                localStorage.score=0;
            }
            if (localStorage.currentQuestionIndex === null) {
                localStorage.score=0;
            }
        
            score = parseInt(localStorage.score, 10); //score of the student
            currentQuestionIndex= parseInt(localStorage.currentQuestionIndex, 10); // index of the question the student is on
        }
        else {
            score = student.get("score");
            currentQuestionIndex = student.get("currentQuestionIndex");
            if (score===undefined) {
                score=0;
            }
            if (currentQuestionIndex===undefined) {
                currentQuestionIndex=0;
            }
        }

        displayQuestion();
    };
    
    exports.setup = setup;
    exports.flag = flag;
    return exports;
}();

$(document).ready(function() {    
    Parse.initialize("FtwqHLQjjC5OA4zSMxpvdweC6CVurTOHI8icLWJP", "PkajPu3YCmPWwkVjJ1dtWBZaohGRrWOctoPvN6Rs");
    
    quiz.setup();
    
    // var req = $.ajax({
    //     async: false, //this is necessary to make this print before what prints, but you normally don't want this
    //     url: "http://localhost:8080/", //dunno if https is allowed here.
    //     data: {id : 10,
    //     }
    // });
    
    // req.done(function(msg) {
    //     console.log(msg);
    // });
    // console.log("what");
});