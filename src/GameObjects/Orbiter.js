//Orbiter.js
//Defines the orbiter class, 
//note: the rocket sprite should point to the right

class Orbiter extends Phaser.GameObjects.Sprite {
    constructor(scene,x,y,Ox,Oy,rad,angle,texture,switchKey,frame){
        super(scene,x,y,texture,frame)
        scene.add.existing(this)

        //vars
        this.movmentSpeed = 1;
        this.isOrbiting = true;
        this.isClockwise = false;
        this.switchkey = switchKey
        this.angle = angle;
        this.rad = rad;
        this.originX = Ox;
        this.originY = Oy;
        this.period = 0;
        this.tanAngle;
    }

    update(){
        
        if(this.isOrbiting){
            //defines the relationship between speed and the radious
            this.period += .5/this.rad; 
            //causes the motion
            this.orbit();
        }
    }

    //start orbiting around Ox,Oy with radious rad and initial position x,y
    setOrbit(x,y,Ox,Oy,cwise){
        //update the class variables
        this.originX = Ox;
        this.originY = Oy;
        this.x = x;
        this.y = y;
        this.rad = Math.sqrt((x-Ox)*(x-Ox)+(y-Oy)*(y-Oy));
        this.isOrbiting = true;
        this.isClockwise = cwise;
    }

    //continue orbiting with the current parameters
    orbit(){
        //slope of the tangent at the orbiter (found by inverting the slope of the radious)
        let tanSlope = 1/((this.originY-this.y)/(this.originX-this.x));
        this.tanAngle = Math.atan(tanSlope)*(180/Math.PI); //converting the slope to an angle
        if(this.isClockwise){
            //update the position
            this.x = this.originX +  Math.cos(this.period)*this.rad;
            this.y = this.originY +  Math.sin(this.period)*this.rad;

            //update the angle
            if(this.y-this.originY<0){
                this.angle = 360-tanAngle;
            }
            else{
                this.angle = 180-tanAngle;
            }
        }
        else{
            //update the position
            this.x = this.originX -  Math.sin(this.period)*this.rad;
            this.y = this.originY -  Math.cos(this.period)*this.rad;

            //update the angle
            if(this.y-this.originY<0){
                this.angle = 180-tanAngle;
            }
            else{
                this.angle = 360-tanAngle;
            }
        
        }
    }

    //move an orbiter to a new origin without stoping orbit
    translate(x,y){

    }
    
    //launch the orbiter straight allong the current path
    shoot(){
        //find tangent line
        (this.originX,this.originY) // center of circle
        let radSlope = ((this.originY-this.y)/(this.originX-this.x))//slope of radious to orbiter
        this.tanSlope = 1/this.radSlope //slope of the tangent


    }


}