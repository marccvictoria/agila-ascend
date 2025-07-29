// canvas dimensions
let game;
let gameHeight = 640;
let gameWidth = 800;

let ctx; // context refers to the rendering context =  provides the drawing functions & properties

// birdie
let birdWidth = 34 * 1.5; // in pixels
let birdHeight = 24 * 1.5; // scale up by %
// init pos of birdie
let birdX = gameWidth/8;
let birdY = gameHeight/2;
// image
let birdImg;

// bird properties
let bird = {
    x: birdX, // pos
    y: birdY,
    width: birdWidth, // image dimensions
    height: birdHeight
}

// array to store multiple pipes
let pipeArr = [];
let pipeWidth = 64;
let pipeHeight = 512; // w/h ratio is 384/3072 (for the actual image) = 1/8 (scale it by this factor)
let pipeX = gameWidth;
let pipeY = 0;

let topPipeImg;
let bottomPipeImg;

// physics
let veloX = -2;
let birdVeloY = 0; // bird jump speed
let gravity = 0.4;

// game mech
let isGameOver = false;
let score = 0;
let isGameStart = false;

// game over pop up
let gameOverScore;
let restart;

// pipegen for visibilitychange
let pipeInterval;

let GOSProp = {
    x: gameWidth/3.2,
    y: gameHeight/8,
    width: 168 * 1.8,  // 168 x 224
    height: 224 * 1.8
}

let resProp = {
    x: gameWidth/2.8,
    y: (gameHeight * 3)/4,
    width: 561 * 0.4, // 209 x 561 (actual image)
    height: 209 * 0.4
}

// responiveness
let isMobile = false;
window.mobileCheck = function() {
  let check = false;
  (function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))) check = true;})(navigator.userAgent||navigator.vendor||window.opera);
  return check;
};
console.log(mobileCheck());

if (mobileCheck() == true) {
    isMobile = true;
    gameWidth = 360;
    gameHeight = 640;

    GOSProp.x = gameWidth/6.5;
    GOSProp.y = gameHeight/8;
    GOSProp.width = 168 * 1.6;  // 168 x 224
    GOSProp.height = 224 * 1.6;

    resProp.x = gameWidth/3.5;
    resProp.y = (gameHeight * 3)/4;
    resProp.width = 561 * .30; // 209 x 561 (actual image)
    resProp.height = 209 * .30;
}

// high score
let highScore;
if (localStorage.getItem("highScore") === null) {
  localStorage.setItem("highScore", 0);
}

// When the entire page finishes loading, run this function
// browser will automatically invoke them when that event happens
window.onload = function() {
    // Gets a reference to the HTML Canvas Element
    game = document.getElementById('game');
    game.width = gameWidth;
    game.height = gameHeight;
    ctx = game.getContext("2d") // provides CanvasRenderingContext2D object

    // Load Images
    birdImg = new Image(); // Create an HTMLImage Element
    birdImg.src = "./assets/eagle.png";
    // birdImg variable hasn't loaded yet, so we load it
    birdImg.onload = function() {
        ctx.drawImage(birdImg, bird.x, bird.y, bird.width, bird.height);
    }

    topPipeImg = new Image();
    topPipeImg.src = "./assets/toppipe.png"

    bottomPipeImg = new Image();
    bottomPipeImg.src = "./assets/bottompipe.png"

    gameOverScore = new Image();
    gameOverScore.src = "./assets/game_menu/score_best.png"

    restart = new Image();
    restart.src = "./assets/game_menu/restart.png"

    document.addEventListener('keyup', (e) => {
    if (e.code === 'Space' || e.code === 'ArrowUp'){
        // physics
        birdVeloY = -6; // this is the upward jump, the lower the val, the higher the jump
        playAudio("wing");
        isGameStart = true;
        // reset game if game over
        if (isGameOver) {
            bird.y = birdY;
            pipeArr = [];
            score = 0;
            isGameOver = false;
            isGameStart = true;
        }
    }
    })

    document.addEventListener('touchstart', (e) => {
    // physics
    birdVeloY = -6; // this is the upward jump, the lower the val, the higher the jump
    playAudio("wing");
    isGameStart = true;
    // reset game if game over
    if (isGameOver) {
        bird.y = birdY;
        pipeArr = [];
        score = 0;
        isGameOver = false;
        isGameStart = true;
    }
    })

    pipeInterval = setInterval(genPipes, 1500);
    document.addEventListener("visibilitychange", () => {
    if (document.hidden) {
        clearInterval(pipeInterval); // pause generation
        console.log('Tab hidden – generation paused');
    } else {
        clearInterval(pipeInterval); // clear old interval (if any)
        pipeInterval = setInterval(genPipes, 1500); // resume
        console.log('Tab visible – generation resumed');
    }
    });

    game.addEventListener('click', (e) => {
        const rect = game.getBoundingClientRect();
        const clickX = e.clientX - rect.left; //  clientX is the horizontal position of the mouse relative to the viewport
        const clickY = e.clientY - rect.top; // distance in pixels between the top edge of the viewport and the top edge of the canvas element.

         // Check if click is inside the restart image bounds
        if (
            clickX >= resProp.x &&
            clickX <= resProp.x + resProp.width &&
            clickY >= resProp.y &&
            clickY <= resProp.y + resProp.height
        ) {
            if (isGameOver == true) {
                // Restart the game
                birdVeloY = 0;
                bird.y = birdY;
                pipeArr = [];
                score = 0;
                isGameOver = false;
                isGameStart = false;
                console.log("Restart clicked");
            }
        }
        })

    requestAnimationFrame(update);
}

