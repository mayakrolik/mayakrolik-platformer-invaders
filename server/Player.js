const NameHelper = require("./NameHelper");
const SpriteObject = require("./SpriteObject");


class Player extends SpriteObject {
  constructor(id, ip, x, y, width, height, imageUrls, defaultImageIndex, direction, velocity, jumpSpeed, fallingSpeed, gameLevelMaxX, gameLevelMaxY, soundUrls) {
    super(id, x, y, width, height, imageUrls, defaultImageIndex, true, false, false, 0, soundUrls);

    this.ip = ip;
    this.levelIndex = 0;
    this.joinedAt = Date.now();
    this.visible = false;
    this.nameTag = NameHelper.makeName();
    this.direction = direction;
    this.velocity = velocity;
    this.jumpSpeed = jumpSpeed;
    this.fallingSpeed = fallingSpeed;
    this.minHeight = 370;
    this.maxHeight = 50;
    this.isPlayer = true;
    this.timeRemaining = 30;
    this.lives = 150;
    this.score = 0;
    this.moveLeft = false;
    this.moveRight = false;
    this.moveUp = false;
    this.moveDown = false;
    this.spacebarPressed = false;
    this.gameLevelMaxX = gameLevelMaxX;
    this.gameLevelMaxY = gameLevelMaxY;
    this.nameTagR = Math.random() * 255;
    this.nameTagG = Math.random() * 255;
    this.nameTagB = Math.random() * 255;
    this.lostGame = false;
    this.gamesPlayed = 0;
    this.jumpHeight = 250;
    setInterval(() => {if (this.visible) this.timeRemaining -= 1;}, 1000);
  }

  move() { 
    if (this.moveLeft) {
      this.x -= this.velocity; //move left
      this.direction = 'l';
    } else if (this.moveRight) {
      this.x += this.velocity;
      this.direction = 'r';
    }
    var iterator = Math.floor((new Date()).getTime() / 250) % 2; 
    if (this.direction == 'l') {
      if (this.isOnPlatform) {
        if (this.moveLeft){
          //console.log("iterator = " + iterator);
          if (iterator) {
            this.currentImageIndex = 6; //left walking 1
          } else {
            this.currentImageIndex = 0; //left walking
          }
        } else {
          this.currentImageIndex = 5; //left standing
        }
      } else {
        this.currentImageIndex = 2; // left jumping
      }
    }
    if (this.direction == 'r') {
      if (this.isOnPlatform) {
        if (this.moveRight){
          if (iterator){
            this.currentImageIndex = 7; //right walking 1
          } else {
            this.currentImageIndex = 1; //right walking
          }
        } else{
          this.currentImageIndex = 4; //right standing
        }
      } else {
        this.currentImageIndex = 3; //right jumping
      }
    }
    if (this.isOnPlatform){
      this.maxHeight = this.y - this.jumpHeight;
    }
    if (this.moveUp) {
      if (this.isOnPlatform) {
        this.isJumping = true;
        this.moveEvent = "jump";
        //play jump sound
      }
    } else {
      this.isJumping = false;
    }

    if (this.x >= this.gameLevelMaxX + 30) {
      this.x = -20;
    } else if (this.x <= -30) {
      this.x = this.gameLevelMaxX + 20;
    }

    if (!this.isOnPlatform && !this.isJumping) {
      this.y += this.fallingSpeed;
    }

    if (this.isJumping) {
      this.y -= this.jumpSpeed;
      
      if (this.y < this.maxHeight) {
        this.isJumping = false;
      }
    }

    if (this.lives <= 0 || this.timeRemaining <= 0)
    {
      this.visible = false;
      this.gamesPlayed += 1;
    }

    if (this.lives <= 0 && this.timeRemaining > 0){
      this.lostGame = true;
    }

  }

}

module.exports = Player;