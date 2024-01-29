
var buttonColours =["red","blue", "green", "yellow"]
var gamePattern = [];
var userClickedPattern = [];
// keep track of whether if the game has started or not, so you only call nextSequence() on the first keypress.
var started = false;
var level = 0;


//Step 7 - Star the game
$(document).on("keydown", function () {
    if (!started) {
        $("#level-title").text("Level " + level);
        nextSequence();
        started = true;
    }    
});

$(".btn").click(function(){
    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);
    // console.log(userClickedPattern);
    playSound(userChosenColour);  
    animatePress(userChosenColour);
    checkAnswer(userClickedPattern.length-1);
});

//Step 8 - Check Answer
function checkAnswer (currentLevel) {
    if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
        // console.log("succes");
        if (userClickedPattern.length === gamePattern.length) {
            setTimeout (function(){
                nextSequence();
            }, 1000);
        }
    } else {
    // Step 9 - Game over
    // console.log("wrong")
    playSound("wrong");

    $("body").addClass("game-over");
    setTimeout (function() {
        $("body").removeClass("game-over");
    }, 200);

    $("h1").text("Game Over, Press Any Key to Restart");

    startOver();
    };
};

function nextSequence(){
    userClickedPattern = [];
    level++;
    $("#level-title").text("Level "+level);
    var randomNumber = Math.floor((Math.random())*4);
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    
    $("#" + randomChosenColour).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
    
    playSound(randomChosenCOlour);
    level++;
    $("h1").text("Level " + level);
};

function playSound(name) {
    var audio = new Audio("sounds/"+ name + ".mp3");
    audio.play();
};

//Step 6 *faulty*. Have a look after completing the code
function animatePress (currentColour) {
    $("#"+ currentColour).addClass("pressed");
    setTimeout(function () {
        $("#"+ currentColour).removeClass("pressed");
    }, 100);
};

// Step 10 - Restart the game
function startOver () {
    level=0;
    gamePattern = [];
    started = false;
};




