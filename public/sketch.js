//const { text } = require("express");

const socket = io.connect(window.location.protocol + "//" + window.location.hostname + ':' + window.location.port); // connect a websocket to back here this page came from

let socketid = null;
let level = null;
let localPlayer = null;
let slider = null;

socket.on("heartbeat", sprites => updateSprites(sprites));

socket.on("connect", () => {
  if (socketid == null)
  {
    socketid = socket.id;
  }
  //console.log(socket.id); 
});

socket.on("disconnect", (disconnect_socketid) => {
  //console.log(disconnect_socketid); 
  level.movingSpriteObjects = level.movingSpriteObjects.filter(player => disconnect_socketid !== player.id);
});

socket.on("setupLevel", (level) => setupLevel(level));

function setupLevel(serverLevel) {
  //console.log('s '+ serverLevel);
  level = new GameLevel(serverLevel);
  //console.log('c '+ level);

  //console.log('setup Level finished.');
}

function getKeystrokes(){
  let keystrokes = {
    up : keyIsDown(UP_ARROW),
    down : keyIsDown(DOWN_ARROW),
    left : keyIsDown(LEFT_ARROW),
    right : keyIsDown(RIGHT_ARROW),
    space : keyIsDown(32)
  };
  return keystrokes;
}

function sendKeystrokes(){
  socket.emit('move', getKeystrokes());
}

setInterval(() => {
  sendKeystrokes();
}, 20);

function sliderChanged(evt){
  //print(evt);
  evt.target.blur();
}

function setup() {
  var canvas = createCanvas(800, 500);
  canvas.parent('sketch-holder');
  rectMode(CENTER);
  textAlign(CENTER);
  imageMode(CENTER);
  slider = createSlider(0, 100, 0, 10);
  slider.parent('slider-holder');
  slider.class('slider');
  //slider.hover(cursor("assets/mouseOrange.png"));
  slider.changed(sliderChanged);
}
let heart, font;
function preload() {
  heart = loadImage('assets/heart.png');
  font = loadFont('assets/originTech.ttf');
}

function draw() {
  if (level) {
    textFont(font);
    level.createObjects();
    level.draw();
    var volume = slider.value();
    level.playMusic(volume / 100, 0);
    level.nonMovingSpriteObjects.forEach(sprite => sprite.draw());
    level.movingSpriteObjects.forEach(sprite => sprite.draw(volume));
    if (localPlayer.visible){
      drawTimeAndScore();
      drawScoreBoard();
    } else {
      drawOverlay();
    }
  }
  window.addEventListener('keydown', function(e) {
    if(e.keyCode == 32 && e.target == document.body) {
      e.preventDefault();
    }
  });
}

function drawTimeAndScore() {
  strokeWeight(2);
  fill(255);
  textSize(20);
  text('Score: ' + localPlayer.score, 100, 25);
  text(localPlayer.timeRemaining + ' sec', 100, 50);
  fill(53, 66, 92);
  noStroke();
  rect(100, 75, 155, 25);
  fill(87, 104, 138);
  rect(100 - ((1 - (Math.max(localPlayer.lives, 0) / 150)) * 50), 75, 150 * (Math.max(localPlayer.lives, 0) / 150), 20);
  image(heart, 25, 75, 30, 30); 
}

function drawOverlay() {
  fill(255);
  strokeWeight(5);
  stroke(0);
  textSize(40);
  if (localPlayer.lostGame){
    text("You lost", width / 2, 200);
    textSize(35);
    text('Score: ' + localPlayer.score, width / 2, 150);
  } else {
    if (localPlayer.gamesPlayed) {
      text("You survived", width / 2, 200);
      textSize(35);
      text('Score: ' + localPlayer.score, width / 2, 150);
    } else {
      text("Good Luck", width / 2, 200);
    }
    
  }
  text("Press Space to Play", width / 2, 100);
}

function drawScoreBoard(){
  textSize(15);
  strokeWeight(5);
  stroke(0);
  for (let i = 7; i < level.movingSpriteObjects.length; i++){
    if (level.movingSpriteObjects[i].nameTag) {
      fill(level.movingSpriteObjects[i].nameTagR, level.movingSpriteObjects[i].nameTagG, level.movingSpriteObjects[i].nameTagB);
      text(level.movingSpriteObjects[i].nameTag + " " + level.movingSpriteObjects[i].score + " points", 700, 15 + (20 * (i - 11)));
    }
  }
}

function updateSprites(serverMovingSprites) {
  if (localPlayer == null && socketid != null)
  {
    localPlayer = level.movingSpriteObjects.filter(player => socketid === player.id)[0];
  }
  for (let i = 0; i < serverMovingSprites.length; i++) {
    let movingSpriteFromServer = serverMovingSprites[i];
    let existsIndex = movingSpriteExists(movingSpriteFromServer.id);
    if (existsIndex < 0) {
      if (movingSpriteFromServer.isPlayer)
      {
        level.movingSpriteObjects.push(new Player(movingSpriteFromServer));
      } else {
        level.movingSpriteObjects.push(new SpriteObject(movingSpriteFromServer))
      }
      //console.log('added ' + movingSpriteFromServer.id);
    } else {
      // console.log('updated');
      level.movingSpriteObjects[existsIndex].x = movingSpriteFromServer.x;
      level.movingSpriteObjects[existsIndex].y = movingSpriteFromServer.y;
      level.movingSpriteObjects[existsIndex].visible = movingSpriteFromServer.visible;
      level.movingSpriteObjects[existsIndex].currentImageIndex = movingSpriteFromServer.currentImageIndex;
      level.movingSpriteObjects[existsIndex].lives = movingSpriteFromServer.lives;
      level.movingSpriteObjects[existsIndex].score = movingSpriteFromServer.score;
      level.movingSpriteObjects[existsIndex].timeRemaining = movingSpriteFromServer.timeRemaining;
      level.movingSpriteObjects[existsIndex].moveEvent = movingSpriteFromServer.moveEvent;
      level.movingSpriteObjects[existsIndex].lostGame = movingSpriteFromServer.lostGame;
      level.movingSpriteObjects[existsIndex].gamesPlayed = movingSpriteFromServer.gamesPlayed;
    }
  }
}

function movingSpriteExists(id) {
  for (let i = 0; i < level.movingSpriteObjects.length; i++) {
    if (id === level.movingSpriteObjects[i].id) {
      return i;
    }
  }
  return -1;
}