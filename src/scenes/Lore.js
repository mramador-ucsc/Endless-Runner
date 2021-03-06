class Lore extends Phaser.Scene {
    constructor() {
        super("loreScene");
    }
    preload() {
        this.load.image('runnerlore', './assets/runnerlore.png');
    }
    create() {
        this.runnerLore = this.add.tileSprite(0, 0, 1280, 720, 'runnerlore').setOrigin(0, 0);
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
        let centerX = game.config.width / 2;
        let centerY = game.config.height / 2;
        let textSpacer = 64;
        this.add.text(centerX, centerY + centerY - 20, 'Press [ M ] to continue', menuConfig).setOrigin(0.5);
        menuConfig.backgroundColor = '#00FF00';
        menuConfig.color = '#000';

        // define keys
        keyM = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.M);
    }

    update() {
        if (Phaser.Input.Keyboard.JustDown(keyM)) {
            this.sound.play('sfx_select');
            this.scene.start("tutorialScene");
        }
    }
}
