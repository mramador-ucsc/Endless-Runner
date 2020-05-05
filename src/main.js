/*
Names of Collaborators: Modesto Amador, Miguelcloid Reniva, Brent Hopkins
Game Title: Pandemic Runner
Date Completed: 5/4/2020
Creative Tilt: We are all fond of our art and music that Brent created to make the atmosphere of the game match our lore.
               We are also fond of the damage over time mechanic Cloid and Modesto implemented. The damage over time affects
               not only player health but a health bar UI asset that we created as well. Another technical interesting mechanic
               we had was showing players their x' distance travelled in the game over screen. Cloid looked through a lot of poor
               Phaser 3 documentation to figure that out.

*/
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
    scene: [Menu, Play, Lore, Tutorial],
};
let game = new Phaser.Game(config);
// define game settings
game.settings = {
    playerHealth: 100,
    playerSpeed: 6,
    gameTimer: 60000,
}

//reserve some keyboard variables
let keyUP, keyLEFT, keyRIGHT, keyDOWN, keyM;
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