class Tutorial extends Phaser.Scene {
    constructor() {
        super("tutorialScene");
    }
    preload() {
       // this.load.audio('sfx_select', './assets/sfx_click.wav');
        this.load.image('Tutorial', './assets/Tutorial.png');
    }
    create() {

        this.runnerLore = this.add.tileSprite(0, 0, 1280, 720, 'Tutorial').setOrigin(0, 0);

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

//        this.add.text(centerX, centerY - centerY / 2, 'Lore scene', menuConfig).setOrigin(0.5);
      //  this.add.text(centerX, centerY, 'Use ← → arrows to move & ↑ to Jump', menuConfig).setOrigin(0.5);
        //this.add.text(centerX, centerY, 'Avoid ', menuConfig).setOrigin(0.5);
        menuConfig.backgroundColor = '#00FF00';
        menuConfig.color = '#000';

        // define keys
        keyM = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.M);
        //keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
        //Launch the next scene
        //    this.scene.start("playScene");
        //place tile sprite, grocery background
    }

    update() {
        if (Phaser.Input.Keyboard.JustDown(keyM)) {
            this.sound.play('sfx_select');
            this.scene.start("playScene");
        }
    }
}
