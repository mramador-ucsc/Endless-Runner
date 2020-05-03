class ingameUI {
    constructor(scene, x, y){
        //Creates initial health bar variable
        this.bar = new Phaser.GameObjects.Graphics(scene);

        //Overlay to be used for DOT
        this.overlay = new Phaser.GameObjects.Graphics(scene);
        this.overlay.clear();
        scene.add.existing(this.overlay);   
        
        //Intialize Variables
        this.x = x;
        this.y = y;
        this.value = 100;
        this.amount = Phaser.Math.Between(2, 8)
        this.p = 76/100;
        
        //Use variables to draw out everything
        this.draw();
        scene.add.existing(this.bar);
        
        //Intializing variables
        var isDead = false;
        //var isHurt = false;
        var isHighScore = false;
    }

    decrease(scene,amount){
        //DOT will be done in two increments in the span of 4 seconds
        amount /= 2;

        //DOT indicator
        this.overlay.fillStyle(0x00FF00, 0.1)
        this.overlay.fillRect(0, 0, config.width, config.height);

        this.dotClock3 = scene.time.delayedCall(4000,  () => {
            this.overlay.clear();
        }, null, scene);

        //console.log("here");

        this.dotClock = scene.time.delayedCall(2000,  () => {
            //console.log("running");
            this.value -= amount;
            console.log(this.value);
            this.draw();
            if(this.value<0){
                this.value = 0;
                this.isDead = true;
            }

            this.dotClock2 = scene.time.delayedCall(2000,  () => {
                //console.log("running2");
                this.value -= amount;
                console.log(this.value);
                this.draw();
                if(this.value<0){
                    this.value = 0;
                    this.isDead = true;
                }
            }, null, scene);
            
        }, null, scene);

    }
    
    draw(){
        //Clear for draw
        this.bar.clear();

        //Make black background for health bar
        this.bar.fillStyle(0x000000);
        this.bar.fillRect(this.x, this.y, 80, 16);

        //White BG for Health Bar
        this.bar.fillStyle(0xffffff)
        this.bar.fillRect(this.x + 2, this.y + 2, 76, 12);

        if(this.value < 30){
            this.bar.fillStyle(0x00ff00);
        } else {
            this.bar.fillStyle(0x00ff00);
        }

        var d = Math.floor(this.p * this.value);

        //Actual Health Bar
        this.bar.fillRect(this.x + 2, this.y + 2, d, 12);

    }

}