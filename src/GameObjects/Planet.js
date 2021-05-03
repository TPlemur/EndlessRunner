//Planet.js
//defines the planet class

//functions for outside use:

//setSize(radius) sets the planet to a certain radius
//randomize(minSize) randmize the planet, and place it randomly off the screen to the right
//copyPlanet(planet) make a planet visualy identical to planet and move it to be at the same location
//setTranslate(x,y,time) move the planet to x,y over time

class Planet extends Phaser.GameObjects.Sprite {
    constructor(scene,x,y,texture,frame) {
        super(scene,x,y,texture,frame);
        scene.add.existing(this);
        this.radius = this.displayWidth/2;
        this.captureRange = this.radius*captureScale
        this.rotation = (2*Math.PI*Math.random())-Math.PI;
        this.tintNum = 0xFFFFFF*Math.random();
        this.tint = this.tintNum
        this.rotDir = 1;
        this.numPlanets = 22;
        this.milisPerSecond = 1000;

    }

    //set the radius and update everything dependant on that
    setSize(radius) {
        this.radius = radius;
        this.displayWidth = radius*2;
        this.displayHeight = radius*2;
        this.captureRange = this.radius*captureScale;
    }

    //generate a random integer between min and max
    randomInterval(min,max){
        return Math.floor(Math.random()*(max-min+1)+ min);
    }

    //randomize size, texture, tint, and place the planet randomly such that the capture range never goes off the screen
    randomize(minSize){
        this.setSize(this.randomInterval(minSize,maxPlanet));
        this.x = screenWidth + this.captureRange + this.randomInterval(0,screenWidth/3 - 2*this.captureRange);
        this.y = this.captureRange + this.randomInterval(0,screenHeight-2*this.captureRange);
        this.tintNum = 0xFFFFFF*Math.random();
        this.tint = this.tintNum;
        this.rotDir = this.randomInterval(1,3) - 2; //-1,0,1 determines rotation direction
        let tempString = 'Planet' + String(Math.floor(Math.random() * (this.numPlanets) + 1)) + '.png'
        this.setFrame(tempString);
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
        this.rotDir = planet.rotDir;
    }

    //move from current position to tx,ty over time
    setTranslate(tx,ty,time){
        this.scene.tweens.add({
            targets: this,
            y: {from: this.y, to: ty},
            ease:'Quad',
            duration: time*this.milisPerSecond,
        });
        this.scene.tweens.add({
            targets: this,
            x: {from: this.x, to: tx},
            ease:'Quad',
            duration: time*this.milisPerSecond,
        });
    }

}