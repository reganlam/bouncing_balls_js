function Shape(x, y, velX, velY, exists){
  this.x = x;
  this.y = y;
  this.velX = velX;
  this.velY = velY;
  this.exists = exists;
}

function EvilCircle(x, y, exists){
  var velX = 60;
  var velY = 60;

  Shape.call(this, x, y, velX, velY, exists);
  this.color = 'rgb(255, 255, 255)';
  this.size = 30;
}

EvilCircle.prototype.draw = function(){
  ctx.beginPath();
  ctx.lineWidth = 3;
  ctx.strokeStyle = this.color;
  ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
  ctx.stroke();
}

EvilCircle.prototype.checkBounds = function(){
  if ((this.x + this.size) >= width) {
    this.x = this.x - this.size;
  }

  if ((this.x - this.size) <= 0) {
    this.x = this.x + this.size;
  }

  if ((this.y + this.size) >= height) {
    this.y = this.y - this.size;
  }

  if ((this.y - this.size) <= 0) {
    this.y = this.y + this.size;
  }
}

EvilCircle.prototype.setControls = function(){
  var _this = this;
  window.onkeydown = function(e) {
      if (e.keyCode === 65) {
        _this.x -= _this.velX;
      } else if (e.keyCode === 68) {
        _this.x += _this.velX;
      } else if (e.keyCode === 87) {
        _this.y -= _this.velY;
      } else if (e.keyCode === 83) {
        _this.y += _this.velY;
      }
    }
}

EvilCircle.prototype.collisionDetect = function() {
  for (var j = 0; j < balls.length; j++) {
    if (balls[j].exists === true) {
      var dx = this.x - balls[j].x;
      var dy = this.y - balls[j].y;
      var distance = Math.sqrt(dx * dx + dy * dy);

      if (distance < this.size + balls[j].size) {
        balls[j].exists = false;
        ballNum--;
        ballCountText.textContent = 'Ball Count:' + ballNum;
      }
    }
  }
}

function Ball(x, y, velX, velY, color, size, exists){
  Shape.call(this, x, y, velX, velY, exists);
  this.color = color;
  this.size = size;
}

Ball.prototype.draw = function(){
  ctx.beginPath();
  ctx.fillStyle = this.color;
  ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
  ctx.fill();
}

Ball.prototype.collisionDetect = function() {
  for (var j = 0; j < balls.length; j++) {
    if (!(this === balls[j])) {
      var dx = this.x - balls[j].x;
      var dy = this.y - balls[j].y;
      var distance = Math.sqrt(dx * dx + dy * dy);

      if (distance < this.size + balls[j].size) {
        balls[j].color = this.color = 'rgb(' + random(0, 255) + ',' + random(0, 255) + ',' + random(0, 255) +')';

        this.velX = -this.velX;
        this.velY = -this.velY;
        balls[j].velX = -balls[j].velX;
        balls[j].velY = -balls[j].velY;
      }
    }
  }
}

Ball.prototype.update = function() {

  if ((this.x + this.size) >= width) {
    this.velX = -(this.velX);
  }

  if ((this.x - this.size) <= 0) {
    this.velX = -(this.velX);
  }

  if ((this.y + this.size) >= height) {
    this.velY = -(this.velY);
  }

  if ((this.y - this.size) <= 0) {
    this.velY = -(this.velY);
  }

  this.x += this.velX;
  this.y += this.velY;
}
