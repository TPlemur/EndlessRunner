//Blackhole.js
//Defines the black hole class

class Blackhole extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture){
        super(scene, x, y, texture);
        scene.add.existing(this);
    }

    update(){
        
    }
       
}
