//Play.js
//Creates and populates the main space of play

class Play extends Phaser.Scene {
    constructor() {
        super("playScene")
    }

    preload() {
        //loading assets
        this.load.image('orbiter','assets//background/ShipSample.png');
        this.load.image('testPlanert','assets/planet.png');
        this.load.image('blackHole', './assets/blackhole/blackHole.png');
        this.load.spritesheet('blackHoleWaves', './assets/blackhole/swarmAnim.png',{frameWidth: 1395, frameHeight: 1080, startFrame: 0, endFrame: 9});
        this.load.image('boundingRing','assets/planets/dottedRing.png');
        this.load.image('background','assets/background/BackgroundB1.png');
        this.load.image('menuBG', './assets/menu/menuBackground.png');
        this.load.image('menuBGStars', './assets/menu/menuBackgroundStars.png');
        this.load.image('stars','assets/background/BackgroundS2.png');
        this.load.atlas('planets','assets/planets/planets.png','assets/planets/planets.json');
    }

    create() {
        
        //black hole wibble animation
        this.anims.create({
            key: 'wibble',
            frames: this.anims.generateFrameNumbers('blackHoleWaves',{frames: [0,1,2,3,4,5,6,7,8,9]}),
            frameRate: 10,
            repeat: -1

        })

        //load background
        this.bg = this.add.tileSprite(0,0,screenWidth,screenHeight,'background').setOrigin(0,0);
        this.bgStars00 = this.add.tileSprite(0,0,screenWidth,screenHeight,'stars').setOrigin(0,0);
        this.bgStars01 = this.add.tileSprite(0,0,screenWidth,screenHeight,'menuBGStars').setOrigin(0,0).setScale(1.3);

        //Fades in the Scene
        this.cameras.main.fadeIn(250);

        //define Keys
        keySPACE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        keyESC = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ESC);

        //flags & vars
        this.gameRuningFlag = true;
        this.lastDist = screenHeight+screenWidth; // var should be bigger than screen at start, but doesn't need to be anything specific
        this.minSize = 100; //smallest randomly generated radious for planets
        gameScore = 0; //set the score to 0

        //text configuration
        this.textConfig = {
            fontFamily: 'Courier',
            fontSize: '100px',
            color: '#707081',
            backgroundColor: '#000000',
            align: 'center',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 0
        }
        //display the score in the top right corner
        this.scoreDisplay = this.add.text(screenWidth,0,'0',this.textConfig).setOrigin(1,0)
        this.textConfig.backgroundColor = null;
        this.instructions = this.add.text(screenWidth/2,0,'space to launch\naim for the circle',this.textConfig).setOrigin(0.5,0)

        //change textConfig for GAME OVER text
        this.textConfig.fontSize = '200px';



        //Black Hole Creation
        this.blackHoleWaves = new Blackhole(this,screenWidth/6, screenCenterY, 'blackHoleWaves').setScale(0.5); //blackHoleWaves are the waves that move and collide with the ship, the waves move up and down for visual sakes randomly
    
        //createing deadPlanet on top of the waves, but behind the main hole so it gets more propperly eaten
        this.deadPlanet = new Planet(this,-200,500,'testPlanert');        
        
