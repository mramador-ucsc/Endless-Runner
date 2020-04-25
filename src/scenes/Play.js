class Play extends Phaser.Scene {
    constructor() {
        super("playScene");
    }

    preload() {
        //load images/tile sprite
        this.load.image('player', './assets/player.png');
        this.load.image('enemy', './assets/enemy.png');
        this.load.image('background', './assets/playBackground.png');
        this.load.image('ground', './assets/platform.png');
        // load spritesheet
        //     this.load.spritesheet('explosion', './assets/explosion.png', { frameWidth: 64, frameHeight: 32, startFrame: 0, endFrame: 9 });
        //load particles
        this.load.image('spark0', './assets/yellow.png');
        this.load.image('spark1', './assets/green.png');
        //load song
        this.load.audio('song', './assets/elevatorMusic.mp3');
    }
    create() {
        let gameAudio = this.sound.add('song');
        //myMusic.play();

        //place tile sprite
        this.background = this.add.tileSprite(0, 0, config.width, config.height, 'background').setOrigin(0, 0);

        platforms = this.physics.add.staticGroup();
        platforms.create(config.width / 2, config.height / 3, 'ground'); //third floor
        platforms.create(config.width / 2, (config.height + config.height) / 3, 'ground'); //second floor
        platforms.create(config.width / 2, config.height, 'ground'); //first floor
        //this.stars = this.add.tileSprite(0, 0, 640, 480, 'stars').setOrigin(0, 0);

        //white rectangle borders
        //this.add.rectangle(5, 5, 630, 32, 0xFFFFFF).setOrigin(0, 0);
        //this.add.rectangle(5, 443, 630, 32, 0xFFFFFF).setOrigin(0, 0);
        //this.add.rectangle(5, 5, 32, 455, 0xFFFFFF).setOrigin(0, 0);
        //this.add.rectangle(603, 5, 32, 455, 0xFFFFFF).setOrigin(0, 0);
        //this.border = this.add.tileSprite(0, 0, game.config.width, game.config.height, 'border').setOrigin(0, 0);

        //green UI background
        //this.add.rectangle(37, 42, 566, 64, 0x00FF00).setOrigin(0, 0);

        //add player (p1)
        this.p1 = new Player(this, config.width / 2, config.height, 'player').setScale(0.5, 0.5).setOrigin(0.5, 1).setDepth(1);


        //add enemy x3
        this.enemy1 = new Enemy(this, config.width, config.height / 3, 'enemy', 0, 30).setScale(0.5, 0.5).setOrigin(0.5, 1).setDepth(1);
        this.enemy2 = new Enemy(this, config.width + space, (config.height * 2) / 3, 'enemy', 0, 50).setScale(0.5, 0.5).setOrigin(0.5, 1).setDepth(1);
        this.enemy3 = new Enemy(this, config.width + space*2, config.height, 'enemy', 0, 10).setScale(0.5, 0.5).setOrigin(0.5, 1).setDepth(1);
        //define keyboard keys
        keyF = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F);
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
        keyDOWN = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN);
        /*
                // animation config
                this.anims.create({
                    key: 'explode',
                    frames: this.anims.generateFrameNumbers('explosion', { start: 0, end: 9, first: 0 }),
                    frameRate: 30
                });
        */
        // score
        this.p1Score = 0;

        // score display
        let scoreConfig = {
            fontFamily: 'Courier',
            fontSize: '28px',
            backgroundColor: '#F3B141',
            color: '#843605',
            align: 'right',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 100
        }
        //this.scoreLeft = this.add.text(69, 54, this.p1Score, scoreConfig);
        //this.scoreRight = this.add.text(400, 54, 'HS:' + highScore, scoreConfig);
        //this.displayTime = this.add.text(220, 54, 'T:' + gameTime / 1000, scoreConfig);

        // game over flag
        this.gameOver = false;

        // 60-second play clock
        scoreConfig.fixedWidth = 0;
        this.clock = this.time.delayedCall(game.settings.gameTimer, () => {
            this.add.text(game.config.width / 2, game.config.height / 2, 'GAME OVER', scoreConfig).setOrigin(0.5);
            this.add.text(game.config.width / 2, game.config.height / 2 + 64, '(F)ire to Restart or <- for Menu', scoreConfig).setOrigin(0.5);
            this.gameOver = true;
        }, null, this);
        //Ship Speed Increase after 30 seconds
        //setTimeout(this.increaseSpeed, 30000);

    }

    update() {

        if (this.gameOver) {
            //  myMusic.pause();
        }
        // check key input for restart
        if (this.gameOver && Phaser.Input.Keyboard.JustDown(keyF)) {
            gameTime = game.settings.gameTimer;
            //game.settings.playerSpeed = game.settings.spaceshipSpeed / 2.5;
            this.scene.restart();

        }
        if (this.gameOver && Phaser.Input.Keyboard.JustDown(keyLEFT)) {
            this.scene.start("menuScene");
        }
        //Update enemy particles behind them
        this.enemyParticle(this.enemy1); 
        this.enemyParticle(this.enemy2);
        this.enemyParticle(this.enemy3);
        //scroll starfield
        this.background.tilePositionX += .5;
        //this.stars.tilePositionX -= 3;

        if (!this.gameOver) {
            this.p1.update();         // update rocket sprite
            this.enemy1.update();
            this.enemy2.update();
            this.enemy3.update();
            // this.updatetime();
            /* 
            if (this.p1Score > highScore) {
                 highScore = this.p1Score;
                 this.scoreRight.text = 'HS:' + highScore;
             }
             */
        }

        // check collisions
        if (this.checkCollision(this.p1, this.enemy1)) {
            this.gameOver = true;
            //this.p1.reset();
            //this.shipExplode(this.ship03);
        }
        if (this.checkCollision(this.p1, this.enemy2)) {
            this.gameOver = true;
            //this.p1Rocket.reset();
            //this.shipExplode(this.ship02);
        }
        if (this.checkCollision(this.p1, this.enemy3)) {
            this.gameOver = true;
            //this.p1Rocket.reset();
            //this.shipExplode(this.ship02);
        }
        /*
        //Check if game is over, if it is, display 0 time left
        if (this.gameOver) {
            this.displayTime.text = 'T:0'
        }
        */

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
    /*
    shipExplode(ship) {
        ship.alpha = 0;                         // temporarily hide ship
        // score increment and repaint
        this.p1Score += ship.points;
        this.scoreLeft.text = this.p1Score;

        this.sound.play('sfx_explosion');

        for (var i = 0; i < 10; i++) {
            var emitter0 = this.add.particles('spark0').createEmitter({
                x: ship.x,
                y: ship.y,
                speed: { min: -400, max: 400 },
                angle: { min: 0, max: 360 },
                scale: { start: 0.5, end: 0 },
                blendMode: 'SCREEN',
                //active: false,
                lifespan: 600,
                gravityY: 0
            });

            var emitter1 = this.add.particles('spark1').createEmitter({
                x: ship.x,
                y: ship.y,
                speed: { min: -400, max: 400 },
                angle: { min: 0, max: 360 },
                scale: { start: 0.3, end: 0 },
                blendMode: 'SCREEN',
                //active: false,
                lifespan: 300,
                gravityY: 0
            });
            emitter0.explode();
            emitter1.explode();

        }
        ship.reset();                       // reset ship position
        ship.alpha = 1;                     // make ship visible again
    }

    increaseSpeed() {
        game.settings.spaceshipSpeed = game.settings.spaceshipSpeed * 2.5;
    }
    updatetime() {
        gameTime -= 16.6666;
        if (gameTime >= 16.666) {

            this.displayTime.text = 'T:' + gameTime / 1000;
        }
    }
    */
}