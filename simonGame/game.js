var arr = ['green', 'red', 'yellow', 'blue'];
var pattern = [];
var clickedPattern = [];
var started = false;
var level = 0;

$(document).keydown(function () {
    if (!started) {
        $('h1').text('Level ' + level);
        sequence();
        started = true;
}
})

$( ".btn" ).click(function() {
    var chosenColor = $(this).attr("id");
    clickedPattern.push(chosenColor);
    playSound(chosenColor);
    animate(chosenColor);
    check(clickedPattern.length - 1);
});

function check(currentLevel) {
    if (pattern[currentLevel] === clickedPattern[currentLevel]) {
        if (clickedPattern.length === pattern.length) {
            setTimeout(function () {
                sequence();
            }, 1000);
        }
    } else {
        var sound = 'wrong'
        playSound(sound);
        $('body').addClass("game-over");
        setTimeout(() => {
            $('body').removeClass("game-over");
        }, 200);
        $('h1').text('Game Over, Press Any Key to Restart');
        startOver();
        
    }
    
}


function sequence() {
    clickedPattern = [];
    level++;
    $('h1').text('Level ' + level)
    var rand = Math.floor(Math.random() * 4);
    var randColor = arr[rand];
    pattern.push(randColor);
    $("#" + randColor).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randColor);
    
}

function animate(currentColor) {
    $("#" + currentColor).addClass("pressed");
    setTimeout(() => {
        $("#" + currentColor).removeClass("pressed");
    }, 100);
}



function playSound(name) {
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}



function startOver() {
    level = 0;
    started = false;
    pattern = [];
}
