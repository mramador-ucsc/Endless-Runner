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
    playerHealth: 100,
    playerSpeed: 6,
    gameTimer: 60000,
}

//reserve some keyboard variables
let keyUP, keyLEFT, keyRIGHT, keyDOWN;
var highScore = 0;
var gameTime = 60000;
var myMusic = new Audio("./assets/BrentsBible.mp3");
var platforms;

//High Scores
var p1HighScore = 0;
var p1HighTime = 0;

//Enemy Variables
var emitter0, emitter1;
var enemySpeed = 3;
var space = 400;
var randomFloor;
var dotHit = false;

function getRandomInt(min, max){
    return Math.floor(Math.random() * (max - min + 1) + min);
}