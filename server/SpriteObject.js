const CollisionInfo = require("./CollisionInfo");

class SpriteObject {
    constructor(id, x, y, width, height, imageUrls, defaultImageIndex, isMovable, isLethal, isReward, rewardPoints, soundUrls) {
      this.id = id;
      this.x = x;
      this.y = y;
      this.width = width;
      this.height = height;
      this.startingX = x;
      this.startingY = y;
      this.isMovable = isMovable;
      this.isLethal = isLethal;
      this.isReward = isReward;
      this.rewardPoints = rewardPoints;
      this.visible = true;
      this.isOnPlatform = false; 
      this.currentImageIndex = defaultImageIndex | 0;
      this.imageUrls = imageUrls;
      this.soundUrls = soundUrls;
      this.moveEvent = "";
      this.reappearing = false;
    }
  
    left() {
      return this.x - this.width / 2;
    }
    right() {
      return this.x + this.width / 2;
    }
    top() {
      return this.y - this.height / 2;
    }
    bottom() {
      return this.y + this.height / 2;
    }
    makeVisible() {
      //this.reappearing = false;
      for (var i = 1; i < 6; i++){
        if (this.id == 'Enemy' + i){
          this.y = 0;
        }  
      }
      this.visible = true;
      //this.moveEvent = "appear";
    }
    makeInvisible() {
      this.visible = false;
      // respawn after 2 to 15 seconds random
      setTimeout(() => {this.makeVisible()}, Math.random() * 13000 + 2000);
      //this.reappearing = true;
    }
    move() {
      this.reappearing = false;
      // placeholder 
    }
    detectCollisions(gameLevel) {
      var isOnPlatform = false;
      var sprites = gameLevel.nonMovingSprites.concat(gameLevel.movingSprites);
      // console.log('count =' + sprites.length);
      for (var i = 0; i < sprites.length; i++) {
        if (sprites[i] != this) {
          var collisionInfo = new CollisionInfo(this, sprites[i]);
          if (!sprites[i].isMovable) {
            if (collisionInfo.isOnTopOff && !sprites[i].isReward) {
              this.y -= collisionInfo.deltaBottom;
              isOnPlatform = true;
            } else {
              if (sprites[i].isReward) {
                if (collisionInfo.isTouching && sprites[i].visible) {
                  sprites[i].makeInvisible();
                  this.score += sprites[i].rewardPoints;
                }
              } else {
                if (collisionInfo.isTouching) {
                  if (collisionInfo.deltaTop < 0) {
                    this.isJumping = false;
                  } else {
                    if (collisionInfo.deltaLeft > collisionInfo.deltaRight) {
                      this.x -= collisionInfo.deltaLeft;
                    } else {
                      this.x += collisionInfo.deltaRight;
                    }
                  }
                }
              }
            }
          } else {
            if (sprites[i].isLethal && sprites[i].visible) {
              if (collisionInfo.isOnTopOff) {
                sprites[i].makeInvisible();
                sprites[i].x = sprites[i].startingX;
                sprites[i].y = sprites[i].startingY;
                this.score += sprites[i].rewardPoints;
              } else {
                if (collisionInfo.isTouching) {
                  this.lives -= 50;
                  this.moveEvent = "death";
                  if (this.lives > 0) {
                    this.x = this.startingX;
                    this.y = this.startingY;
                  }                                   
                }
              }
            }
          }
        }
      }
      this.isOnPlatform = isOnPlatform;
      if (isOnPlatform) {
        this.isJumping = false;
      }
    }  

    update(gameLevel)
    {
      if (this.visible) {
        if (this.isMovable) {
          this.move();
          this.detectCollisions(gameLevel);
        }
      }
    }
  }

  module.exports = SpriteObject;