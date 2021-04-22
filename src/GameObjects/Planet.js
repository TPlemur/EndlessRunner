// Class Planet
let GRAVITY_CONSTANT = 10;
let DENSITY_CONSTANT = 10;

class Planet extends Phaser.GameObjects.Sprite {
    constructor(scene,x,y,texture,frame) {
        super(scene,x,y,texture,frame);
        this.radius = this.displayWidth/2;
        this.rotation = (2*Math.PI*Math.random())-Math.PI;
        //why doesn't this work >:(
        this.tint = 0xFFFFFF*Math.random();
        scene.add.existing(this)
    }

    setSize(radius) {
        this.radius = radius;
        this.displayWidth = radius*2;
        this.displayHeight = radius*2;
    }

    //TODO: make function that compares ship velocity to max orbital velocity

    //orbital vel function
    //shipHeight is distance from center of planet to center of rocket
    getOrbitVel(shipHeight) {
        //mass of planetary body will be determined by radius;
        //probably pretty janky, will have to work on more soon.
        return Math.sqrt(GRAVITY_CONSTANT*DENSITY_CONSTANT*Math.PI*Math.pow(this.radius,2)/shipHeight);
    }

}