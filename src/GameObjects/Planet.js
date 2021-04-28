// Class Planet
let GRAVITY_CONSTANT = 10;
let DENSITY_CONSTANT = 10;
let ORBIT_MULTIPLIER = 1.5;

class Planet extends Phaser.GameObjects.Sprite {
    constructor(scene,x,y,texture,frame) {
        super(scene,x,y,texture,frame);
        scene.add.existing(this);
        this.radius = this.displayWidth/2;
        this.captureRange = this.radius*captureScale
        this.rotation = (2*Math.PI*Math.random())-Math.PI;
        this.tintNum = 0xFFFFFF*Math.random();
        this.tint = this.tintNum

    }

    update(){
        
    }

    //set the radius and update everything dependant on that
    setSize(radius) {
        this.radius = radius;
        this.orbit_radius = radius*ORBIT_MULTIPLIER;
        this.displayWidth = radius*2;
        this.displayHeight = radius*2;
        this.captureRange = this.radius*captureScale;
    }

    //generate a random integer between min and max
    randomInterval(min,max){
        return Math.floor(Math.random()*(max-min+1)+ min);
    }

    //size place the planet randomly such that the capture range never goes off the screen
    randomize(minSize){
        this.setSize(this.randomInterval(minSize,maxPlanet));
        this.x = screenWidth + this.captureRange + this.randomInterval(0,screenWidth/3 - 2*this.captureRange);
        this.y = this.captureRange + this.randomInterval(0,screenHeight-2*this.captureRange);
        this.tintNum = 0xFFFFFF*Math.random();
        this.tint = this.tintNum;
    }

    //set this planet to be visualy and mechanicly identical to another
    copyPlanet(planet){
        this.x = planet.x;
        this.y = planet.y;
        this.setTexture(planet.texture);
        this.rotation = planet.rotation;
        this.setSize(planet.radius);
        this.tintNum = planet.tintNum;
        this.tint = this.tintNum;
        this.frame = planet.frame;
    }

    //TODO: make function that compares ship velocity to max orbital velocity

    //orbital vel function
    //shipHeight is distance from center of planet to center of rocket
    getOrbitVel(shipHeight) {
        //mass of planetary body will be determined by radius;
        //probably pretty janky, will have to work on more soon.
        return Math.sqrt(GRAVITY_CONSTANT*DENSITY_CONSTANT*Math.PI*Math.pow(this.radius,2)/shipHeight);
    }

    getRadius() {
        return this.radius;
    }

    setTranslate(tx,ty,time){
        this.scene.tweens.add({
            targets: this,
            y: {from: this.y, to: ty},
            ease:'Quad',
            duration: time*1000,
        });
        this.scene.tweens.add({
            targets: this,
            x: {from: this.x, to: tx},
            ease:'Quad',
            duration: time*1000,
        });
    }

}