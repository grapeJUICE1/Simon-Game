//variable to store user clicked colors
var userClickedPattern = []
//variable to store random chosen colors by the game
var gamePattern = [];
//variable of available game colors
var buttonColours = ["red", "blue", "green", "yellow"];
//variable to store level of user
var level = 0;
//variable to check whether game has started or not
var started = false;


//defining what happens on user click
$(".btn").on( 
 "click" , function(){
  var userChosenColour =$(this).attr("id");
  userClickedPattern.push(userChosenColour);
  animatePress(userChosenColour) ;
  playSound(userChosenColour);
  checkAnswer((userClickedPattern.length) - 1);
  }
 )
 

 

// on user keystroke to start the game

$(document).on("keydown" ,
  function(){
  	if (!started) {
    $("#level-title").text("Level " + level);
    nextSequence();
    started = true;
  }
  }
	);


function nextSequence(){
	userClickedPattern = [];
	// game pattern of color
	var randomNumber = Math.floor((Math.random()*4));
	var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    //animation of the chosen button and sound
    var color = "#" + randomChosenColour;
    $(color).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);
    //fixing the level
    level += 1;
    levelText = "level " + level;
    $("#level-title").text(levelText);
    
};


//function to play button sounds
function playSound(name){
    var audioFileName = "sounds/" + name + ".mp3";
    var audio = new Audio(audioFileName);
    audio.play();
}


//function for button animation
function animatePress(currentColor){
  	var currentColorID = "#" + currentColor;
  $(currentColorID).addClass("pressed").delay(100).queue(
    function (next) {
  $(currentColorID).removeClass("pressed");
    next();
    }
  	);
}


//function for restarting game
 function startOver(){
 	level = 0;
 	started = false;
 	gamePattern = [];
 }


//function for checking answer
function checkAnswer(currentLevel){
//occurs if user's sequence is right	
 if(gamePattern[currentLevel] == userClickedPattern[currentLevel]){
 	console.log("success")
 	if(userClickedPattern.length === gamePattern.length){
 	setTimeout(function(){nextSequence()} , 1000);
 	}; 
 }
 //occurs if user's sequence is wrong
 else{
 	playSound("wrong");
 	$("body").addClass("game-over").delay(200).queue(
    function(next){
	$("body").removeClass("game-over");
	$("#level-title").text("Game Over, Press Any Key to Restart");
	startOver();
	next();
}
 		)
 }

};

