class Menu extends Phaser.Scene {
    constructor() {
        super("menuScene");
    }
    preload() {
        this.load.audio('song', './assets/BrentsBible.mp3');
        this.load.audio('sfx_hurt', './assets/sfx_hurt.flac');
        this.load.audio('sfx_jump', './assets/sfx_jump.ogg');
        this.load.audio('sfx_fall', './assets/sfx_fall.ogg');
        this.load.audio('sfx_select', './assets/sfx_click.wav');
        this.load.audio('sfx_soap', './assets/sfx_soap.ogg');
        this.load.audio('sfx_sick', './assets/sfx_sick.ogg');
        this.load.audio('sfx_alarm', './assets/sfx_alarm.ogg');
        this.load.image('background', './assets/playBackground.png');
    }
    create() {
        this.background = this.add.tileSprite(0, 0, config.width, config.height, 'background').setOrigin(0, 0);
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

        this.add.text(centerX, centerY - centerY / 2, 'Pandemic Runner', menuConfig).setOrigin(0.5);
        this.add.text(centerX, centerY, 'Press [ M ] to start', menuConfig).setOrigin(0.5);
        menuConfig.backgroundColor = '#00FF00';
        menuConfig.color = '#000';

        // define keys
        keyM = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.M);
    }
    update() {
        //scroll grocery background
        this.background.tilePositionX += 3;
        if (Phaser.Input.Keyboard.JustDown(keyM)) {
            this.sound.play('sfx_select');
            this.scene.start("loreScene");
        }
    }
}
