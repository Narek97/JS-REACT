const canvas = document.getElementById('game');
const ctx = canvas.getContext('2d');

const ground = new Image();
const food = new Image();
ground.src = './img/bg.png';
food.src = './img/food.png';

let box = 32;
let score = 0;

// mrgi texy voroshelu hamar 
let foods = {
    x: Math.floor((Math.random() * 17 + 1)) * box,
    y: Math.floor((Math.random() * 15 + 3)) * box,
};

// odzi texy voroshelu hamar
let snake = []
snake[0] = {
    x: 9 * box,
    y: 10 * box
};

document.addEventListener('keydown', keyDownHandler)

let dir = ''

function keyDownHandler(e) {
    if (e.key == "Right" || e.key == "ArrowRight" && dir != 'Left') {
        dir = 'Right';
    } else if (e.key == "Left" || e.key == "ArrowLeft" && dir != 'Right') {
        dir = 'Left';
    } else if (e.key == "Up" || e.key == "ArrowUp" && dir != 'Down') {
        dir = 'Up';
    } else if (e.key == "Down" || e.key == "ArrowDown" && dir != 'Up') {
        dir = 'Down';
    }

};

// stugel ete ody kpnuma  iran pochin krvi
function eatTail(head, arr) {
    for (let i = 0; i < arr.length; i++) {

        if (head.x == arr[i].x && head.y == arr[i].y) {
            clearInterval(game)
            location.reload()
        }
    }
};




function drawGame() {
    ctx.drawImage(ground, 0, 0);
    ctx.drawImage(food, foods.x, foods.y);

    // odzin nkarelu hamar
    for (let i = 0; i < snake.length; i++) {
        ctx.fillStyle = i == 0 ? 'green' : 'red';
        ctx.fillRect(snake[i].x, snake[i].y, box, box);
    };

    // kerat mrgeri qanaky grelu hamar
    ctx.fillStyle = 'white';
    ctx.font = '50px Arial';
    ctx.fillText(score, box * 2.5, box * 1.7);

    // odi dirqi kordinatnery
    let snakeX = snake[0].x;
    let snakeY = snake[0].y;

    // mirqy utelu hmar
    if (snakeX == foods.x && snakeY == foods.y) {
        score++
        foods = {
            x: Math.floor((Math.random() * 17 + 1)) * box,
            y: Math.floor((Math.random() * 15 + 3)) * box,
        };
    } else {
        snake.pop()
    }

    // stugel ete ody dusa eke sahmannerich xaxy krvi
    if (snakeX < box || snakeX > box * 17 ||
        snakeY < 3 * box || snakeY > box * 17) {
        clearInterval(game)
        location.reload()
    }

    if (dir == 'Right') {
        snakeX += box
    };
    if (dir == 'Left') {
        snakeX -= box
    };
    if (dir == 'Up') {
        snakeY -= box
    };
    if (dir == 'Down') {
        snakeY += box
    };

    // tal nor kordinatnery pochi hamar
    let newHead = {
        x: snakeX,
        y: snakeY
    };

    eatTail(newHead,snake)

    snake.unshift(newHead)


};

let game = setInterval(drawGame, 100)