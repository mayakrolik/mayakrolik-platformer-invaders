class GameLevel {

    constructor(serverGameLevel)
    {
        this.levelName = serverGameLevel.levelName;
        this.width = serverGameLevel.width;
        this.height = serverGameLevel.height;
        this.backgroundImageUrls = serverGameLevel.backgroundImageUrls; // ['assets/spaceship.jpg'];//'assets/spaceship.jpg'
        this.backgroundImage = [];
        this.themeUrls = serverGameLevel.themeUrls;
        this.theme = [];
        this.soundMode = serverGameLevel.soundMode;
        this.nonMovingSprites = serverGameLevel.nonMovingSprites;
        this.movingSprites = serverGameLevel.movingSprites;
        this.nonMovingSpriteObjects = [];
        this.movingSpriteObjects = [];
        this.objectsCreated = false;
        this.backgroundLoaded = false;
        this.themeLoaded = false
        this.themeMuted = true;
    }

    createObjects() {
        if (this.objectsCreated)
            return;           
        this.objectsCreated = true;
        //console.log(this);
        for(var i = 0; i < this.nonMovingSprites.length; i++)
        {
            this.nonMovingSpriteObjects.push(new SpriteObject(this.nonMovingSprites[i]));
        }
        /*
        // moving sprites are not added until you join the game and only upon being seen the first time
        for(var i = 0; i < this.movingSprites.length; i++)
        {
            this.movingSpriteObjects.push(new SpriteObject(this.movingSprites[i]));
        }
        */
    }

    loadMusic() {
        if (this.themeLoaded)
            return;
        //console.log(this);         
        for (let i = 0; i < this.themeUrls.length; i++) {
            this.theme.push(loadSound(this.themeUrls[i]));
        }
        
    }

    loadBackground() {
        if (this.backgroundLoaded)
            return;
        this.backgroundLoaded = true;         
        for (let i = 0; i < this.backgroundImageUrls.length; i++) {
            this.backgroundImage.push(loadImage(this.backgroundImageUrls[i]));
        }
        //console.log(this.backgroundImageUrls);
        //console.log(this.backgroundImage);
        //console.log(this.backgroundLoaded);
    }

    draw() {
        this.loadBackground();
        image(this.backgroundImage[0], this.width / 2, this.height / 2, this.width, this.height);
        
    }

    playMusic(volume, index) {
        this.loadMusic();
        if (this.theme[index].isLoaded()){
            //console.log('Load Successful');
            this.themeLoaded = true;
            this.theme[index].playMode(this.soundMode)
            this.theme[index].setVolume(volume);
            if (!this.theme[index].isPlaying()){
                this.theme[index].play();
            }
        } 
    }
}
//theme.setVolume(slider.value() / 100);