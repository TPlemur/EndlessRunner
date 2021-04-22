//Play.js
//Creates and populates the main space of play

class Play extends Phaser.Scene {
    constructor() {
        super("playScene")
    }

    preload() {
        //loading assets
        this.load.image('orbiter','assets/orbitPlaceholder.png');
        this.load.image('testPlanert','assets/planet.png');
    }

    create() {

        //define Keys
        keySPACE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

        //text configuration
        let textConfig = {
            fontFamily: 'Courier',
            fontSize: '28px',
            backgroundColor: '#F3B141',
            color: '#843605',
            align: 'right',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 0
        }

        this.testPlanet = new Planet(this,500,500,'testPlanert');
        this.testPlanet.setSize(100);

        //place orbiter in a random place
        this.orbirter = new Orbiter(this,
            500,500,500,500, //placed at origin of orbit
            this.testPlanet.radius*1.5,0, //radious, angle
            'orbiter',keySPACE
        )

        //testing translation stuff below
        this.translatFlag =false;
        this.translateTicks = 60*2; //tps*seconds
        this.translateX = (900-500)/this.translateTicks //target-position

        //translation test
        this.Clock = this.time.delayedCall(5000,()=>{
            this.orbirter.setTranslate(900,500,2);
            this.translatFlag = true;
        });



    }

    update(){
        //update the orbiter
        this.orbirter.update();


        //Testing space: 
        //press space to toggle between liner and circualr motion, mouse position determines new origin
        if(Phaser.Input.Keyboard.JustDown(keySPACE)){
            if(this.orbirter.isOrbiting){
                this.orbirter.setShoot();
            }
            else{
                this.orbirter.setOrbit(game.input.mousePointer.x,game.input.mousePointer.y);
            }
        }

        //translate testplanet if flag
        if(this.translatFlag){
            this.testPlanet.x += this.translateX;
            this.translateTicks -=1;
            if(this.translateTicks===0){
                this.translatFlag = false;
            }
        }

        
        
    }


}