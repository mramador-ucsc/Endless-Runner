class ingameUI {
    constructor(scene, x, y){

        this.bar = new Phaser.GameObjects.Graphics(scene);

        this.x = x;
        this.y = y;
        this.value = 100;
        this.p = 76/100;
        this.draw();
        scene.add.existing(this.bar);
        
        //Intializing variables
        var isDead = false;
        //var isHurt = false;
        var isHighScore = false;
    }

    decrease(amount){
        this.value -= amount;
        if(this.value<0){
            this.value = 0;
            isDead = true;
        }

        this.draw();

        return (this.value === 0);

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