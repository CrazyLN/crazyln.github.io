function init(){
    game = new rect ('#0000FF', 0 , 0 , 320 , 480 );
    ai = new rect ('#FFFFFF' , game.width / 2 - 40 , 5 , 80 , 10);
    player = new rect ('#FFFFFF' , game.width / 2 - 40 , game.heigth - 15 , 80 ,10);
    ball = new rect ('#FFFFFF' , game.width / 2 , game.heigth / 2 , 15 , 15 );
    ai.scores = 0;
    player.scores = 0;

    canvas = document.getElementById('game');
    canvas.width = 400;
    canvas.heigth = 480;
    ctx = canvas.getContext('2d');
    ball.vX = 2;
    ball.vY = 2;
    setInterval(play , 1000 / 50);
}
function play(){
    draw();
    update();
    status();
}
function draw(){
    game.draw();
    ai.draw();
    player.draw();
    ball.draw();
}
function rect(color , x , y , width , heigth){
    this.color = color;
    this.x = x;
    this.y = y;
    this.width = width;
    this.heigth = heigth;
    this.draw = function(){
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x , this.y , this.width , this.heigth );
    }
}
function status(){
    console.log(ai.scores);
    if (ai.scores == 10 ){
        alert('Вы проиграли!');
        ai.scores = 0;
        player.scores = 0;
        confirm('Хотите еще?');
    } 
    if( player.scores == 10 ){
        ai.scores = 0;
        player.scores = 0;
        alert('Вы выиграли!');
        confirm('Хотите еще?');
    }
}
function update(){
    if( ball.x < 0 || ball.x + ball.width > game.width){
        ball.vX = -ball.vX;
    }
    if( ball.y < 0 ){
        ball.vY = -ball.vY;
        play.scores++;
    }
    if( ball.y + ball.heigth > game.heigth){
        ball.vY = -ball.vY;
        ai.scores++;
    }
    if( ( collision ( ai , ball ) && ball.vY < 0) || (collision(player , ball ) && ball.vY > 0) ){
        ball.vY = -ball.vY;
    }
    ball.x += ball.vX;
    ball.y += ball.vY;
    aiMove();
}
function playerMoveLeft(){
    if(player.x > 20){
    player.x -= 20;
    }
}
function playerMoveRigth(){
    if(player.x < game.width){
    player.x += 20;
    }
}
function aiMove(){
    var x ;
    var vX = Math.abs(ball.vX) ;
    if(ball.x < ai.x + ai.width / 2){
        x = ai.x - vX;
    } else {
        x = ai.x + vX;
    }
    if( 10 < x && x < game.heigth - ai.heigth - 10){
        ai.x = x;
    }
}
function collision(objA , objB){
    if( objA.x + objA.width  >  objB.x               &&
        objA.x               <  objB.x +objB.width   &&
        objA.y + objA.heigth >  objB.y  &&
        objA.y               <  objB.y + objB.heigth){
            return true;
        } else {
            return false;
        }
}
init();