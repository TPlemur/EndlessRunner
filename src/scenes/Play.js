//Play.js
//Creates and populates the main space of play

class Play extends Phaser.Scene {
    constructor(){
        super("playScene")
    }

    preload(){
        //loading assets
        this.load.image('orbiter','assets/orbitPlaceholder.png');
        this.load.image('testPlanert','assets/planet Placeholder.png');
    }

    create(){

        this.testPlanet = this.add.sprite(500,500,'testPlanert').setOrigin(0.5);

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

        //place orbiter in a random place
        this.orbirter = new Orbiter(this,
            200,200,200,200, //placed at origin of orbit
            100,0, //radious, angle
            'orbiter',keySPACE

        )
        //testing radial positioning
        this.Clock = this.time.delayedCall(5000,()=>{
            //this.orbirter.period = -Math.PI/2;
            this.orbirter.x = 600;
            this.orbirter.y = 600;
            this.orbirter.setOrbit(500,500);
        });

    }

    update(){
        //update the orbiter
        this.orbirter.update();

        //temparary: press space to toggle between liner and circualr motion, mouse position determines new origin
        if(Phaser.Input.Keyboard.JustDown(keySPACE)){
            if(this.orbirter.isOrbiting){
                this.orbirter.setShoot();
            }
            else{
                this.orbirter.setOrbit(game.input.mousePointer.x,game.input.mousePointer.y);
            }
        }

        
        
    }


}