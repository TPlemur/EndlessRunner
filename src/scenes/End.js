//End.js
//End Screen

class End extends Phaser.Scene {
    constructor(){
        super("endScene")
    }

    preload(){
        this.load.image('menuBG', './assets/menu/menuBackground.png');
        this.load.image('menuBGStars', './assets/menu/menuBackgroundStars.png');
        this.load.image('cursorParticles', './assets/menu/cursorParticles.png');
        this.load.image('extraHole','assets/blackhole/newBlackHole.png')
        this.load.image('playButton', './assets/buttons/Replay.png');
        this.load.image('menuButton', './assets/buttons/Menu.png');

    }

    create(){
        //Fades in the Scene
        this.cameras.main.fadeIn(500);
        
        this.menuBackground = this.add.tileSprite(0, 0, game.config.width, game.config.height, "menuBG").setOrigin(0,0).setScrollFactor(0);
        this.menuBackgroundStars = this.add.tileSprite(0, 0, game.config.width, game.config.height, "menuBGStars").setOrigin(0,0).setScrollFactor(0);

        

        //define Keys (potentialy temparary) used for navigation
        keySPACE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        keyESC = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ESC);
        
        
        this.cdBLACK = false;
        this.cdSPACE = false;
        this.cdPLAN = false;
        //display fancy things
        if(causeOfDeath === 'Sucked into a black hole' ){
            this.blackHole = new Blackhole(this, screenWidth/2, screenHeight/2, 'extraHole').setScale(1);
            this.cdBLACK = true;
        }
        else if(causeOfDeath === 'Drifting endlessly in space'){
            this.orbirter = new Orbiter(this,
                screenWidth/2,screenHeight/2,screenWidth/2,screenHeight/2, //placed at origin of orbit
                0,0, //radious, angle
                'orbiter',keySPACE
            )
            this.cdSPACE = true;
        }
        else{
            let tempString = 'Planet' + String(Math.floor(Math.random()*(22)+ 1))+'.png' //generate random call for a planet
            this.endPlanet = new Planet(this,screenWidth/2,screenHeight/2,'planets',tempString); 
            this.cdPLAN = true;
        }

        //Create a particle emitter to shoot flames out of the mouse
        this.mouseFlameEmitter = this.add.particles('cursorParticles').createEmitter({
            x: -3000,
            y: -3000,
            speed: { min: -100, max: 100 },
            angle: { min: 360, max: 360 },
            scale: { start: 0, end: 0.4 },
            alpha: { start: 1, end: 0, ease: 'Expo.easeIn' },
            blendMode: 'SCREEN',
            gravityY: 500,
            lifespan: 900
        });

        //text configuration
        this.textConfig = {
            fontFamily: font,
            fontSize: '200px',
            color: fontColor,
            backgroundColor: null,
            align: 'right',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 0
        }

        this.add.text(screenWidth/2,screenHeight/2,"Score:" + gameScore,this.textConfig).setOrigin(0.5,1)
        this.add.text(screenWidth/2,screenHeight/2,"High Score:" + highScore,this.textConfig).setOrigin(0.5,0)

        this.textConfig.fontSize = '100px';
        this.add.text(screenWidth/2,screenHeight - 20,'space to replay, esc for menu',this.textConfig).setOrigin(0.5,1)
        this.add.text(screenWidth/2,0, causeOfDeath ,this.textConfig).setOrigin(0.5,0);

        //Menu and Play Button
        this.buttonSound = this.sound.add('launchButtonSound');
        this.sfxConfig ={
            volume: sfxVolume,
            loop: false,
        }

        this.playBtn = this.add.sprite(screenCenterX + 375, screenCenterY + 300, 'playButton').setInteractive().setScale(0.6); //Initialize the button
        this.playBtn.on('pointerover', this.actionOnHover); //What happens when you hover over
        this.playBtn.on('pointerout', this.actionOnHoverOut); //What happens when you hover out
        this.playBtn.on('pointerdown', () => this.actionOnClick(this, this.sfxConfig, this.playBtn)); //What happens when you click   

        this.menuBtn = this.add.sprite(screenCenterX - 375, screenCenterY + 300, 'menuButton').setInteractive().setScale(0.6); //Initialize the button
        this.menuBtn.on('pointerover', this.actionOnHover); //What happens when you hover over
        this.menuBtn.on('pointerout', this.actionOnHoverOut); //What happens when you hover out
        this.menuBtn.on('pointerdown', () => this.actionOnClick(this, this.sfxConfig, this.menuBtn)); //What happens when you click   
    }

    update(){
        //Update Mouse flame location
        this.mouseFlameEmitter.setPosition(this.game.input.mousePointer.x + 23, this.game.input.mousePointer.y + 20);
        
        //if the pointer is too close to the edge move the particles way out of sight
        if(this.game.input.mousePointer.x<5||this.game.input.mousePointer.y<3){
            this.mouseFlameEmitter.setPosition(-100,-100);
        }
        

        this.parallaxBackground();

        //potentialy temparary navigation back to menu
        if(Phaser.Input.Keyboard.JustDown(keySPACE)){
            this.scene.start('playScene');
        }
        if(Phaser.Input.Keyboard.JustDown(keyESC)){
            this.scene.start('menuScene')
        }

        //rotate end screen object
        if(this.cdBLACK){
        this.blackHole.update(0);
        }
        if(this.cdSPACE){
            this.orbirter.angle += 0.5;
        }
        if(this.cdPLAN){
            this.endPlanet.angle += 0.5;
        }

    }

    parallaxBackground(){
        this.menuBackground.tilePositionX = this.game.input.mousePointer.x / 20;
        this.menuBackground.tilePositionY = this.game.input.mousePointer.y / 20;
        this.menuBackgroundStars.tilePositionX = 300 + this.game.input.mousePointer.x / 35;
        this.menuBackgroundStars.tilePositionY = 300 + this.game.input.mousePointer.y / 35;
    }

    actionOnClick(Scene, sfxConfig, button){
        //Plays Sound effect and go to menu
        this.buttonSound.play(sfxConfig);

        if(button == this.playBtn){
            Scene.scene.start("playScene");
        } 
        else if(button == this.menuBtn){
            Scene.scene.start("menuScene");
        } 
    }

    actionOnHover(){
        //Scale Button
        this.setScale(0.5); 
    }

    actionOnHoverOut(){
        //Scale Button
        this.setScale(0.6);
    }
}