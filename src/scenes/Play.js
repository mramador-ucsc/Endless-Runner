class Play extends Phaser.Scene {
    constructor() {
        super("playScene");
    }

    preload() {
        //load images/tile sprite
    //    this.load.image('player', './assets/player.png');
   //     this.load.image('enemy', './assets/enemy.png');
        this.load.image('cloud', './assets/doodleCloud.png');
        this.load.image('facemask', './assets/facemask.png');
        this.load.image('soap', './assets/powerup_soap.png');
        this.load.image('background', './assets/playBackground.png');
        this.load.image('ground', './assets/platform.png');
        this.load.image('spark0', './assets/yellow.png');
        this.load.image('spark1', './assets/green.png');
        this.load.image('sick', './assets/sick.png');
        this.load.spritesheet('player', './assets/spritesheet/playerSpritesheet.png',{
            frameWidth: 80,
            frameHeight: 80
        });
        this.load.spritesheet('enemy', './assets/spritesheet/enemySpritesheet.png',{
            frameWidth: 160,
            frameHeight: 160
        });
    }
    create() {
        myMusic.play();
        myMusic.loop = true;
        //var globalTime = this.game.time.totalElapsedSeconds();
        //place tile sprite, grocery background
        this.background = this.add.tileSprite(0, 0, config.width, config.height, 'background').setOrigin(0, 0);

        platforms = this.physics.add.staticGroup();
        platforms.create(config.width / 2, config.height / 3, 'ground'); //third floor
        platforms.create(config.width / 2, (config.height + config.height) / 3, 'ground'); //second floor
        platforms.create(config.width / 2, config.height, 'ground'); //first floor
        platforms.setAlpha(0);
        //this.stars = this.add.tileSprite(0, 0, 640, 480, 'stars').setOrigin(0, 0);

        //Add HP Bar
        this.hp = new ingameUI(this, 50, 32);

        //Add sick icon next to HP Bar
        this.sickIcon = this.add.tileSprite(this.hp.x + 80, this.hp.y, 16, 16, 'sick').setScale(2, 2).setOrigin(0, 0);
        this.sickIcon.setAlpha(0);

        //add player (p1)
        this.p1 = new Player(this, config.width / 2, config.height, 'player').setScale(1, 1).setOrigin(0.5, 1).setDepth(1);
        this.anims.create({
            key: 'walk',
            frames: this.anims.generateFrameNumbers('player', { 
                start: 0, 
                end: 4,
             }),
            frameRate: 8,
            repeat: -1
        });
        this.p1.anims.play('walk');
        //add enemy x3
        this.enemy1 = new Enemy(this, config.width, config.height / 3, 'enemy', 0, 30).setScale(0.75, 0.75).setOrigin(0.5, 1).setDepth(1);
        this.enemy2 = new Enemy(this, config.width + space, (config.height * 2) / 3, 'enemy', 0, 50).setScale(0.75, 0.75).setOrigin(0.5, 1).setDepth(1);
        this.enemy3 = new Enemy(this, config.width + space * 2, config.height, 'enemy', 0, 10).setScale(0.75, 0.75).setOrigin(0.5, 1).setDepth(1);

        this.anims.create({
            key: 'run',
            frames: this.anims.generateFrameNumbers('enemy', { 
                start: 0, 
                end: 2,
             }),
            frameRate: 4,
            repeat: -1
        });
        this.enemy1.anims.play('run');
        this.enemy2.anims.play('run');
        this.enemy3.anims.play('run');
        //add dot clouds x3
        this.covid1 = new covidCloud(this, this.enemy1.x, this.enemy1.y - 50, 'cloud', 0, 30).setScale(.1, .1).setOrigin(0.5, 1).setDepth(1);
        this.covid2 = new covidCloud(this, this.enemy2.x, this.enemy2.y - 50, 'cloud', 0, 30).setScale(.1, .1).setOrigin(0.5, 1).setDepth(1);
        this.covid3 = new covidCloud(this, this.enemy3.x, this.enemy3.y - 50, 'cloud', 0, 30).setScale(.1, .1).setOrigin(0.5, 1).setDepth(1);

        this.facemask = new FaceMask(this, config.width, config.height / 3, 'facemask', 0, 30).setScale(0.1, 0.1).setOrigin(0.5, 1).setDepth(1);
        //this.facemask.x = 0;

        //define keyboard keys
        keyUP = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
        keyDOWN = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN);
        keyM = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.M);

        // score
        this.p1Score = 0;
        //p1HighScore = this.p1HighScore;
        //p1HighTime = this.;

        this.p1HighScore = p1HighScore;
        this.p1HighTime = p1HighTime;
        //console.log(this.p1.x);
        this.p1intx = this.p1.x;
        this.p1inty = this.p1.y;

        // facemask boolean
        this.facemaskon = false;

        //done

        //Key-Recording bool
        this.keycheck = false;

        // game over flag
        this.gameOver = false;

        this.difficultyTimer = this.time.addEvent({
            delay: 1000,
            callback: this.timeUp, 
            callbackScope: this,
            loop: true
        });

        this.increaseDifficultyTimer = this.time.addEvent({
            delay: 10000,                // ms
            callback: this.increaseDifficulty,
            //args: [],
            callbackScope: this,
            loop: true
        });
        this.elasped = 0;
        //console.log(Phaser.Math.Distance.Between(0,0,100,0)); // 103.07764064044152

        keyLEFT.on('up', (event) => {  
            //console.log(this.p1.x);            
            //console.log(this.p1.y);
            if(!this.gameOver){
            console.log("distance(l): " + Phaser.Math.Distance.Between(this.p1intx,this.p1inty,this.p1.x,this.p1.y));
            this.p1Score += Math.floor(Phaser.Math.Distance.Between(this.p1int.x,this.p1int.y,this.p1.x,this.p1.y)); 
            this.keycheck = false;
                }
            });

            keyRIGHT.on('up', (event) => {  
                //console.log(this.p1.x); //get an error           
            //console.log(this.p1.y); //get an error
            if(!this.gameOver){
            console.log("distance(r): " + Phaser.Math.Distance.Between(this.p1intx,this.p1inty,this.p1.x,this.p1.y));
            this.p1Score += Math.floor(Phaser.Math.Distance.Between(this.p1int.x,this.p1int.y,this.p1.x,this.p1.y));
            this.keycheck = false;
                }
            });

    }

    update() {

        if(Phaser.Input.Keyboard.JustDown(keyRIGHT) && this.keycheck == false) {
            this.p1int = coord(this.p1.x, this.p1.y); function coord (x,y) { return {x, y} }
            this.keycheck = true;

        }

        if(Phaser.Input.Keyboard.JustDown(keyLEFT) && this.keycheck == false){
            this.p1int = coord(this.p1.x, this.p1.y); function coord (x,y) { return {x, y} }
            this.keycheck = true;
        }


        if (this.hp.isDead == true) {
            this.gameOver = true;
        }

        if (this.gameOver) {
            this.difficultyTimer.paused = true;
              myMusic.pause();
              enemySpeed = 3;
              
              let scoreConfig = {
                fontFamily: 'Courier',
                fontSize: '20px',
                backgroundColor: '#EEE8AA',
                color: '#843605',
                align: 'center',
                padding: {
                    top: 5,
                    bottom: 5,
                },
                fixedWidth: 400
            }
            this.add.rectangle(config.width/3, config.height/3, 400, 250, 0xFACADE).setOrigin(0, 0).setDepth(999);
            scoreConfig.fontSize = 17;
            this.menu = this.add.text(425, 250, "Press M to go back or ↑ to play again", scoreConfig);            
            this.menu.setDepth(999);

            scoreConfig.fontSize = 20;
            this.scoreLeft = this.add.text(425, 300, "You traveled: " + this.p1Score, scoreConfig);
            this.scoreLeft.setDepth(999);

            this.scoreRight = this.add.text(425, 350,"Seconds alive: " + this.elasped, scoreConfig);
            this.scoreRight.setDepth(999);


            if (this.p1HighScore < this.p1Score) {
                p1HighScore = this.p1Score;
                this.p1HighScore = this.p1Score;
            }

            if (this.p1HighTime < this.elasped) {
                p1HighTime = this.elasped;
                this.p1HighTime = this.elasped;
            }
            this.highLeft = this.add.text(425, 400, "Longest Distance: " + p1HighScore, scoreConfig);
            this.highLeft.setDepth(999);
            this.highRight = this.add.text(425, 450, "Longest Time: " + p1HighTime, scoreConfig);
            this.highRight.setDepth(999);


        }

        // check key input for restart
        if (this.gameOver && Phaser.Input.Keyboard.JustDown(keyUP)) {
            gameTime = game.settings.gameTimer;
            this.sound.play('sfx_select');
            this.scene.restart();

        }
        if (this.gameOver && Phaser.Input.Keyboard.JustDown(keyM)) {
            //console.log("menu");
            this.scene.start("menuScene");
        }

        //scroll grocery background
        this.background.tilePositionX += 1.5;

        if (!this.gameOver) {
            this.p1.update();
            this.enemy1.update();
            this.enemy2.update();
            this.enemy3.update();

            //Update enemy particles behind them
            this.enemyParticle(this.enemy1);
            this.enemyParticle(this.enemy2);
            this.enemyParticle(this.enemy3);

            this.covid1.update();
            this.covid2.update();
            this.covid3.update();

            this.facemask.update();

        }

        // check collisions


        if (this.checkCollision(this.p1, this.facemask)) {
            //Used for debugging
            //console.log("mask is on");
            //Boolean used for dot event
            this.facemaskon = true;
        }

        if (this.checkCollision(this.p1, this.enemy1)) {
            this.gameOver = true;
        }
        if (this.checkCollision(this.p1, this.enemy2)) {
            this.gameOver = true;
        }
        if (this.checkCollision(this.p1, this.enemy3)) {
            this.gameOver = true;
        }

        if (this.checkCollision(this.p1, this.covid1) && dotHit == false && !this.gameOver) {

            if(this.facemaskon == true){
                //console.log("mask is off");
                this.facemaskon = false;
                dotHit = true;
                this.sickIcon.setAlpha(0);
                this.dotClock = this.time.delayedCall(3000, this.dotDone);
                return;
            }

            this.hp.decrease(this, Phaser.Math.Between(1, 4));
            dotHit = true;
            this.sickIcon.setAlpha(1);
            this.dotClock = this.time.delayedCall(4000, this.dotDone);
        }

        if (this.checkCollision(this.p1, this.covid2) && dotHit == false && !this.gameOver) {
            //Check for conditional to check if facemask is on
            if(this.facemaskon == true){
                //console.log("mask is off");
                this.facemaskon = false;
                dotHit = true;
                this.sickIcon.setAlpha(0);
                this.dotClock = this.time.delayedCall(3000, this.dotDone);
                return;
            }

            this.hp.decrease(this, Phaser.Math.Between(1, 4));
            dotHit = true;
            this.sickIcon.setAlpha(1);
            this.dotClock = this.time.delayedCall(3000, this.dotDone);
        }

        if (this.checkCollision(this.p1, this.covid3) && dotHit == false && !this.gameOver) {

            if(this.facemaskon == true){
                //console.log("mask is off");
                this.facemaskon = false;
                dotHit = true;
                this.sickIcon.setAlpha(1);
                this.dotClock = this.time.delayedCall(4000, this.dotDone);
                return;
            }
            //console.log("i am here");
            this.hp.decrease(this,Phaser.Math.Between(1, 4));
            dotHit = true;
            this.sickIcon.setAlpha(1);
            this.dotClock = this.time.delayedCall(4000, this.dotDone);
        }

    }

    checkCollision(player, enemy) {
        // simple AABB checking
        if (player.x < enemy.x + enemy.width / 2 &&
            player.x + player.width / 2 > enemy.x &&
            player.y < enemy.y + enemy.height / 2 &&
            player.height / 2 + player.y > enemy.y) {
            return true;
        } else {
            return false;
        }
    }

    dotDone() {
        dotHit = false;
    }

    enemyParticle(enemy) {
        var emitter0 = this.add.particles('spark0').createEmitter({
            x: enemy.x,
            y: enemy.y - enemy.height / 4,
            speed: { min: -400, max: 400 },
            angle: { min: 0, max: 360 },
            scale: { start: 0.5, end: 0 },
            depth: 1,
            blendMode: 'COLOR',
            //active: false,
            lifespan: 400,
            gravityY: 0
        });

        var emitter1 = this.add.particles('spark1').createEmitter({
            x: enemy.x,
            y: enemy.y - enemy.height / 4,
            speed: { min: -400, max: 400 },
            angle: { min: 0, max: 360 },
            scale: { start: 0.5, end: 0 },
            depth: 1,
            blendMode: 'COLOR',
            //active: false,
            lifespan: 400,
            gravityY: 0
        });
        emitter0.explode();
        emitter1.explode();
    }

    increaseDifficulty() {
        enemySpeed = enemySpeed + 2;
        console.log(enemySpeed);
 //       this.load.audio('sfx_bell', './assets/sfx_bell.mp3');
 //       this.sound.play(sfx_bell);
    }

    timeUp() {

        this.elasped++;
        //console.log(this.elasped + "elasped time");
        if(this.elasped%30 == 0){
            //console.log("i ran");
            enemySpeed = enemySpeed * 1.5;    
        }
    }
    

}