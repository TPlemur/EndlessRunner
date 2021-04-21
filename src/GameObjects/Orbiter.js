//Orbiter.js
//Defines the orbiter class

class Orbiter extends Phaser.GameObjects.Sprite {
    constructor(scene,x,y,Ox,Oy,rad,angle,texture,switchKey,frame){
        super(scene,x,y,texture,frame)
        scene.add.existing(this)

        //vars
        this.movmentSpeed = 1;
        this.isOrbiting = true;
        this.switchkey = switchKey
        this.angle = angle;
        this.rad = rad;
        this.originX = Ox;
        this.originY = Oy;
        this.period = 0;
    }

    update(){
        
        if(this.isOrbiting){
            this.period = game.time.now*0.001*rad;
            this.orbit();
        }


    }

    //start orbiting around x,y with radious rad
    setOrbit(x,y,rad){
        //update the class variables
        this.originX = x;
        this.originY = y;
        this.rad = rad;
        this.isOrbiting = true;
    }

    //continue orbiting with the current parameters
    orbit(){

        this.x = this.originX +  math.cos(this.period)*this.rad;
        this.y = this.originY +  math.sin(this.period)*this.rad;

    }

    //move an orbiter to a new origin without stoping orbit
    translate(x,y){

    }
    
    //launch the orbiter straight allong the current path
    shoot(){

    }


}