        this.blackHole = new Blackhole(this, screenCenterX - 1150, screenCenterY, 'blackHole').setScale(1); //blackHole is the hole itself that rotates for visual sakes
        this.blackHoleWaves.setSpeed(0.2); //Sets the speed at which the Black Hole Waves advance
        this.blackHoleWaves.setOrigin(1,0.5);
        this.blackHoleWaves.play('wibble')
        //creating planets that go in fron of the block hole
        let tempString = 'Planet' + String(Math.floor(Math.random()*(22)+ 1))+'.png' //generate random call for a planet
        this.targetPlanet = new Planet(this,5*screenWidth/6,screenHeight/2,'planets',tempString);
        tempString = 'Planet' + String(Math.floor(Math.random()*(22)+ 1))+'.png'
        this.orbitPlanet = new Planet(this,screenWidth/2,screenHeight/2,'planets',tempString);
        this.boundingRing = new Planet(this,5*screenWidth/6,screenHeight/2,'boundingRing');
        this.boundingRing.tint = 0xFFFFFF;

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
    
    }

    update(){
        //update the orbiter]
        if(this.gameRuningFlag){
            
            this.orbirter.update();
            if(!this.orbirter.isOrbiting){
                this.instructions.destroy();
            }

            //check if the game should end
            if(this.orbirter.checkBounds() || this.orbirter.checkCollision(this.targetPlanet) || this.blackHoleWaves.getCollision()){
                this.gameRuningFlag = false
                //this.orbiter.explode() UNIMPLEMENTED
                this.add.text(game.config.width/2, game.config.height/2,'GAME OVER', this.textConfig).setOrigin(0.5);

                this.textConfig.fontSize = "100px";
                this.add.text(screenWidth/2,screenHeight,"space to replay",this.textConfig).setOrigin(0.5,1)
                //update highscore if necessasary
                if(gameScore>highScore){
                    highScore = gameScore;
                }

                //When game ends jump to End Screen after 2 seconds
                this.clock = this.time.delayedCall(1500,()=>{this.scene.start('endScene')},null,this);
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

        if(this.blackHoleWaves.x > this.orbirter.x){
            this.blackHoleWaves.setCollision(true);
        }

        //capture system
        //compares the current distance to the last distance
        //if lastDist is greater the ship is one tick past tangent with a potential orbit, which is close enough to tanget for visual purposes
        if(!this.orbirter.isOrbiting 
            && this.orbirter.checkDist(this.targetPlanet) > this.lastDist 
            && this.lastDist<this.targetPlanet.captureRange){
            
            // reset lastDist for next capture
            this.lastDist = screenWidth+screenHeight; //mostly just needs to be big
            //set the orbiter to orbiting the new planet
            this.orbirter.setOrbit(this.targetPlanet.x,this.targetPlanet.y);
            
            //Sets the blackHoleWaves back a certain distance once a new planet is being orbitted 
            this.blackHoleWaves.setSetBack(200);
            this.blackHoleWaves.setTranslate(screenWidth/12);
            
            //reassign the planets
            this.deadPlanet.copyPlanet(this.orbitPlanet);
            this.orbitPlanet.copyPlanet(this.targetPlanet);

            //randomize target planet and place it off screen
            //randomize texture
            let planNum = Math.floor(Math.random()*(22)+ 1) //22 is number of planets, list must index from 1
            let tempString = 'Planet' + String(planNum)+'.png'
            this.tempPlanet = new Planet(this,500,400,'planets',tempString)
            this.targetPlanet.setTexture(this.tempPlanet.texture);
            this.targetPlanet.frame = this.tempPlanet.frame;
            this.tempPlanet.destroy();

            this.targetPlanet.randomize(this.minSize)
            this.targetPlanet.x = screenWidth + this.targetPlanet.radius;
            //update the bounding ring
            this.boundingRing.x = this.targetPlanet.x;
            this.boundingRing.y = this.targetPlanet.y;
            this.boundingRing.setSize(this.targetPlanet.captureRange);
            this.boundingRing.alpha -=ringFade; // decrement the alpha of the ring for difficulty scaling

            //move everything to reset the world
            this.deadPlanet.setTranslate(-this.deadPlanet.radius,this.deadPlanet.y,2);  // magic numbers are to be replaced
            this.targetPlanet.setTranslate(this.targetPlanet.x-screenWidth/3,this.targetPlanet.y,2);                 // magic numbers are to be replaced
            this.orbitPlanet.setTranslate(this.orbitPlanet.x-screenWidth/3,this.orbitPlanet.y,2);                    // magic numbers are to be replaced
            this.orbirter.setTranslate(this.orbitPlanet.x-screenWidth/3,this.orbitPlanet.y,2);                                      // magic numbers are to be replaced
            this.boundingRing.setTranslate(this.targetPlanet.x-screenWidth/3,this.targetPlanet.y,2);                 // magic numbers need to be the same as target planet's
            
            //increment socre and decrement min size of planets
            gameScore +=1;
            this.scoreDisplay.text = String(gameScore);
            if(this.minSize>minPlanet){
                this.minSize -= planetDecrement;
                console.log(this.minSize)
            }

            //move the starfield background
            this.tweens.add({
                targets: this.bgStars00,
                tilePositionX: {from: this.bgStars00.tilePositionX, to: this.bgStars00.tilePositionX + screenWidth/6},
                ease:'Quad',
                duration: 2000,
            });   
            this.tweens.add({
                targets: this.bgStars01,
                tilePositionX: {from: this.bgStars01.tilePositionX, to: this.bgStars01.tilePositionX + screenWidth/12},
                ease:'Quad',
                duration: 2000,
            });            
        }//end capture actions
        else{//set lastdist if no captue happens
            this.lastDist = this.orbirter.checkDist(this.targetPlanet);
        }
    }
}