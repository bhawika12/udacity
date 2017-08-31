var maxSpeed=100,
    minSpeed=10,
    score=0;
var Enemy=function(a, b) {
    this.a=a;
    this.b=b;
    this.speed=this.findspeed();
    this.sprite='images/enemy-bug.png';
};

Enemy.prototype.update=function(dt) {
    if (this.a<600) {
        this.a+=this.speed*dt;
    } else {
        this.a=0;
        this.speed=this.findspeed();
    }
};

Enemy.prototype.findspeed=function() {
    var bugSpeed=Math.floor(Math.random()*(maxSpeed*5)+1+minSpeed);
    return bugSpeed;
};

Enemy.prototype.render=function() {
    ctx.drawImage(Resources.get(this.sprite), this.a, this.b);
};

var Player=function(a,b) {
    this.a=a;
    this.b=b;
    this.sprite='images/char-cat-girl.png';
};

Player.prototype.update=function() {
    for (var j=0; j < 3; j++) {
        if ((this.b+40>allEnemies[j].b) && (this.b+40<allEnemies[j].b+40) && (this.a+40>allEnemies[j].a) && (this.a<allEnemies[j].a+40)) {
            this.reset();
            score--;
            document.getElementById("score").innerHTML=score;
            if(score<0)
            window.open("file:loose.html", "_parent");
        }
    }
};

Player.prototype.reset=function() {
    this.a=200;
  this.b=300;
};

Player.prototype.render=function() {
    ctx.drawImage(Resources.get(this.sprite),this.a, this.b);
};

Player.prototype.handleInput=function(move) {
    if (move=='up') {
        if (this.b > 100) {
            this.b-=90;
        } else {
            this.reset();
            score++;
            if (score==10) {

                window.open("file:win.html", "_parent");
                score="0";
            }
            document.getElementById("score").innerHTML=score;

        }
    } else if (move == 'down') {
        if (this.b<400) {
            this.b+=40;
        }

    } else if (move == 'right') {
        if (this.a < 400)
            this.a+=100;
    } else if (move=='left') {
        if (this.a > 0)
            this.a-=100;
    }

    
};
var A = new Enemy(0,60);
var B = new Enemy(0,150);
var C = new Enemy(0,220);

var allEnemies=[A,B,C];

var player=new Player(200,300);
document.addEventListener('keyup', function(e) {
    var allowedKeys={
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});