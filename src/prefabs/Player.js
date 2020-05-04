//Player Prefab
class Player extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame);
        scene.add.existing(this); //add object to existing scene, displayList, updateList
        this.isJumping = false;
        this.isFalling = false;
        this.sfxJump = scene.sound.add('sfx_jump'); // add jumping sfx
        this.sfxFall = scene.sound.add('sfx_fall'); // add falling sfx
    }
    update() {
        //left/right movement
        if (this.x > 0) {
            this.x -= .5;
        }

        if (keyLEFT.isDown && this.x > 0) {
            this.x -= game.settings.playerSpeed;
        }
        else if (keyRIGHT.isDown && this.x < config.width - 60) {
            this.x += game.settings.playerSpeed;
        }

        //Fall Button
        if (Phaser.Input.Keyboard.JustDown(keyDOWN) && !this.isJumping && !this.isFalling && this.y < config.height) {
           this.isFalling = true;
           this.sfxFall.play();  // play sfx
        }

        if (this.isFalling){
            //If player is on the third floor, fall to second floor
            if (this.y >= (config.height / 3) && this.y  < (config.height* 2) / 3) {
                this.y += game.settings.playerSpeed;
                if(this.y >= (config.height * 2) / 3){
                    this.y = 480;
                    this.isFalling = false;
               }
            }
            //If player is on the second floor, fall to first floor
            else if (this.y >= (config.height * 2) / 3 && this.y < config.height) {
                this.y += game.settings.playerSpeed;
                if(this.y == config.height){
                    this.isFalling = false;
               }
            }
        }
        // Jumping button
        if (Phaser.Input.Keyboard.JustDown(keyUP) && !this.isJumping && !this.isFalling && this.y > config.height/3) {
            this.isJumping = true;
            this.sfxJump.play();  // play sfx
        }
        //if Jumping, move up
        if (this.isJumping) {
            //console.log(this.y);
            //if the player is on the first floor, jump to the second floor
            if (this.y <= config.height  && this.y > (config.height * 2) / 3) {
                this.y -= game.settings.playerSpeed;
                if (this.y == (config.height * 2) / 3) {
                    this.isJumping = false;
                }
            }
            //If player is on the second floor, jump to the third floor
            else if (this.y <= Math.trunc((config.height * 2) / 3) && this.y > config.height / 3) {
                this.y -= game.settings.playerSpeed;
                if (this.y == config.height / 3) {
                    this.isJumping = false;
                }
            }
        }
        /*
                // bn on miss
                if (this.y <= 108) {
                    this.reset();
                }
                */
    }
    //reset rocket to ground
    reset() {
        this.isFiring = false;
        this.y = 431;
    }
}