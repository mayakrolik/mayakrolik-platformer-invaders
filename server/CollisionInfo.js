class CollisionInfo {
    constructor(mainSprite, otherSprite) {
      this.deltaTop = mainSprite.top() - otherSprite.bottom();
      this.deltaRight = otherSprite.left() - mainSprite.right();
      this.deltaBottom = mainSprite.bottom() - otherSprite.top();
      this.deltaLeft = mainSprite.left() - otherSprite.right();
  
      this.isTouching = ((mainSprite.right() >= otherSprite.left()) && (mainSprite.left() <= otherSprite.right()) && (mainSprite.bottom() >= otherSprite.top()) && (mainSprite.top() <= otherSprite.bottom()));
  
      this.isOnTopOff = (this.deltaRight < 0 && this.deltaLeft < 0 && this.deltaBottom >= 0 && Math.abs(this.deltaBottom) < 10);
    }
  }

  module.exports = CollisionInfo;