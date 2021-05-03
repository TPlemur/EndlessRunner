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
            this.load.image('thomas', './assets/credits/thomas.png');
            this.load.image('danny', './assets/credits/danny.png');
            this.load.image('jacqueline', './assets/credits/jacqueline.png');
            this.load.image('quinn', './assets/credits/quinn.png');
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

        //Text configuration
        this.textConfig = {
            fontFamily: font,
            fontSize: '80px',
            color: fontColor,
            backgroundColor: null,
            align: 'center',
            padding: {
                top: 10,
                bottom: 10,
            },
            fixedWidth: 0
        }


        this.menuBackground = this.add.tileSprite(0, 0, game.config.width, game.config.height, "menuBG").setOrigin(0,0).setScrollFactor(0);
        this.menuBackgroundStars = this.add.tileSprite(0, 0, game.config.width, game.config.height, "menuBGStars").setOrigin(0,0).setScrollFactor(0);

        //Main text
        this.peopleHeading = this.add.text(screenCenterX, screenCenterY - screenHeight, "A Game By:", this.textConfig).setOrigin(0.5,0);
        this.assetHeading  = this.add.text(screenCenterX, screenCenterY + screenHeight, "Assets and Libraries:", this.textConfig).setOrigin(0.5,0);
        this.textConfig.fontSize = '45px'
        this.assets = this.add.text(screenCenterX, screenCenterY + screenHeight, "Created on Phaser 3.54.0 Game Engine\n\nMenu Music: https://freesound.org/people/szegvari/sounds/560736/\nPlay Music: https://www.bensound.com/royalty-free-music/track/sci-fi\nButton Sound: https://freesound.org/people/pan14/sounds/263129/\nLaunch Noise: https://freesound.org/people/MATRIXXX_/sounds/444855/\nCrash Sound: https://freesound.org/people/soneproject/sounds/346425/\nSuccessSound: https://freesound.org/people/soneproject/sounds/345271/\nShip Launch Sound: https://freesound.org/people/jorgerosa/sounds/458669/\nFont: https://www.dafont.com/futured.font\n", this.textConfig).setOrigin(0.5,0);


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
        //Our names in credits
        this.thomas = this.add.sprite(screenCenterX - screenWidth, screenCenterY - 380, 'thomas').setScale(1);
        this.danny = this.add.sprite(screenCenterX + screenWidth, screenCenterY - 300, 'danny').setScale(1);
        this.jacqueline = this.add.sprite(screenCenterX - screenWidth, screenCenterY - 220, 'jacqueline').setScale(1);
        this.quinn = this.add.sprite(screenCenterX + screenWidth, screenCenterY - 140, 'quinn').setScale(1);
    }

    update(){
        //Moving the text
        if(this.peopleHeading.y < 30) {
            this.peopleHeading.y += 25;
        }
        else{
            if(this.thomas.x < screenCenterX){
                this.thomas.x += 25;
                this.jacqueline.x += 25;
            }
            if(this.danny.x > screenCenterX) {
             this.danny.x -= 25;
             this.quinn.x -= 25;
            }
            else if(this.assetHeading.y > screenCenterY - 50) {
             this.assetHeading.y -= 25;
            }
            else if(this.assets.y > screenCenterY + 20) {
                this.assets.y -= 25;
            }
        }
        //Update Mouse flame location
        this.mouseFlameEmitter.setPosition(this.game.input.mousePointer.x + 23, this.game.input.mousePointer.y + 20);
                
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