class Tutorial extends Phaser.Scene {
    constructor() {
        super("tutorialScene");
    }
    preload() {
        this.load.image('Tutorial', './assets/Tutorial.png');
    }
    create() {
        this.runnerLore = this.add.tileSprite(0, 0, 1280, 720, 'Tutorial').setOrigin(0, 0);
        // define keys
        keyM = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.M);
    }

    update() {
        if (Phaser.Input.Keyboard.JustDown(keyM)) {
            this.sound.play('sfx_select');
            this.scene.start("playScene");
        }
    }
}
