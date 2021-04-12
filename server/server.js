const express = require("express");
const socket = require('socket.io');
const GameLevel = require("./GameLevel");
const app = express();
let Player = require("./Player");
let SpriteObject = require("./SpriteObject");
let Enemy = require("./Enemy");

const PORT = process.env.PORT || 8080;

let server = app.listen(PORT);
console.log('The server is now running at http://localhost:' + PORT + '/');
app.use(express.static("public"));


let io = socket(server);

let width = 800;
let height = 500;
let levels = [];

levels.push(new GameLevel('Level One', width, height, ['assets/spaceship.jpg'], ['assets/Theme1.mp3'], 'restart')); 

levels[0].movingSprites.push(new SpriteObject('Coin1', width / 2, 200, 50, 50, ['assets/coin.png'], 0, false, false, true, 25));
levels[0].movingSprites.push(new SpriteObject('Coin2', 50, 100, 50, 50, ['assets/coin.png'], 0, false, false, true, 25));
levels[0].movingSprites.push(new SpriteObject('Coin3', width - 50, 100, 50, 50, ['assets/coin.png'], 0, false, false, true, 25));

for (let i = 0; i < 3; i++) {
  levels[0].movingSprites.push(new SpriteObject('Coin' + (i+4), (i+1) * 100 + 200, 350, 50, 50, ['assets/coin.png'], 0, false, false, true, 25));
}

levels[0].nonMovingSprites.push(new SpriteObject('MidPlatform1', width / 2, 300, 200, 40, ['assets/grey.png'])); 
levels[0].nonMovingSprites.push(new SpriteObject('BottomPlatform1', width / 2, 475, width, 50, ['assets/grey.png'])); 
levels[0].nonMovingSprites.push(new SpriteObject('TopPlatform1', 70, 200, 200, 40, ['assets/grey.png'])); 
levels[0].nonMovingSprites.push(new SpriteObject('TopPlatform2', width-70, 200, 200, 40, ['assets/grey.png'])); 

levels[0].movingSprites.push(new Enemy('Enemy1', (width/2), 200, 70, 50, ['assets/enemy.png'], 100, Math.random() * 0.001 + 0.001, 180));
  
levels[0].movingSprites.push(new Enemy('Enemy2', (width/2)-50, 200, 70, 50, ['assets/enemy.png'], 150, Math.random() * 0.001 + 0.001, 0));

for (let i = 0; i < 3; i++) {
  levels[0].movingSprites.push(new Enemy('Enemy' + (i+3) ,Math.random() * 600 + 100, 370, 70, 50, ['assets/enemy.png'], Math.random() * 250 + 50, Math.random() * 0.001 + 0.001, Math.random() * 6.27 ));
}

setInterval(updateGame, 16);

io.sockets.on("connection", socket => {
  console.log(`New connection ${socket.id}`);
  const ipAddress = socket.request.headers['x-appengine-user-ip'] || socket.request.headers['x-forwarded-for'] || socket.handshake.address || " : " ;
  //console.log(socket.request.headers);
  //console.log(ipAddress);
  levels[0].movingSprites.push(new Player(socket.id,ipAddress, (Math.random() * (width-30)), 4, 60, 90, ['assets/walkingLeft.png', 'assets/walkingRight.png', 'assets/jumpingLeft.png', 'assets/jumpingRight.png', 'assets/centered.png', 'assets/centeredLeft.png', 'assets/walkingLeft1.png', 'assets/walkingRight1.png'], 0, 'l', 2, 5, 3, levels[0].width, levels[0].height, ['assets/gameJoin.mp3', 'assets/jump.mp3', 'assets/death.mp3'] ));
  //['assets/walkLeft1.png', 'assets/walkRight1.png', 'assets/jumpLeft.png', 'assets/jumpRight.png', 'assets/standing.png']
  io.to(socket.id).emit('setupLevel', levels[0]);

  socket.on("disconnect", () => {
    io.sockets.emit("disconnect", socket.id);
    levels[0].movingSprites = levels[0].movingSprites.filter(player => player.id !== socket.id);
  });

  socket.on('joinLevel', (levelNumber) => {
    player = levels[0].movingSprites.filter(player => player.id == socket.id)[0];
    joinLevel(player, 0);
  });

  socket.on('move', (keystrokes) => {
    //console.log('player ' + socket.id + ' moved ' + direction);
    player = levels[0].movingSprites.filter(player => player.id == socket.id)[0];
    player.moveLeft = keystrokes.left;
    player.moveRight = keystrokes.right;
    player.moveUp = keystrokes.up;
    player.moveDown = keystrokes.down;
    player.spacebarPressed = keystrokes.space;

    if (keystrokes.space)
    {
      joinLevel(player, 0);      
    }
  });
});

function joinLevel(player,levelIndex) {
  if (!player.visible)
  {
    player.moveEvent = "gamestart";   
    player.visible = true;
    if (player.lives > 0 && player.timeRemaining > 0) {          
      levels[levelIndex].movingSprites.push(player);
    } else {
      console.log("player is starting over");
      player.lives = 150;
      player.timeRemaining = 30;
      player.score = 0;
      player.lostGame = false;
      player.x = player.startingX;
      player.y = player.startingY;   
    }
  }
}

function updateGame() {
  if (levels[0])
  {
    levels[0].movingSprites.forEach(sprite => sprite.update(levels[0]));
  }
  io.sockets.emit("heartbeat", levels[0].movingSprites);
  if (levels[0])
  {
    levels[0].movingSprites.forEach(sprite => sprite.moveEvent = "");
  }
}

