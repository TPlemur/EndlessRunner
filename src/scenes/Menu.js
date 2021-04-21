//Menu.js

class Menu extends Phaser.Scene{
    constructor(){
        super("menuScene");
    }

    preload(){
        //load things here
        this.load.image('menuBG', './assets/menuBackground.png');
        this.load.image('launchButton', './assets/menuLaunchButton.png');
        this.load.image('rocketParticle', './assets/rocketParticle.png');
        this.load.image('menuBGStars', './assets/menuBackgroundStars.png');
        this.load.audio('launchButtonSound', './assets/menuLaunchButtonSound.wav'); //Temporarily Adding Source Here: https://freesound.org/people/pan14/sounds/263129/
    }

    create(){
        //Set background that is tileable
        this.menuBackground = this.add.tileSprite(0, 0, game.config.width, game.config.height, "menuBG").setOrigin(0,0).setScrollFactor(0);
        this.menuBackgroundStars = this.add.tileSprite(0, 0, game.config.width, game.config.height, "menuBGStars").setOrigin(0,0).setScrollFactor(0);

        //Initialize Particles and Emitter
        this.rocketParticles = this.add.particles('rocketParticle').setScale(1);
        this.emitter = this.rocketParticles.createEmitter().setPosition(-1000,0);
        
        //Buttons
        this.launchBtn = this.add.sprite(screenCenterX, screenCenterY + 250, 'launchButton').setInteractive().setScale(2); //Initialize the button
        this.launchBtn.on('pointerover', () => this.actionOnHover(this.launchBtn, this.emitter)); //What happens when you hover over
        this.launchBtn.on('pointerout', () => this.actionOnHoverOut(this.launchBtn, this.emitter)); //What happens when you hover out
        this.launchBtn.on('pointerdown', () => this.actionOnClick(this)); //What happens when you click
        
    }

    update(){

        //Adds Parallax Effect, /20 is to slow down the amount the background moves
        this.menuBackground.tilePositionX = this.game.input.mousePointer.x / 20;
        this.menuBackground.tilePositionY = this.game.input.mousePointer.y / 20;
        this.menuBackgroundStars.tilePositionX = this.game.input.mousePointer.x / 35;
        this.menuBackgroundStars.tilePositionY = this.game.input.mousePointer.y / 35;
    }

    actionOnClick(menuScene){
        //Plays Sound effect and changes Scene to Play.js
        menuScene.sound.play('launchButtonSound');
        menuScene.scene.start("playScene");   
    }

    actionOnHover(button, emitter){
        //Start Particles
        emitter.setPosition(button.x, button.y);
        emitter.setBlendMode(Phaser.BlendModes.ADD);  
        emitter.setSpeed(190).setScale(0.1).setLifespan(1100);
         
        //Scale Button
        button.setScale(1.8); 
    }

    actionOnHoverOut(button, emitter){
        //Stop Particles
        emitter.setPosition(button.x, button.y).setSpeed(0); 

        //Scale Button
        button.setScale(2);
    }
}