// Main Game Loop
function update() {
    requestAnimationFrame(update);
    if (isGameOver) {
        return;
    }
    ctx.clearRect(0, 0, game.width, game.height); // erases whole canvas

    // render bird
    ctx.drawImage(birdImg, bird.x, bird.y, bird.width, bird.height);

    // render pipes infinitely
    for (let i = 0; i < pipeArr.length; i++) {
        let pipe = pipeArr[i];
        pipe.x += veloX;
        ctx.drawImage(pipe.img, pipe.x, pipe.y, pipe.width, pipe.height);

        // check if the bird passed the pipe
        if (!pipe.isPassed && bird.x > pipe.x + pipe.width) {
            score += 0.5;
            pipe.isPassed = true;
            playAudio("point");
        }

        // detect collision of bird and pipe
        if (detectCollision(bird, pipe)) {
            isGameOver = true;
            playAudio("die");
        }
    }

    // score
    ctx.fillStyle = "white";
    ctx.font = '32px "Press Start 2P"';
    ctx.fillText("Score: " + score, 5, 45) // var, x, y pos

    // clear pipes to free up memory
    while (pipeArr.length > 0 && pipeArr[0].x < -pipeWidth) { // instead of 0, -pipeWidth is used = right side of pipe
        pipeArr.shift(); // removes first element in the array
    }

    // physics
    // apply velocity to the bird
    if (isGameStart == true) {
        birdVeloY += gravity;
    }

    bird.y = Math.max(bird.y + birdVeloY, 0); // this returns the largest value which limits it to current bird position and 0 or top
    
    // GameOver = true when bird falls through screen
    if (bird.y > gameHeight) {
        isGameOver = true;
        playAudio("die");
    }
    
    if (isGameOver){
        ctx.drawImage(gameOverScore, GOSProp.x, GOSProp.y, GOSProp.width, GOSProp.height);
        ctx.drawImage(restart, resProp.x, resProp.y, resProp.width, resProp.height);

        ctx.font = isMobile == true? '24x "Press Start 2P"': '50px "Press Start 2P"';
        ctx.fillStyle = '#90EE90';
        ctx.strokeStyle = '#013220';
        ctx.lineWidth = 2;                      
        ctx.fillText("Game Over", isMobile == true? gameWidth/8: gameWidth/4.5, 90);
        ctx.strokeText("Game Over", isMobile == true? gameWidth/8: gameWidth/4.5, 90);
        ctx.font = '48px "Press Start 2P"';
        ctx.fillText(score, isMobile == true? GOSProp.width/1.6: GOSProp.width/0.8, isMobile == true? GOSProp.height/1.6: GOSProp.height/1.7);
        ctx.strokeText(score, isMobile == true? GOSProp.width/1.6: GOSProp.width/0.8, isMobile == true? GOSProp.height/1.6: GOSProp.height/1.7);
        
        highScore = localStorage.getItem('highScore');
        if (score > highScore) {
            localStorage.setItem("highScore", score);
        }
        let updatedHScore = localStorage.getItem('highScore');
        ctx.font = '48px "Press Start 2P"';
        ctx.fillText(updatedHScore, isMobile == true? GOSProp.width/1.6: GOSProp.width/0.8, isMobile == true? GOSProp.height/0.99: GOSProp.height/1.04);
        ctx.strokeText(updatedHScore, isMobile == true? GOSProp.width/1.6: GOSProp.width/0.8, isMobile == true? GOSProp.height/0.99: GOSProp.height/1.04);
    }
}


function genPipes() {
    if (isGameOver) {
        return;
    }
    let randomPipeY = pipeY - pipeHeight/4 - Math.random()*(pipeHeight/2);

    let openingSpace = gameHeight/4; // set space to 1/4 of the game height

    let topPipe = {
        img: topPipeImg,
        x: pipeX,
        y: randomPipeY,
        width: pipeWidth,
        height: pipeHeight,
        isPassed: false 
    }
    pipeArr.push(topPipe);

    let bottomPipe = {
        img: bottomPipeImg,
        x: pipeX,
        y: randomPipeY + pipeHeight + openingSpace,
        width: pipeWidth,
        height: pipeHeight,
        isPassed: false
    }
    pipeArr.push(bottomPipe);
}

function detectCollision(a, b) { // rectangles
    return a.x < b.x + b.width &&
    a.x + a.width > b.x &&
    a.y < b.y + b.height &&
    a.y + a.height > b.y; // collision logic
}


function playAudio(status) {
    if (status == "point") {
        var audio = new Audio('./assets/music/sfx_point.wav');
        audio.play();
    } else if (status == "die") {
        var audio = new Audio('./assets/music/sfx_mcdie.mp3');
        audio.play();
    } else if (status == "wing") {
        var audio = new Audio('./assets/music/sfx_bruh.mp3');
        audio.play();
    }
}

function birdRotUp() {
    ctx.drawImage(birdImg, bird.x, bird.y, bird.width, bird.height);
    ctx.rotate((45 * Math.PI) / 180)
}