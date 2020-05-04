class Menu extends Phaser.Scene {
    constructor() {
        super("menuScene");
    }
    preload() {
        this.load.audio('song', './assets/BrentsBible.mp3');
    }
    create() {
        let gameAudio = this.sound.add('song');

        let menuConfig = {
            fontFamily: 'Arial Black',
            fontSize: '28px',
            backgroundColor: '#F3B141',
            color: '#843605',
            align: 'right',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 0
        }
        //show menu text
        let centerX = game.config.width / 2;
        let centerY = game.config.height / 2;
        let textSpacer = 64;

        this.add.text(centerX, centerY - centerY / 2, 'Endless Runner', menuConfig).setOrigin(0.5);
        this.add.text(centerX, centerY, 'Use <- -> arrows to move & (^) to Jump', menuConfig).setOrigin(0.5);
        menuConfig.backgroundColor = '#00FF00';
        menuConfig.color = '#000';

        // define keys
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
        //Launch the next scene
        //this.scene.start("playScene");
    }

    update() {
        if (Phaser.Input.Keyboard.JustDown(keyLEFT)) {
            // easy mode
            game.settings = {
                playerSpeed: 3,
                gameTimer: 60000
            }
            gameTime = 60000;
            this.scene.start("playScene");
        }

        else if (Phaser.Input.Keyboard.JustDown(keyRIGHT)) {
            // hard mode
            game.settings = {
                playerSpeed: 5,
                gameTimer: 45000
            }
            gameTime = 45000;
            this.scene.start("playScene");
        }
    }
}
