class GameLevel {

    constructor(levelName, width, height, backgroundImageUrls, themeUrls, soundMode)
    {
        this.levelName = levelName;
        this.width = width;
        this.height = height;
        this.backgroundImageUrls = backgroundImageUrls;
        this.themeUrls = themeUrls;
        this.soundMode = soundMode;
        this.nonMovingSprites = [];
        this.movingSprites = [];
    }
}

module.exports = GameLevel;