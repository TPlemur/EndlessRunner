//Play.js
//Creates and populates the main space of play

class Play extends Phaser.Scene {
    constructor() {
        super("playScene")
    }

    preload() {
        //loading assets
        this.load.image('orbiter', 'assets/newShip.png');
        this.load.image('blackHole', './assets/blackhole/blackHole.png');
        this.load.spritesheet('blackHoleWaves', './assets/blackhole/newSwarmSpriteSheet.png', { frameWidth: 1439, frameHeight: 1080, startFrame: 0, endFrame: 9 });
        this.load.image('boundingRing', 'assets/planets/dottedRing.png');
        this.load.image('background', 'assets/background/BackgroundB1.png');
        this.load.image('menuBG', './assets/menu/menuBackground.png');
        this.load.image('menuBGStars', './assets/menu/menuBackgroundStars.png');
        this.load.image('stars', 'assets/background/BackgroundS2.png');
        this.load.atlas('planets', 'assets/planets/planets.png', 'assets/planets/planets.json');
        this.load.image('cursorParticles', './assets/menu/cursorParticles.png');

        //audio
        this.load.audio('bgm', 'assets/planets/background.mp3');
        this.load.audio('success', 'assets/planets/success.wav');
        this.load.audio('crash', 'assets/planets/crash.wav');
        this.load.audio('launch', 'assets/launch.wav');
    }

    create() {

        //black hole wibble animation
        this.anims.create({
            key: 'wibble',
            frames: this.anims.generateFrameNumbers('blackHoleWaves', { frames: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9] }),
            frameRate: 10,
            repeat: -1
        })

        //load background
        this.bg = this.add.sprite(0, 0, 'background').setOrigin(0, 0);
        this.bgStars00 = this.add.tileSprite(0, 0, screenWidth, screenHeight, 'stars').setOrigin(0, 0);
        this.bgStars01 = this.add.tileSprite(0, 0, screenWidth, screenHeight, 'menuBGStars').setOrigin(0, 0).setScale(1.3);

        //load music
        this.playBGMusic = this.sound.add('bgm');
        var musicConfig = {
            volume: musicVolume,
            loop: true,
        }
        this.playBGMusic.play(musicConfig);

        //sound effects
        this.crashSound = this.sound.add('crash');
        this.successSound = this.sound.add('success');
        this.launchSound = this.sound.add('launch');
        this.sfxConfig = {
            volume: sfxVolume,
            loop: false,
        }
        //Makes launch sound louder
        this.flameConfig = {
            volume: sfxVolume * 2,
            loop: false,
        }

        //Fades in the Scene
        this.cameras.main.fadeIn(250);

