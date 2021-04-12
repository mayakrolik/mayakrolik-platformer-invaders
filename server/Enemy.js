const SpriteObject = require("./SpriteObject");
const CollisionInfo = require("./CollisionInfo");

class Enemy extends SpriteObject {
    constructor(id, x, y, width, height, imageUrls, amplitude, speed, sinoffset) {
      super(id, x, y, width, height, imageUrls, 0, true, true, false, 25);

      this.id = id;
      this.amplitude = amplitude;
      this.speed = speed;
      this.sinoffset = sinoffset;
      this.isOnPlatform = false;
      this.isJumping = false;
      this.fallingSpeed = 5;
    }
  
    move() {
      this.x = this.startingX + Math.sin((new Date().getTime() + this.sinoffset) * this.speed) * this.amplitude;
      
      if (!this.isOnPlatform && !this.isJumping) {
        this.y += this.fallingSpeed;
      }
      //if (this.reappearing == true){
      //  this.y = -100;
      //}
    }

    detectCollisions(gameLevel) {
      
      //return;
      var sprites = gameLevel.nonMovingSprites.concat(gameLevel.movingSprites);
      var isOnPlatform = false;
      for (var i = 0; i < sprites.length; i++) {
        if (sprites[i] != this) {
          var collisionInfo = new CollisionInfo(this, sprites[i]);
          if (!sprites[i].isMovable) {
            if (collisionInfo.isOnTopOff) {
              this.y -= collisionInfo.deltaBottom;
              isOnPlatform = true;
            }
          }
        }
      }
      this.isOnPlatform = isOnPlatform;
      if (isOnPlatform) {
        this.isJumping = false;
      }
      //if (!this.isVisible)
    }
  
  }

  module.exports = Enemy;