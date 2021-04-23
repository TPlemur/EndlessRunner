//Orbiter.js
//Defines the orbiter class, and implements its functionality
//note: the rocket sprite should point to the right

//functions desingend for outside use:

//update()  required for functionality
//setOrbit(x,y) orbit around x,y
//setTranslate(x,y,time) translate origin to x,y over time
//setShoot() move forward in a straight line
//checkColision(planet) returns true on collision with planet
//checkBounds() returns true if the orbiter leaves the screen

class Orbiter extends Phaser.GameObjects.Sprite {
    constructor(scene,x,y,Ox,Oy,rad,angle,texture,switchKey,frame){
        super(scene,x,y,texture,frame)
        scene.add.existing(this)

        //vars
        this.movmentSpeed = 1;
        this.isOrbiting = true;
        this.isClockwise = false;
        this.shootup;
        this.switchkey = switchKey
        this.angle = angle;
        this.rad = rad;
        this.originX = Ox;
        this.originY = Oy;
        this.period = 0;
        this.tanAngle;
        this.translateX
        this.translateY
        this.translateTicks
        this.isTranslate = false;
    }

    update(){
        //Increments the angle of the ship, defines speed of rotation
        if(this.isClockwise){
            this.period += this.movmentSpeed/this.rad;
        }
        else{
            this.period -= this.movmentSpeed/this.rad; 
        }
        //move appropreatly
        if(this.isOrbiting){
            this.orbit();
        }
        else{
            this.shoot();
        }

        //translate if applicable
        if(this.isTranslate){
            this.translate()
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
        //make assumptions about the direction of the orbit
        if(this.y<Oy){this.isClockwise = true;} //orbiter always progressses to the right so if it is above the origin it should move clockwise
        else{this.isClockwise = false;}
        //set the period to the correct angle for the current position
        this.period = Math.atan2((this.y-this.originY),(this.x-this.originX));
        this.movmentSpeed = (200/this.rad)*globalSpeed //adjust speed for orbit, bigger orbit = smaller speed, const is a random number
    }

    //continue orbiting with the current parameters
    orbit(){
        //slope of the tangent at the orbiter (found by inverting the slope of the radious)
        let tanSlope = 1/((this.originY-this.y)/(this.originX-this.x));
        this.tanAngle = Math.atan(tanSlope)*(180/Math.PI); //converting the slope to an angle in degrees
        
        //update the position
        this.x = this.originX +  Math.cos(this.period)*this.rad;
        this.y = this.originY +  Math.sin(this.period)*this.rad;

        //set the angle of the ship to be tangent to the orbit
        if(this.isClockwise){
            this.angle = this.period*(180/Math.PI) + 90;
        }
        else{
            this.angle = this.period*(180/Math.PI)-90;
        }
    }

    //starts moving the orbiter to origin x,y over time in seconds
    setTranslate(x,y,time){
        //number of ticks the move should happen over
        this.translateTicks = time*60//game tick rate is nominaly 60tps
        //amount moved per tick
        this.translateX = (x-this.originX)/this.translateTicks;
        this.translateY = (y-this.originY)/this.translateTicks;
        //set translate flag
        this.isTranslate = true;
    }

    //contiune a tranlation until compleation 
    translate(){
        //increment position
        this.originX += this.translateX
        this.originY += this.translateY
        this.x+= this.translateX
        this.y+= this.translateY
        //decremnt number of remaining ticks, and unset the translate flag to stop the translation
        this.translateTicks -=1
        if(this.translateTicks===0){
            this.isTranslate = false;
        }
    }

    //checks if orbiter will collide with planet
    checkCollision(planet) {
        if (Math.hypot(this.x-planet.x,this.y-planet.y) <= planet.radius) {
            return true;
        }
        return false;
    }
    //checs if the orbiter is out of bounds
    checkBounds(){
        if(this.x<0 || this.x > screenWidth){
            return true;
        }
        if(this.y<0 || this.y > screenHeight){
            return true;
        }
        return false;
    }

    //start liner motion in the direction the ship is currently pointing
    setShoot(){
        this.isOrbiting = false;
        if(this.y>this.originY){this.shootup = true}
        else(this.shootup = false)
    }

    //maintain liner motion 
    shoot(){
        //find the distance moved and the preportion x and y moved
        let xupdate =Math.cos(this.tanAngle*Math.PI/180)*this.movmentSpeed
        let yupdate =Math.sin(this.tanAngle*Math.PI/180)*this.movmentSpeed
        //find the approprate sign to attach to distance, and move the distance
        if (this.isClockwise){
            if(this.shootup){
                this.x -= xupdate
                this.y += yupdate
            }
            else{
                this.x += xupdate
                this.y -= yupdate            
            }
        }
        else{
            if(this.shootup){
                this.x += xupdate
                this.y -= yupdate
            }
            else{
                this.x -= xupdate
                this.y += yupdate            
            }
        }
    }
}
