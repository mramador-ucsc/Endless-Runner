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
var myMusic = new Audio("./assets/Caramelldansen.mp3");
var platforms;

//Enemy Variables
var emitter0, emitter1;
var enemySpeed = 3;
var space = 400;
var randomFloor;

function getRandomInt(min, max){
    return Math.floor(Math.random() * (max - min + 1) + min);
}