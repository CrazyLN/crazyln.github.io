function init(){
    var canvas = document.getElementById('game');
    ctx = canvas.getContext('2d');
    canvas.width = 640;
    canvas.heigth = 480;
    game = new rectFill('green' , 0 , 0 , 640 , 480);
    wall = new rectStroke('black' , 0 , 0 , 640 , 480 , 10);
    player = new rectFill('yellow' , game.width / 2 - 10, game.heigth / 2 - 10, 20 , 20);
    item = new rectFill('red' , coordsItems(640) , coordsItems(480) , 5 , 5);
    player.vX = 0;
    player.vY = 0;
    player.score = 0;
    setInterval(play , 1000 / 50);
}
function play(){
    upadate();
    draw();
}
function draw(){
    game.draw();
    wall.draw();
    player.draw();
    item.draw(); 
}
function upadate(){
    if(player.x < wall.border / 2){
        player.vX = 0;
        player.vY = 0;
        stop; 
    } 
    if(player.x + player.width > game.width - wall.border / 2){
        player.vX = 0;
        player.vY = 0;
        stop;
    } 
    if(player.y < wall.border / 2){
        player.vX = 0;
        player.vY = 0;
        stop;
    } 
    if(player.y + player.heigth > game.heigth - wall.border / 2){
        player.vX = 0;
        player.vY = 0;
        stop;
    } 
    if ( eat()){
        playerBody = new rectFill('yellow' , item.x , item.y , 10 , 10 );
        playerBody.draw();
        item = new rectFill('red' , coordsItems(640) , coordsItems(480) , 5 , 5);
        player.score++;
        console.log(player.score);
    }
    player.x += player.vX;
    player.y += player.vY;
}
function rectStroke(color , x , y , width , heigth , border){
    this.color = color;
    this.x = x;
    this.y = y;
    this.width = width;
    this.heigth = heigth;
    this.border = border;
    this.draw = function(){
        ctx.lineWidth = border;
        ctx.strokeStyle = this.color;
        ctx.strokeRect(this.x , this.y , this.width , this.heigth);
    }
}
function rectFill(color , x , y , width , heigth){
    this.color = color;
    this.x = x;
    this.y = y;
    this.width = width;
    this.heigth = heigth;
    this.draw = function(){
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x , this.y , this.width , this.heigth);
    }
}
function moveDown(){
    if (player.vY == 0){
        player.vX = 0;
        player.vY = 2 + player.score * 0.1;
    }
}
function moveUp(){
    if (player.vY == 0){
        player.vX = 0;
        player.vY = -2 - player.score * 0.1;
    }
}
function moveLeft(){
    if (player.vX == 0){
        player.vX = -2 - player.score * 0.1;
        player.vY = 0;
    }
}
function moveRigth(){
    if (player.vX == 0){
        player.vX = 2 + player.score * 0.1;
        player.vY = 0;
    }
}
function coordsItems(number){
    return x = Math.ceil(Math.random() * number );
}
function eat(){
    if( player.x < item.x + item.width    &&
        player.y < item.y + item.heigth   &&
        player.x + player.width  > item.x &&
        player.y + player.heigth > item.y){
            return true;
        } else {
            return false;
        }
}
init();