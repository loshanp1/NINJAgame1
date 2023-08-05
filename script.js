var start = 0;

var runSound = new Audio("run.mp3");
runSound.loop = true;

var jumpSound = new Audio("jump.mp3");

var deadSound = new Audio("dead.mp3")

function keycheck(event) {

    //enterkey


    if (event.which == 13) {
        if (runWorkerId == 0) {
            runWorkerId = setInterval(run, 100);
            runSound.play();
            start = 1;
            backgroundWorkerId = setInterval(moveBackGround, 100);
            scoreWorkerId = setInterval(updateScore, 100);
            createBlockId = setInterval(createBlock, 100);
            moveBlockId = setInterval(moveBlocks, 100);
        }
    }


    //spasekey

    if (start) {

        if (event.which == 32) {

            if (jumpWorkerId == 0) {
                clearInterval(runWorkerId);
                runSound.pause();
                jumpWorkerId = setInterval(jump, 100)
                jumpSound.play();
                


            }

        }

    }



}
//Runfunction
var runWorkerId = 0;
var player = document.getElementById("player")
var runImageNumber = 1;

function run() {
    runImageNumber++;
    if (runImageNumber == 9) {
        runImageNumber = 1;
    }
    player.src = "Run (" + runImageNumber + ").png"

}

//jumpfunction


var jumpWorkerId = 0;
var jumpImageNumber = 1;
var playerMarginTop = 370;

function jump() {
    jumpImageNumber++;
    if (jumpImageNumber <= 7) {
        playerMarginTop = playerMarginTop - 30;
        player.style.marginTop = playerMarginTop + "px";
    }

    if (jumpImageNumber >= 8) {
        playerMarginTop = playerMarginTop + 30;
        player.style.marginTop = playerMarginTop + "px";
    }

    if (jumpImageNumber == 13) {
        jumpImageNumber = 1;
        clearInterval(jumpWorkerId);
        jumpWorkerId = 0;

        runWorkerId = setInterval(run, 100);
        runSound.play();
    }
    player.src = "Jump (" + jumpImageNumber + ").png"

}

//move background

var background = document.getElementById("background")
var backgroundx = 0;
backgroundWorkerId = 0;

function moveBackGround() {
    backgroundx = backgroundx - 20;
    background.style.backgroundPositionX = backgroundx + "px";
}

//score
var score = document.getElementById("score")
var scoreValue = 0;
var scoreWorkerId = 0;

function updateScore() {

    scoreValue = scoreValue + 5;
    score.innerHTML = scoreValue;
}
var createBlockId = 0;
var blockMarginLeft = 500;
var blockId = 1;
function createBlock() {

    var block = document.createElement("div");
    block.className = "block";

    block.id = "block" + blockId;
    blockId++;

    var gap = Math.random() * (1000 - 400) + 400;
    blockMarginLeft = blockMarginLeft + gap;

    block.style.marginLeft = blockMarginLeft + "px"

    document.getElementById("background").appendChild(block);

}
var moveBlockId = 0;
function moveBlocks() {

    for (var i = 1; i <= blockId; i++) {
        var currentBlock = document.getElementById("block" + i);
        var currentMarginLeft = currentBlock.style.marginLeft;
        var newMarginLeft = parseInt(currentMarginLeft) - 20;
        currentBlock.style.marginLeft = newMarginLeft + "px";
        //129&49

        if (newMarginLeft <= 123) {
            if (newMarginLeft > 49) {
                if (playerMarginTop <= 370) {
                    if (playerMarginTop >= 310) {
                        clearInterval(runWorkerId);
                        runSound.pause();
                        clearInterval(jumpWorkerId);
                        jumpWorkerId=-1;
                        clearInterval(backgroundWorkerId);
                        clearInterval(scoreWorkerId);
                        clearInterval(createBlockId);
                        clearInterval(moveBlockId);

                        deadWorkerId= setInterval(dead, 100);
                        deadSound.play();
                    }
                }
            }
        }
    }
}

//dead function
var deadImageNomber = 1;
var deadWorkerId = 0;

function dead() {
    deadImageNomber++;
    if(deadImageNomber==11){
        deadImageNomber=10;

        player.style.marginTop="370px";
        document.getElementById("endScore").innerHTML = scoreValue;
        document.getElementById("gameover").style.visibility = "visible";
      
    }
    player.src = "Dead (" + deadImageNomber + ").png";
}


//tryagain
function re(){
    location.reload();
}