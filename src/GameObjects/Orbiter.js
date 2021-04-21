//Orbiter.js
//Defines the orbiter class

class Orbiter extends Phaser.GameObjects.Sprite {
    constructor(scene,x,y,Ox,Oy,rad,angle,texture,switchKey,frame){
        super(scene,x,y,texture,frame)
        scene.add.existing(this)

        //vars
        this.movmentSpeed = 1;
        this.isOrbiting = true;
        this.isClockwise = true;
        this.switchkey = switchKey
        this.angle = angle;
        this.rad = rad;
        this.originX = Ox;
        this.originY = Oy;
        this.period = 0;
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
    setOrbit(x,y,Ox,Oy,rad,cwise){
        //update the class variables
        this.originX = Ox;
        this.originY = Oy;
        this.rad = rad;
        this.isOrbiting = true;
        this.isClockwise = cwise;
    }

    //continue orbiting with the current parameters
    orbit(){
        if(this.isClockwise){
            this.x = this.originX +  Math.cos(this.period)*this.rad;
            this.y = this.originY +  Math.sin(this.period)*this.rad;

            let radSlope = ((this.originY-this.y)/(this.originX-this.x));//slope of radious to orbiter
            if(this.y-this.originY<0){
                this.angle = 180-(Math.atan(1/radSlope)*(180/Math.PI)+90);
            }
            else{
                this.angle =180- (Math.atan(1/radSlope)*(180/Math.PI)+270);
            }
        }
        else{
            this.x = this.originX -  Math.sin(this.period)*this.rad;
            this.y = this.originY -  Math.cos(this.period)*this.rad;

            //update the angle
            let radSlope = ((this.originY-this.y)/(this.originX-this.x));//slope of radious to orbiter
            if(this.y-this.originY<0){
                this.angle = 360-(Math.atan(1/radSlope)*(180/Math.PI)+90);
            }
            else{
                this.angle =360- (Math.atan(1/radSlope)*(180/Math.PI)+270);
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