        //define Keys
        keySPACE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        keyESC = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ESC);

        //flags & vars
        this.gameRuningFlag = true;
        this.lastDist = screenHeight + screenWidth; // var should be bigger than screen at start, but doesn't need to be anything specific
        this.minSize = 100; //smallest randomly generated radious for planets
        gameScore = 0; //set the score to 0
        globalSpeed = 1;//reset the global speed

        //Black Hole Creation
        this.holeChaser = this.add.rectangle(0, 0, screenWidth, screenHeight, 0x703004).setOrigin(1, 0);
        this.blackHoleWaves = new Blackhole(this, screenWidth / 1.4, screenCenterY, 'blackHoleWaves').setScale(0.5); //blackHoleWaves are the waves that move and collide with the ship, the waves move up and down for visual sakes randomly
        this.blackHoleWaves.setOrigin(1, 0.5);
        this.blackHoleWaves.play('wibble');
        this.blackHole = new Blackhole(this, screenCenterX - 1150, screenCenterY, 'blackHole').setScale(1); //blackHole is the hole itself that rotates for visual sakes

        //creating planets that go in fron of the block hole
        this.deadPlanet = new Planet(this, -200, 500, 'boundingRing');
        
        let tempString = 'Planet' + String(Math.floor(Math.random() * (22) + 1)) + '.png' //generate random call for a planet
        this.targetPlanet = new Planet(this, 5 * screenWidth / 6, screenHeight / 2, 'planets', tempString);
        
        tempString = 'Planet' + String(Math.floor(Math.random() * (22) + 1)) + '.png'
        this.orbitPlanet = new Planet(this, screenWidth / 2, screenHeight / 2, 'planets', tempString);
        
        this.boundingRing = new Planet(this, 5 * screenWidth / 6, screenHeight / 2, 'boundingRing');
        this.boundingRing.tint = 0xFFFFFF;

        //setting size of new planets
        this.targetPlanet.setSize(100);
        this.orbitPlanet.setSize(100);
        this.deadPlanet.setSize(100);
        this.boundingRing.setSize(this.targetPlanet.captureRange);

        //place orbiter in the starting location
        this.orbirter = new Orbiter(this,
            screenWidth / 2, screenHeight / 2, screenWidth / 2, screenHeight / 2, //placed at origin of orbit
            this.targetPlanet.captureRange, 0, //radious, angle
            'orbiter', keySPACE
        )

        //scale up orbiter by magic numbers can changed for final asset
        this.orbirter.displayWidth = 30;
        this.orbirter.displayHeight = 30;

        //scale up black hole waves by a magic number
        this.blackHoleWaves.displayWidth = screenWidth;
        this.blackHoleWaves.displayHeight = screenHeight * 1.5;
        this.blackHoleWaves.alpha = 1;

        //Flames out the back of the ship when launching
        this.flameSoundLock = false;
        this.flameEmitter = this.add.particles('cursorParticles').createEmitter({
            speed: 10,
            scale: {start: 0, end: 0.5},
            alpha: { start: 1, end: 0, ease: 'Expo.easeOut' },
            blendMode: 'ADD',
            lifespan: 200
        });
        this.flameEmitter.startFollow(this.orbirter);

        //text configuration
        this.textConfig = {
            fontFamily: font,
            fontSize: '100px',
            color: fontColor,
            backgroundColor: '#000000',
            align: 'center',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 0
        }
        //display the score in the top right corner
        this.scoreDisplay = this.add.text(screenWidth, 0, '0', this.textConfig).setOrigin(1, 0)
        this.textConfig.backgroundColor = null;
        this.instructions = this.add.text(screenWidth / 2, 0, 'space or click to launch\naim for the circle\navoid hitting the planet directly', this.textConfig).setOrigin(0.5, 0)

        //change textConfig for GAME OVER text
        this.textConfig.fontSize = '200px';

        //initialize planets to rotate in different directions
        this.orbitPlanet.rotDir = -1;
    }

    update() {
        this.flameEmitter.startFollow(this.orbirter);

        //rotate the things
        this.deadPlanet.angle -= 0.1*this.deadPlanet.rotDir
        this.targetPlanet.angle -= 0.1*this.targetPlanet.rotDir
        this.orbitPlanet.angle -= 0.1*this.orbitPlanet.rotDir
        this.boundingRing.angle += 0.1;

        //animate the black hole
        this.blackHoleWaves.update(1); // 1 represents Black Hole Waves
        this.blackHole.update(0); // 0 represents Black Hole
        this.holeChaser.x = this.blackHoleWaves.x - this.blackHoleWaves.width * 1.3;

        //gameState dependant updates
        if (this.gameRuningFlag) {

            //used to prevent page reloading
            mouseBool = true;
            //run the orbiter
            this.orbirter.update();
            this.input.on('pointerdown',() => {this.orbirter.isOrbiting = false});//click to shoot
            //remove the instruction text after the first launch
            if (!this.orbirter.isOrbiting) {
                this.instructions.destroy();
            }
            //check if the game should end
            this.checkDeath();

        }
        else {//enable quick restart on game end
            if (Phaser.Input.Keyboard.JustDown(keySPACE)) {
                this.playBGMusic.stop();
                this.scene.start('playScene');
            }
            //click to restart
            this.input.on('pointerdown', () => {
                if(mouseBool){
                    this.playBGMusic.stop();
                    mouseBool = false; //stops this code from being run as the scene is reloaded
                    this.scene.start('playScene');
                }
            });
        }

        //Flames out the back of the ship
        if(this.orbirter.isOrbiting == false) {
            this.time.addEvent({
                delay: 20,
                callback: ()=>{
                    this.flameEmitter.setAlpha(1);
                    this.flameEmitter.setSpeed(20);
                    if(this.flameSoundLock == false) {
                        this.launchSound.play(this.flameConfig);
                        this.flameSoundLock = true;
                    }
                },
            })
            
        }
        else {
            this.flameEmitter.setAlpha(0);
            this.flameEmitter.setSpeed(0);
            this.flameSoundLock = false;

        }

        //quickskip to endScene
        if (Phaser.Input.Keyboard.JustDown(keyESC)) {
            this.scene.start('endScene');
            this.playBGMusic.stop();
            this.crashSound.play(this.sfxConfig);
        }

        //check if a capture is necessasary and execute it if it is
        if (!this.orbirter.isOrbiting
            && this.orbirter.checkDist(this.targetPlanet) > this.lastDist
            && this.lastDist < this.targetPlanet.captureRange) {
                this.capture();
        }
        else {//update lastdist if no captue happens
            this.lastDist = this.orbirter.checkDist(this.targetPlanet);
        }

    }//end update()

    //checks if the game should end and executes the approprate ending
    checkDeath(){
        //check collision with the black hole
         if (this.blackHoleWaves.x > this.orbirter.x + screenWidth / 1.6) { //1.6 is a magic number based on what looks good for where the player dies
            this.blackHoleWaves.collided = true;
            causeOfDeath = 'Sucked into a black hole'
        
            //suck the orbiter into the black hole
           this.blackHole.consume(this.orbirter)
        }
        //die if necessasary
        if (this.orbirter.checkSafe(this.targetPlanet) || this.blackHoleWaves.collided) {
            //stop music
            this.playBGMusic.stop();
            //play crash audio
            this.crashSound.play(this.sfxConfig);

            this.gameRuningFlag = false
            this.add.text(game.config.width / 2, game.config.height / 2, 'GAME OVER', this.textConfig).setOrigin(0.5);

            this.textConfig.fontSize = "100px";
            this.add.text(screenWidth / 2, screenHeight - 20, "click or space to replay", this.textConfig).setOrigin(0.5, 1)
            //update highscore if necessasary
            if (gameScore >= highScore) {
                highScore = gameScore;
            }
            

            //When game ends jump to End Screen after 2 seconds
            this.clock = this.time.delayedCall(1500, () => { this.scene.start('endScene') }, null, this);
        }
    }

    //executes capturing of orbiter to new planet
    capture(){ 

        //accelerate the game
        globalSpeed += gameAcceleration;

        //play success audio
        this.successSound.play(this.sfxConfig);

        // reset lastDist for next capture
        this.lastDist = screenWidth + screenHeight; //mostly just needs to be big
        
        //set the orbiter to orbiting the new planet
        this.orbirter.setOrbit(this.targetPlanet.x, this.targetPlanet.y);

        //Sets the blackHoleWaves back a certain distance once a new planet is being orbitted 
        this.blackHoleWaves.setTranslate(this.blackHoleWaves.x - screenWidth / 12);

        //reassign the planets
        this.deadPlanet.copyPlanet(this.orbitPlanet);
        this.orbitPlanet.copyPlanet(this.targetPlanet);

        //randomize target planet and place it off screen
        this.targetPlanet.randomize(this.minSize);

        //update the bounding ring
        this.boundingRing.x = this.targetPlanet.x;
        this.boundingRing.y = this.targetPlanet.y;
        this.boundingRing.setSize(this.targetPlanet.captureRange);
        this.boundingRing.alpha -= ringFade; // decrement the alpha of the ring for difficulty scaling

        //increment socre and decrement min size of planets
        gameScore += 1;
        this.scoreDisplay.text = String(gameScore);
        if (this.minSize > minPlanet) {
            this.minSize -= planetDecrement;
        }

        //move everything to reset the world
        this.targetPlanet.setTranslate(this.targetPlanet.x - screenWidth / 3, this.targetPlanet.y, tweenspeed);
        this.orbitPlanet.setTranslate(this.orbitPlanet.x - screenWidth / 3, this.orbitPlanet.y, tweenspeed);
        this.orbirter.setTranslate(this.orbitPlanet.x - screenWidth / 3, this.orbitPlanet.y, tweenspeed);
        this.boundingRing.setTranslate(this.targetPlanet.x - screenWidth / 3, this.targetPlanet.y, tweenspeed);
        this.blackHole.consume(this.deadPlanet);
        //paralax the starfield background
        this.tweens.add({
            targets: this.bgStars00,
            tilePositionX: { from: this.bgStars00.tilePositionX, to: this.bgStars00.tilePositionX + screenWidth / 6 },
            ease: 'Quad',
            duration: 1000*tweenspeed,
        });
        this.tweens.add({
            targets: this.bgStars01,
            tilePositionX: { from: this.bgStars01.tilePositionX, to: this.bgStars01.tilePositionX + screenWidth / 12 },
            ease: 'Quad',
            duration: 1000*tweenspeed,
        });
    }//end capture()



}