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
        this.load.image('blackHole', './assets/blackHole.png');
        this.load.image('blackHoleWaves', './assets/blackHoleWaves.png');
        this.load.image('boundingRing','assets/planets/dottedRing.png');
    }

    create() {

        //Fades in the Scene
        this.cameras.main.fadeIn(250);

        //define Keys
        keySPACE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        keyESC = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ESC);

        //flags & vars
        this.gameRuningFlag = true;
        this.lastDist = 10000000; // var should be bigger than screen at start, but doesn't need to be anything specific

        //text configuration
        this.textConfig = {
            fontFamily: 'Courier',
            fontSize: '200px',
            color: '#707081',
            align: 'right',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 0
        }

        //creating all three planets that can be on screen at once
        this.targetPlanet = new Planet(this,5*screenWidth/6,screenHeight/2,'testPlanert');
        this.orbitPlanet = new Planet(this,screenWidth/2,screenHeight/2,'testPlanert');
        this.deadPlanet = new Planet(this,-200,500,'testPlanert');
        this.boundingRing = new Planet(this,5*screenWidth/6,screenHeight/2,'boundingRing');

        //setting size of new planets
        this.targetPlanet.setSize(100);
        this.orbitPlanet.setSize(100);
        this.deadPlanet.setSize(100);
        this.boundingRing.setSize(this.targetPlanet.captureRange);

        //place orbiter in the starting location
        this.orbirter = new Orbiter(this,
            screenWidth/2,screenHeight/2,screenWidth/2,screenHeight/2, //placed at origin of orbit
            this.targetPlanet.captureRange,0, //radious, angle
            'orbiter',keySPACE
        )

        //scale up orbiter by magic numbers can be removed for final game
        this.orbirter.displayWidth = 30;
        this.orbirter.displayHeight = 30;

        //Black Hole Creation
        this.blackHoleWaves = new Blackhole(this, screenCenterX - 3500, screenCenterY, 'blackHoleWaves').setScale(0.5); //blackHoleWaves are the waves that move and collide with the ship, the waves move up and down for visual sakes randomly
        this.blackHole = new Blackhole(this, screenCenterX - 1100, screenCenterY, 'blackHole').setScale(0.2); //blackHole is the hole itself that rotates for visual sakes
        this.blackHoleWaves.setSpeed(0.2); //Sets the speed at which the Black Hole Waves advance
    
        //Creates physical bodies for orbitPlanet and blackHole Waves and can perform a function when they collide.
        this.physics.add.existing(this.blackHoleWaves);
        this.physics.add.existing(this.orbitPlanet);
        this.physics.add.collider(this.blackHoleWaves, this.orbitPlanet, () => { console.log("Collided")});
    }

    update(){
        //update the orbiter]
        if(this.gameRuningFlag){
            this.orbirter.update();
                    //check if the game should end
            if(this.orbirter.checkBounds() || this.orbirter.checkCollision(this.targetPlanet)){
                this.gameRuningFlag = false
                //this.orbiter.explode() UNIMPLEMENTED
                this.add.text(game.config.width/2, game.config.height/2,'GAME OVER', this.textConfig).setOrigin(0.5);

                //When game ends jump to End Screen after 2 seconds
                this.clock = this.time.delayedCall(2000,()=>{this.scene.start('endScene')},null,this);
            } 

        }        
        else{//if game ends go space to go to menu
            if(Phaser.Input.Keyboard.JustDown(keySPACE)){
                this.scene.start('playScene');
            }
            if(Phaser.Input.Keyboard.JustDown(keyESC)){
                this.scene.start('endScene')
            }
        }


        //Runs the update method for the Black Hole and Black Hole Waves
        this.blackHoleWaves.update(1); // 1 represents Black Hole Waves
        this.blackHole.update(0); // 0 represents Black Hole



        //capture system
        //compares the current distance to the last distance
        //if lastDist is greater the ship is one tick past tangent with a potential orbit, which is close enough to tanget for visual purposes
        if(!this.orbirter.isOrbiting 
            && this.orbirter.checkDist(this.targetPlanet) > this.lastDist 
            && this.lastDist<this.targetPlanet.captureRange){
            
            // reset lastDist for next capture
            this.lastDist = 1000000; //just needs to be bigger thant the max screen width.
            //set the orbiter to orbiting the new planet
            this.orbirter.setOrbit(this.targetPlanet.x,this.targetPlanet.y);
            
            //Sets the blackHoleWaves back a certain distance once a new planet is being orbitted 
            this.blackHoleWaves.setSetBack(200);
            
            //reassign the planets
            this.deadPlanet.copyPlanet(this.orbitPlanet);
            this.orbitPlanet.copyPlanet(this.targetPlanet);

            //randomize target planet and place it off screen
            this.targetPlanet.randomize()
            this.targetPlanet.x = screenWidth + this.targetPlanet.radius;
            //update the bounding ring
            this.boundingRing.x = this.targetPlanet.x;
            this.boundingRing.y = this.targetPlanet.y;
            this.boundingRing.setSize(this.targetPlanet.captureRange);
            this.boundingRing.alpha -=0.05; // decrement the alpha of the ring

            //move everything to reset the world
            this.deadPlanet.setTranslate(-this.deadPlanet.radius,this.deadPlanet.y,2);  // magic numbers are to be replaced
            this.targetPlanet.setTranslate(this.targetPlanet.x-screenWidth/3,this.targetPlanet.y,2);                 // magic numbers are to be replaced
            this.orbitPlanet.setTranslate(this.orbitPlanet.x-screenWidth/3,this.orbitPlanet.y,2);                    // magic numbers are to be replaced
            this.orbirter.setTranslate(this.orbitPlanet.x-screenWidth/3,this.orbitPlanet.y,2);                                      // magic numbers are to be replaced
            this.boundingRing.setTranslate(this.targetPlanet.x-screenWidth/3,this.targetPlanet.y,2);                 // magic numbers need to be the same as target planet's
            
            
        }
        else{
            this.lastDist = this.orbirter.checkDist(this.targetPlanet);
        }
    }
}