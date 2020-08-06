const canvas = document.getElementById('game');
const ctx = canvas.getContext('2d');

const ground = new Image();
const person = new Image();
const bomba = new Image();

ground.src = './img/bg.png';
person.src = './img/person.png';
bomba.src = './img/bomb.png';


let dask = []

dask[0] = {
    x: Math.floor((Math.random() * +530)),
    y: 0,
};

setInterval(() => {
    dask.push({
        x: Math.floor((Math.random() * +530)),
        y: 0
    })
}, 1000);

document.addEventListener('keydown', keyDownHandler)
document.addEventListener("keyup", keyUpHandler);


let dir = ''

function keyDownHandler(e) {
    if (e.key == "Right" || e.key == "ArrowRight") {
        dir = 'Right';
    } else if (e.key == "Left" || e.key == "ArrowLeft") {
        dir = 'Left';
    }
};

function keyUpHandler(e) {
    if (e.key == "Right" || e.key == "ArrowRight") {
        dir = '';

    } else if (e.key == "Left" || e.key == "ArrowLeft") {
        dir = '';

    }
}

let x = canvas.width / 2 - 20
let y = canvas.height - 55
let score = 0

function drawGame() {

    ctx.drawImage(ground, 0, 0);
    ctx.fillStyle = 'green';

    for (let i = 0; i < dask.length; i++) {
        ctx.drawImage(bomba, dask[i].x, dask[i].y);
        dask[i].y++
        if (dask[i].y === canvas.height) {
            score++
        }
        if (dask[i].y > y - 30 && dask[i].y < canvas.height && dask[i].x > x - 20 && dask[i].x < x + 20) {

            location.reload()
        }
    }

    if (dir == 'Right') {
        if (x !== 473) {

            x += 1
        }
    };
    if (dir == 'Left') {
        if (x !== 0) {

            x -= 1
        }
    };
    
 
    ctx.fillStyle = 'blue';
    ctx.font = '50px Arial';
    ctx.fillText(score, 10, 50);
    ctx.drawImage(person, x, y, 60, 60);
    // if (Number.isInteger((score + 1) / 10)) {
    //     k=1
    // }
   
    requestAnimationFrame(drawGame)
}

bomba.onload = drawGame


// let game = setInterval(drawGame, 10)