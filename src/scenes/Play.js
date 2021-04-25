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

        //Fades in the Scene
        this.cameras.main.fadeIn(250);

        //define Keys
        keySPACE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        keyESC = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ESC);

        //flags & vars
        this.gameRuningFlag = true;
        this.lastDist = 10000000; // var should be bigger than screen at start

        //text configuration
        let textConfig = {
            fontFamily: 'Courier',
            fontSize: '200px',
            backgroundColor: '#F3B141',
            color: '#843605',
            align: 'right',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 0
        }

        //creating all three planets that can be on screen at once
        this.targetPlanet = new Planet(this,1000,500,'testPlanert');
        this.orbitPlanet = new Planet(this,500,500,'testPlanert');
        this.deadPlanet = new Planet(this,-200,500,'testPlanert');

        //setting size of new planets
        this.targetPlanet.setSize(100);
        this.orbitPlanet.setSize(100);
        this.deadPlanet.setSize(100);

        //place orbiter in the starting location
        this.orbirter = new Orbiter(this,
            500,500,500,500, //placed at origin of orbit
            this.targetPlanet.radius*1.5,0, //radious, angle
            'orbiter',keySPACE
        )

        //translation test
        // this.Clock = this.time.delayedCall(2000,()=>{
        //     this.orbirter.setTranslate(900,500,2);
        //     this.testPlanet.setTranslate(900,500,2);
        // });



    }

    update(){
        //update the orbiter]
        if(this.gameRuningFlag){
            this.orbirter.update();
        }        
        else{//if game ends go space to go to menu
            if(Phaser.Input.Keyboard.JustDown(keySPACE)){
                this.scene.start('playScene');
            }
            if(Phaser.Input.Keyboard.JustDown(keyESC)){
                this.scene.start('menuScene')
            }
        }


        //capture system
        if(!this.orbirter.isOrbiting && this.orbirter.checkDist(this.targetPlanet) > this.lastDist && this.lastDist<this.targetPlanet.captureRange){
            
            // reset lastDist for next capture
            this.lastDist = 1000000; 
            //set the orbiter to orbiting the new planet
            this.orbirter.setOrbit(this.targetPlanet.x,this.targetPlanet.y);
            
            //reassign the planets
            Object.assign(this.deadPlanet,this.orbitPlanet); //deadplanet is off the screen to the left, and replaces the old orbit planet
            Object.assign(this.orbitPlanet,this.targetPlanet); // orbit planet is updated to be the planet the rocket is orbiting

            //randomize target planet and place it off screen
            //this.targetPlanet.randomize() //NOT IMPLEMENTED
            this.targetPlanet.x = screenWidth + this.targetPlanet.radius;

            //move everything to reset the world
            this.deadPlanet.setTranslate(-this.deadPlanet.radius,this.deadPlanet.y,2);
            this.targetPlanet.setTranslate(1000,this.targetPlanet.y,2);
            this.orbitPlanet.setTranslate(500,this.orbitPlanet.y,2);
            this.orbirter.setTranslate(500,500,2);
            
            
        }
        else{
            this.lastDist = this.orbirter.checkDist(this.targetPlanet);
        }




        //check if the game should end
        if(this.orbirter.checkBounds() || this.orbirter.checkCollision(this.targetPlanet)){
            this.gameRuningFlag = false
            //this.orbiter.explode() UNIMPLEMENTED
            this.add.text(game.config.width/2, game.config.height/2,'GAME OVER', this.textConfig).setOrigin(0.5);

            //When game ends jump to End Screen
            this.scene.start('endScene');
        } 
    }


}