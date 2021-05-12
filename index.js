var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;
clicks = 0;
function nextSequence() {
    level++;
    $("#level-title").text("Level : "+level);
    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    animateAndPlaySound(randomChosenColour);
}


function animateAndPlaySound(Colour) {
    $("#"+Colour).addClass("pressed")
    $("#"+Colour).fadeOut(100).fadeIn(100);
    var audioPath = "sounds/"+Colour+".mp3";
    var audio = new Audio(audioPath);
    audio.play();
    setTimeout(() => {$("#"+Colour).removeClass("pressed");}, 100);
    
}

function checkAnswer() {
    console.log(gamePattern[clicks-1]);
    console.log(userClickedPattern[clicks-1]);
    if(gamePattern[clicks-1]===userClickedPattern[clicks-1]) {
        
        if(level===clicks) {
            clicks=0;
            if(arraysEqual(gamePattern,userClickedPattern)) {
                userClickedPattern=[];
                setTimeout(() => {nextSequence();}, 500);
            }
        }
    }
    else {
        $("body").addClass("game-over")
        var audio1 = new Audio("sounds/wrong.mp3");
        audio1.play();
        $("#level-title").text("You Lost at Level : "+level+" press space to start again.");
        level = 0;
        clicks = 0;
        gamePattern=[];
        userClickedPattern=[];
        setTimeout(() => {$("body").removeClass("game-over");}, 200);
    }
    
}

function arraysEqual(a, b) {
    if (a === b) return true;
    if (a == null || b == null) return false;
    if (a.length !== b.length) return false;
    for (var i = 0; i < a.length; ++i) {
      if (a[i] !== b[i]) return false;
    }
    return true;
}

    

$(document).keydown(function (e) {
    if(level == 0 && e.key==" ") {
        nextSequence();
    };
});

$(".btn").click(function(e) {
    if(level) {
        clicks++;
        userChosenColour = e.target.id;
        userClickedPattern.push(userChosenColour);
        animateAndPlaySound(userChosenColour);
        checkAnswer();
    }  
});

