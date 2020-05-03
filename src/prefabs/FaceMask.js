//FaceMask prefab
class FaceMask extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame, pointValue) {
        super(scene, x, y, texture, frame);


        scene.add.existing(this); //add object to existing scene, displayList, updateList
        //this.points = pointValue;

    }
    
    update() {
        //move Enemy left
        this.x -= enemySpeed + 10;
        //wrap around screen bounds
        if (this.x <= 0 - this.width) {
             this.randomFloor = getRandomInt(1, 3);
            if(this.randomFloor == 1){
                this.x = game.config.width;
                this.y = game.config.height;
            }
            if(this.randomFloor == 2){
                this.x = game.config.width;
                this.y = (game.config.height*2)/3;
            }
            if(this.randomFloor == 3){
                this.x = game.config.width;
                this.y = game.config.height/3;
            }
        }
    }
    reset(){
        this.x = game.config.width;
    }
}