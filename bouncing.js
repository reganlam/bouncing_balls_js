// setup canvas
var canvas = document.querySelector('canvas');
var ctx = canvas.getContext('2d');
var width = canvas.width = window.innerWidth;
var height = canvas.height = window.innerHeight;

var balls = [];
var ballNum = 30;
var ballVel = 3;

var ballCountText = document.querySelector('.ballCount');
ballCountText.textContent = 'Ball Count:' + ballNum;

// function to generate random number
function random(min,max) {
  var num = Math.floor(Math.random()*(max-min)) + min;
  return num;
}

// Create Balls
while (balls.length < ballNum){

  var velX = random(-ballVel, ballVel);
  var velY = random(-ballVel, ballVel);

  while (velX == 0){
    velX = random(-ballVel, ballVel);
  }
  while (velY == 0){
    velY = random(-ballVel, ballVel);
  }

  var ball = new Ball(
    random(0, width),
    random(0, height),
    velX,
    velY,
    'rgb(' + random(0,255) + ',' + random(0,255) + ',' + random(0,255) +')',
    random(5,40),
    true
  );

  balls.push(ball);
}

function loop(){
  ctx.fillStyle = 'rgba(0, 0 ,0, 0.1)';
  ctx.fillRect(0, 0, width, height);

  // Update Balls
  for (var i = 0; i < balls.length; i++) {
    if(balls[i].exists === true){
      balls[i].draw();
      balls[i].update();
      balls[i].collisionDetect();
    }
  }

  evilCircle.draw();
  evilCircle.checkBounds();
  evilCircle.collisionDetect();

  // Loop
  requestAnimationFrame(loop);
}

var evilCircle = new EvilCircle(width/2, height/2 ,true);
evilCircle.setControls();

loop();
