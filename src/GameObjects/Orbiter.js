//Orbiter.js
//Defines the orbiter class, 
//note: the rocket sprite should point to the right

class Orbiter extends Phaser.GameObjects.Sprite {
    constructor(scene,x,y,Ox,Oy,rad,angle,texture,switchKey,frame){
        super(scene,x,y,texture,frame)
        scene.add.existing(this)

        //vars
        this.movmentSpeed = 0.01;
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
    }

    update(){
        //defines the relationship between speed and the radious
        if(this.isClockwise){
            this.period += 50*this.movmentSpeed/this.rad; 
        }
        else{
            this.period -= 50*this.movmentSpeed/this.rad; 
        }


        //move appropreatly
        if(this.isOrbiting){
            this.orbit();
        }
        else{
            this.shoot();
        }
    }

    //start orbiting around Ox,Oy from current position
    setOrbit(Ox,Oy){
        //update the class variables
        this.originX = Ox;
        this.originY = Oy;
        this.rad = Math.sqrt(Math.pow(this.x-Ox,2)+Math.pow(this.y-Oy,2)); //defining the radious as the distance between the origin and the orbiter
        this.isOrbiting = true;
        if(this.y<Oy){this.isClockwise = true;} //rocket always progressses to the right so if it is above the origin it should move clockwise
        else{this.isClockwise = false;}
        //set the period to the correct angle
        this.period = Math.atan2((this.y-this.originY),(this.x-this.originX));
        console.log(this.period)
    }

    //continue orbiting with the current parameters
    orbit(){
        //slope of the tangent at the orbiter (found by inverting the slope of the radious)
        let tanSlope = 1/((this.originY-this.y)/(this.originX-this.x));
        this.tanAngle = Math.atan(tanSlope)*(180/Math.PI); //converting the slope to an angle in degrees
        //update the position
        this.x = this.originX +  Math.cos(this.period)*this.rad;
        this.y = this.originY +  Math.sin(this.period)*this.rad;

        //set the start location of the rotation to the current location
        if(this.isClockwise){
            this.angle = this.period*(180/Math.PI) + 90;
        }
        else{
            this.angle = this.period*(180/Math.PI)-90;
        }
    }

    //move an orbiter to a new origin without stoping orbit
    translate(x,y){

    }
    setShoot(){
        this.isOrbiting = false;
        if(this.y>this.originY){this.shootup = true}
        else(this.shootup = false)
    }

    //launch the orbiter straight allong the current path
    shoot(){
        let xupdate =Math.cos(this.tanAngle*Math.PI/180)*this.movmentSpeed*this.rad
        let yupdate =Math.sin(this.tanAngle*Math.PI/180)*this.movmentSpeed*this.rad  
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
