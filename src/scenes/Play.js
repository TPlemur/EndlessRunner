//Play.js
//Creates and populates the main space of play

class Play extends Phaser.Scene {
    constructor(){
        super("playScene")
    }

    preload(){
        //loading assets
        this.load.image('orbiter','assets/orbitPlaceholder.png');
    }

    create(){


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

        //place orbiter
        this.orbirter = new Orbiter(this,
            200,200,200,200, //placed at origin of orbit
            100,0, //radious, angle
            'orbiter',keySPACE

        )
        this.orbirter.x = 300;
        this.orbirter.y = 300;
        this.orbirter.setOrbit(400,400);


    }

    update(){

        //update the orbiter
        this.orbirter.update();

        if(Phaser.Input.Keyboard.JustDown(keySPACE)){
            if(this.orbirter.isOrbiting){
                this.orbirter.startShoot();
            }
            else{
                this.orbirter.setOrbit(game.input.mousePointer.x,game.input.mousePointer.y);
            }
        }

        
        
    }


}