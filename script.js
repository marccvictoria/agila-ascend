// canvas dimensions
let game;
let gameHeight = 640;
let gameWidth = 800;

let ctx; // context refers to the rendering context =  provides the drawing functions & properties

// birdie
let birdWidth = 34; // in pixels
let birdHeight = 24; // w/h ratio = 17/12
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
    birdImg.src = "./assets/flappybird.gif";
    // birdImg variable hasn't loaded yet, so we load it
    birdImg.onload = function() {
        ctx.drawImage(birdImg, bird.x, bird.y, bird.width, bird.height);
    }

    topPipeImg = new Image();
    topPipeImg.src = "./assets/toppipe.png"

    bottomPipeImg = new Image();
    bottomPipeImg.src = "./assets/bottompipe.png"

    document.addEventListener('keyup', (e) => {
    if (e.code === 'Space' || e.code === 'ArrowUp'){
        birdVeloY = -6; // this is the upward jump, the lower the val, the higher the jump

        // reset game if game over
        if (isGameOver) {
            bird.y = birdY;
            pipeArr = [];
            score = 0;
            isGameOver = false;
        }
    }
    })

    requestAnimationFrame(update);
    setInterval(genPipes, 1500); // generate x per ms
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
    ctx.font = "45px sans-serif";
    ctx.fillText(score, 5, 45) // var, x, y pos

    // clear pipes to free up memory
    while (pipeArr.length > 0 && pipeArr[0].x < -pipeWidth) { // instead of 0, -pipeWidth is used = right side of pipe
        pipeArr.shift(); // removes first element in the array
    }

    // apply velocity to the bird
    birdVeloY += gravity;
    bird.y = Math.max(bird.y + birdVeloY, 0); // this returns the largest value which limits it to current bird position and 0 or top
    
    // GameOver = true when bird falls through screen
    if (bird.y > gameHeight) {
        isGameOver = true;
        playAudio("die");
    }
    
    if (isGameOver){
        ctx.fillText("Game Over", 5, 90);
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
        var audio = new Audio('./assets/sfx_point.wav');
        audio.play();
    } else if (status == "die") {
        var audio = new Audio('./assets/sfx_die.wav');
        audio.play();
    }
}