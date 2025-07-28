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
let pipes = [];
let pipeWidth = 64;
let pipeHeight = 512; // w/h ratio is 384/3072 (for the actual image) = 1/8
// we scale it to 1/8

window.onload = function() {
    // Gets a reference to the HTML Canvas Element
    board = document.getElementById('board');
    board.width = boardWidth;
    board.height = boardHeight;
    // This method gets that element's context— the thing onto which the drawing will be rendered.
    ctx = board.getContext("2d")

    // ctx.fillStyle = "green"
    // ctx.fillRect(bird.x, bird.y, bird.width, bird.height);

    // Load Bird Image
    birdImg = new Image();
    birdImg.src = "./assets/flappybird.png";
    // birdImg variable hasn't loaded yet, so we load it
    birdImg.onload = function() {
        ctx.drawImage(birdImg, bird.x, bird.y, bird.width, bird.height);
    }
    requestAnimationFrame(update);
}


// Main Game Loop
function update() {
    requestAnimationFrame(update);
    ctx.clearRect(0, 0, board.width, board.height);

    // bird
    ctx.drawImage(birdImg, bird.x, bird.y, bird.width, bird.height);
}