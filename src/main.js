let config = {
    type: Phaser.CANVAS,
    width: 1280,
    height: 720,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 300 },
            debug: false
        }
    },
    scene: [Menu, Play],
};
let game = new Phaser.Game(config);
// define game settings
game.settings = {
    playerSpeed: 6,
    gameTimer: 60000,   
}

//reserve some keyboard variables
let keyF, keyLEFT, keyRIGHT, keyDOWN;
var highScore = 0;
var gameTime = 60000;
var myMusic = new Audio("./assets/elevatorMusic.mp3");
var platforms;
var emitter0, emitter1;