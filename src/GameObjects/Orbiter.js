//Orbiter.js
//Defines the orbiter class, and implements its functionality

//functions desingend for outside use:

//update()  required for functionality - handles keyInput
//setTranslate(x,y,time) translate origin to x,y over time
//checkSafe(planet) checks for collision with planet or bounds
//checkDist(planet) returns the distance to an object
//explode(planet) causes the ship to shink into planet


class Orbiter extends Phaser.GameObjects.Sprite {
    constructor(scene,x,y,Ox,Oy,rad,angle,texture,switchKey,frame){
        super(scene,x,y,texture,frame)
        scene.add.existing(this)

        //vars
        this.movmentSpeed = 2;      // used to set the speed of a rotation, and the following liner motion, determines the initial speed of the ship
        this.isOrbiting = true;     // toggles between liner and circular motion
        this.isClockwise = false;   // wether the ship rotates clockwise or counterclockwise
        this.switchkey = switchKey; // used to switch the state of the orbiter
        this.angle = angle;         // the angle of the sprite relative to the gameworld
        this.rad = rad;             // the radious of the orbit
        this.originX = Ox;          // x coordinate of the center of an orbit
        this.originY = Oy;          // y coordinate of the center of an orbit
        this.period = 1*Math.PI;            // incremented to create circular motion

        //fixed vars
        this.screenOrigin = 0;      // 0,0 is the top left corner of the window
        this.quarterTurn = 90;      // rotates things 90 degrees
        this.milisPerSec = 1000;    // converts between miliseconds and seconds
        this.degRadConversion = 180/Math.PI // converts between degrees and radians
    }

    update(){
        //Increments the angle of the ship, defines speed and direction of rotation
        if(this.isClockwise){
            this.period += this.movmentSpeed/this.rad *globalSpeed;
        }
        else{
            this.period -= this.movmentSpeed/this.rad *globalSpeed; 
        }
        //move appropreatly
        if(this.isOrbiting){
            this.orbit();
        }
        else{
            this.shoot();
        }

        //listen for & switch movement modes
        if(Phaser.Input.Keyboard.JustDown(this.switchkey)){
            if(this.isOrbiting){
                this.isOrbiting = false;
            }
            else if(mouseOrbit){   //orbit the mouse if mouseOrbit is on
                this.setOrbit(game.input.mousePointer.x,game.input.mousePointer.y);
            }
        }
    }

    //start orbiting around Ox,Oy from current position
    setOrbit(Ox,Oy){
        //update the origin
        this.originX = Ox;
        this.originY = Oy;
        //definine the radious as the distance between the origin and the orbiter
        this.rad = Math.sqrt(Math.pow(this.x-Ox,2)+Math.pow(this.y-Oy,2)); 
        this.isOrbiting = true;
        //set the period to the correct angle for the current position
        this.period = Math.atan2((this.y-this.originY),(this.x-this.originX));
        this.movmentSpeed = (shipMoveSpeed/this.rad) //adjust speed for orbit, bigger orbit = smaller speed, const is a random number
        
        //make an assumption
        this.isClockwise = true;
        //rotational deltas (assuming clockwise)
        let deltaRotX = (this.originX +  Math.cos(this.period+this.movmentSpeed/this.rad)*this.rad)-(this.originX +  Math.cos(this.period)*this.rad)
        let deltaRotY = (this.originY +  Math.sin(this.period+this.movmentSpeed/this.rad)*this.rad)-(this.originY +  Math.sin(this.period)*this.rad)
        //liner deltas
        let deltaLinX = Math.cos(this.angle*(1/this.degRadConversion))*this.movmentSpeed
        let deltaLinY = Math.sin(this.angle*1/this.degRadConversion)*this.movmentSpeed
        //check the assumption
        if(
            Math.sign(deltaRotX) != Math.sign(deltaLinX) &&
            Math.sign(deltaRotY) != Math.sign(deltaLinY)
        ){
            this.isClockwise = false; // correct assumption if false
        }
    }

    //continue orbiting with the current parameters
    orbit(){
        //update the position
        this.x = this.originX +  Math.cos(this.period)*this.rad;
        this.y = this.originY +  Math.sin(this.period)*this.rad;

        //set the angle of the ship to be tangent to the orbit
        if(this.isClockwise){
            this.angle = this.period*(this.degRadConversion) + this.quarterTurn;
        }
        else{
            this.angle = this.period*(this.degRadConversion) - this.quarterTurn;
        }
    }

    //translate the origin from current postition to x,y over time
    //only works while obriting
    setTranslate(x,y,time){
        this.scene.tweens.add({
            targets: this,
            originY: {from: this.originY, to: y},
            ease:'Quad',
            duration: time*this.milisPerSec,
        });
        this.scene.tweens.add({
            targets: this,
            originX: {from: this.originX, to: x},
            ease:'Quad',
            duration: time*this.milisPerSec,
        });
    }

    //checks if orbiter will collide with planet
    checkSafe(planet) {
        //check for planet collision
        if (this.checkDist(planet) <= planet.radius) {
            causeOfDeath = 'Crashed into a planet';
            this.explode(planet);
            return true;
        }
        //check for bounds
        if(this.x < this.screenOrigin - this.displayWidth || 
           this.x > screenWidth + this.displayWidth || 
           this.y < this.screenOrigin - this.displayHeight|| 
           this.y > screenHeight + this.displayHeight){
            causeOfDeath = 'Drifting endlessly in space';
            return true;
        }
        return false;
    }

    //returns the distance between the orbiter's position and an object with a .x and .y property
    checkDist(planet){
        return Math.hypot(this.x-planet.x,this.y-planet.y);
    }

    //maintain liner motion 
    shoot(){
        //Move the approprate distance and preportion
        this.x += Math.cos(this.angle*(1/this.degRadConversion))*this.movmentSpeed*globalSpeed*2
        this.y += Math.sin(this.angle*1/this.degRadConversion)*this.movmentSpeed*globalSpeed*2
    }

    //shrink the ship into planet
    explode(planet){
        let offsetDirx = 1;
        if(this.x<planet.x){offsetDirx = -1};
        let offsetDiry = 1;
        if(this.y<planet.y){offsetDiry = -1};

        this.scene.tweens.add({
            targets: this,
            x: planet.x + (this.x-planet.x) - offsetDirx*planet.radius/4,
            y: planet.y + (this.y-planet.y) - offsetDiry*planet.radius/4,
            displayHeight: 0,
            displayWidth: 0,
            ease:'Quad',
            duration: tweenspeed*this.milisPerSec,
        });
    }
}
