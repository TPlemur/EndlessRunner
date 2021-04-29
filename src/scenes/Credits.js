//Credits.js
//Credit Screen

class Credits extends Phaser.Scene {
    constructor(){
        super("creditsScene")
    }

    preload(){
        this.load.image('menuBG', './assets/menu/menuBackground.png');
        this.load.image('menuBGStars', './assets/menu/menuBackgroundStars.png');
        this.load.image('backButton', './assets/buttons/Back.png');
        }

    create(){
        //Fades in the Scene
        this.cameras.main.fadeIn(500);

        //Initialize SFX Sounds
        this.buttonSound = this.sound.add('launchButtonSound');
        this.sfxConfig ={
            volume: sfxVolume,
            loop: false,
        }

        this.menuBackground = this.add.tileSprite(0, 0, game.config.width, game.config.height, "menuBG").setOrigin(0,0).setScrollFactor(0);
        this.menuBackgroundStars = this.add.tileSprite(0, 0, game.config.width, game.config.height, "menuBGStars").setOrigin(0,0).setScrollFactor(0);

        this.backBtn = this.add.sprite(screenCenterX, screenCenterY + 450, 'backButton').setInteractive().setScale(0.5); //Initialize the button
        this.backBtn.on('pointerover', this.actionOnHover); //What happens when you hover over
        this.backBtn.on('pointerout', this.actionOnHoverOut); //What happens when you hover out
        this.backBtn.on('pointerdown', () => this.actionOnClick(this, this.sfxConfig)); //What happens when you click   

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
    }

    update(){
        //Update Mouse flame location
        this.mouseFlameEmitter.setPosition(this.game.input.mousePointer.x + 40, this.game.input.mousePointer.y + 30);
        
        //if the pointer is too close to the edge move the particles way out of sight
        if(this.game.input.mousePointer.x<5||this.game.input.mousePointer.y<3){
            this.mouseFlameEmitter.setPosition(-100,-100);
        }

        this.parallaxBackground();
    }

    parallaxBackground(){
        this.menuBackground.tilePositionX = this.game.input.mousePointer.x / 20;
        this.menuBackground.tilePositionY = this.game.input.mousePointer.y / 20;
        this.menuBackgroundStars.tilePositionX = this.game.input.mousePointer.x / 35;
        this.menuBackgroundStars.tilePositionY = this.game.input.mousePointer.y / 35;
    }

    actionOnClick(creditsScene, sfxConfig){
        //Plays Sound effect and go to menu
        this.buttonSound.play(sfxConfig);

        creditsScene.scene.start("menuScene"); 
    }

    actionOnHover(){
        //Scale Button
        this.setScale(0.4); 
    }

    actionOnHoverOut(){
        //Scale Button
        this.setScale(0.5);
    }

}