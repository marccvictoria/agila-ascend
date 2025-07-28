// board
let board;
let boardHeight = 640;
let boardWidth = 360;
let context;

// birdie
let birdWidth = 34;
let birdHeight = 24; // w/h ratio = 17/12
// pos of birdie at the start
let birdX = boardWidth/8;
let birdY = boardHeight/2;
// image
let birdImg;

let bird = {
    x: birdX,
    y: birdY,
    width: birdWidth,
    height: birdHeight
}

// since we have multiple pipes, we need an array
let pipeArr = [];
let pipeWidth = 64;
let pipeHeight = 512; // w/h ratio is 384/3072 (for the actual image) = 1/8
// we scale it to 1/8
let pipeX = boardWidth;
let pipeY = 0;

let topPipeImg;
let bottomPipeImg;

// physics
let veloX = -2;

window.onload = function() {
    // Gets a reference to the HTML Canvas Element
    board = document.getElementById('board');
    board.width = boardWidth;
    board.height = boardHeight;
    // This method gets that element's context— the thing onto which the drawing will be rendered.
    ctx = board.getContext("2d")

    // ctx.fillStyle = "green"
    // ctx.fillRect(bird.x, bird.y, bird.width, bird.height);

    // Load Images
    birdImg = new Image(); // Create an HTMLImage Element
    birdImg.src = "./assets/flappybird.png";
    // birdImg variable hasn't loaded yet, so we load it
    birdImg.onload = function() {
        ctx.drawImage(birdImg, bird.x, bird.y, bird.width, bird.height);
    }

    topPipeImg = new Image();
    topPipeImg.src = "./assets/toppipe.png"

    bottomPipeImg = new Image();
    bottomPipeImg.src = "./assets/bottompipe.png"

    requestAnimationFrame(update);
    setInterval(genPipes, 1500); // generate pipes every 1500ms = 1.5 seconds
}

// Main Game Loop
function update() {
    requestAnimationFrame(update);
    ctx.clearRect(0, 0, board.width, board.height);

    // bird
    ctx.drawImage(birdImg, bird.x, bird.y, bird.width, bird.height);

    // pipes
    for (let i = 0; i < pipeArr.length; i++) {
        let pipe = pipeArr[i];
        pipe.x += veloX;
        ctx.drawImage(pipe.img, pipe.x, pipe.y, pipe.width, pipe.height);
    }
}


function genPipes() {

    let randomPipeY = pipeY - pipeHeight/4 - Math.random()*(pipeHeight/2);

    let openingSpace = boardHeight/4;

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
