class SpriteObject {
    constructor(sprite) {
        this.id = sprite.id;
        this.x = sprite.x;
        this.y = sprite.y;
        this.width = sprite.width;
        this.height = sprite.height;
        this.visible = sprite.visible;
        this.isMovable = sprite.isMovable;
        this.imageUrls = sprite.imageUrls;
        this.currentImageIndex = sprite.currentImageIndex;
        this.images = [];
        this.imagesLoaded = false;
        this.soundsLoaded = false;
        this.soundUrls = sprite.soundUrls;
        this.sounds = [];
        this.moveEvent = sprite.moveEvent;
    }

    loadImages() {
        if (this.imagesLoaded)
            return;  
        this.imagesLoaded = true;
        //console.log(this);         
        for (let i = 0; i < this.imageUrls.length; i++) {
            this.images.push(loadImage(this.imageUrls[i]));
        }
    }

    loadMusic() {
        if (this.soundsLoaded)
            return;
        this.soundsLoaded = true;
        //console.log(this);     
        if (this.soundUrls) {   
            for (let i = 0; i < this.soundUrls.length; i++) {
                this.sounds.push(loadSound(this.soundUrls[i]));
            }
        }
    }

    draw(volume) {
        this.loadImages();
        this.loadMusic();
        if (this.visible) {
            image(this.images[this.currentImageIndex], this.x, this.y, this.width, this.height);
        }
        this.chooseSound(volume);
    }

    chooseSound(volume) {
        if (this.moveEvent == "jump") {
            //console.log(this.id + " test jump");
            //console.log(volume);
            this.playMusic(volume, 1);
          }
          if (this.moveEvent == "death") {
            //console.log(this.id + " test death");
            this.playMusic(volume, 2);
          }
          if (this.moveEvent == "gamestart") {
            //console.log(this.id + " test gamestart");
            this.playMusic(volume, 0);
          }
    }

    playMusic(volume, index) {
        //this.loadMusic();
        if (this.sounds[index].isLoaded()){
            //console.log('Load Successful');
            this.soundsLoaded = true;
            this.sounds[index].playMode('untilDone'); //(this.soundMode)
            this.sounds[index].setVolume(volume);
            if (!this.sounds[index].isPlaying()){
                this.sounds[index].play();
            }
        } 
    }

}