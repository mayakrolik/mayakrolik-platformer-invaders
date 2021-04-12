class Player extends SpriteObject {
  constructor(player) {
    super(player);
    this.ip = player.ip;
    this.visible = player.visible;
    this.joinedAt = new Date(player.joinedAt);
    this.nameTag = player.nameTag;
    this.nameTagR = player.nameTagR;
    this.nameTagG = player.nameTagG;
    this.nameTagB = player.nameTagB;
    this.lostGame = player.lostGame;
    this.gamesPlayed = player.gamesPlayed;
    this.score = player.score;
    //this.spacebarPressed = player.spacebarPressed;
  }

  draw(volume) {
    super.draw(volume);
    if (this.visible) {
      fill(this.nameTagR, this.nameTagG, this.nameTagB);
      strokeWeight(2);
      stroke(0);
      textSize(15);  
      text(this.nameTag , this.x , this.y - (this.height/2) - 13); //+ ' - ' + this.ip.split(':').pop()
    }
  }

}