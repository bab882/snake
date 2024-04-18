const canvas = document.querySelector("canvas");
const context = canvas.getContext("2d");

let pixel = 20;

let snake = [];
snake[0] = { x: 10*pixel, y: 10*pixel};

let food = {
    x: Math.floor(Math.random() * 15 + 1) * pixel,
    y: Math.floor(Math.random() * 15 + 1) * pixel
}

let score = 0;
let dir = document.addEventListener("keydown", touch);


function touch(event){

    let key = event.keyCode;

    if(key == 37 && dir != "RIGHT"){
        dir = "LEFT";
    }else if(key == 38 && dir != "DOWN") {
        dir = "UP";
    }else if(key == 39 && dir != "LEFT"){
        dir = "RIGHT";
    }else if(key == 40 && dir != "UP"){
        dir = "DOWN";
    }
}

function view(){
    context.clearRect(0, 0, 400, 400);

    for(let i = 0; i < snake.length; i++){
        context.fillStyle = (i == 0) ? "#fefefe" : "#000000"
        context.fillRect(snake[i].x, snake[i].y, pixel, pixel)
        context.strokeStyle = "#fefefe"
        context.strokeRect(snake[i].x, snake[i].y, pixel ,pixel);
    }
    context.fillStyle = "#00FF00"
    context.fillRect(food.x, food.y, pixel, pixel);

    let snakeX = snake[0].x
    let snakeY = snake[0].y

    if(dir == "LEFT") snakeX -= pixel;
    if(dir == "UP") snakeY -= pixel;
    if(dir == "RIGHT") snakeX += pixel;
    if(dir == "DOWN") snakeY += pixel;

    if(snakeX == food.x && snakeY == food.y){
        score++;
        food = {
            x: Math.floor(Math.random() * 15 + 1) * pixel,
            y: Math.floor(Math.random() * 15 + 1) * pixel
        }
    }else{
        snake.pop();
    }
    let newGame = {
        x: snakeX,
        y: snakeY
    }
    if(snakeX < 0  || snakeY < 0 || snakeX > 19 * pixel || snakeY > 19 * pixel || gameOver(newGame, snake)){
        clearInterval(game);
    }
    snake.unshift(newGame);
    context.fillStyle = "red";
    context.font = "30px Pixelify Sans, sans-serif";
    context.fillText(score, 2 * pixel, 1.6 * pixel );
}
function gameOver(game, array){
    for(let a = 0; a < array.length; a++){
        if(game.x == array[a].x && game.y == array[a].y){
            return true;
        }
    }
    return false;
}
let game = setInterval(view, 200);
