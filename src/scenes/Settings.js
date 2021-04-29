//Settings.js
//Setting Screen

class Settings extends Phaser.Scene {
    constructor(){
        super("settingsScene")
    }

    preload(){
        this.load.image('menuBG', './assets/menu/menuBackground.png');
        this.load.image('menuBGStars', './assets/menu/menuBackgroundStars.png');
        this.load.image('backButton', './assets/menu/creditsBackButton.png');
        this.load.image('developer', './assets/menu/developerButton.png');
        this.load.image('easy', './assets/menu/easyButton.png');
        this.load.image('medium', './assets/menu/mediumButton.png');
        this.load.image('impossible', './assets/menu/hardButton.png');
        this.load.image('plus', './assets/menu/plus.png');
        this.load.image('minus', './assets/menu/minus.png');

        this.load.audio('click', './assets/menu/operationClick.wav'); //Temporarily adding source here: https://freesound.org/people/JonnyRuss01/sounds/478197/
    }

    create(){
        this.whichButton = 1; //0 = Easy, 1 = Medium, 2 = Hard
        //Fades in the Scene
        this.cameras.main.fadeIn(500);

        this.menuBackground = this.add.tileSprite(0, 0, game.config.width, game.config.height, "menuBG").setOrigin(0,0).setScrollFactor(0);
        this.menuBackgroundStars = this.add.tileSprite(0, 0, game.config.width, game.config.height, "menuBGStars").setOrigin(0,0).setScrollFactor(0);

        //Initialize SFX Sounds
        this.buttonSound = this.sound.add('launchButtonSound');
        this.clickSound = this.sound.add('click');
        this.sfxConfig ={
            volume: sfxVolume,
            loop: false,
        }

        this.backBtn = this.add.sprite(screenCenterX, screenCenterY + 400, 'backButton').setInteractive().setScale(2); //Initialize the button
        this.button(this.backBtn, this, null, this.sfxConfig);


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

        //Text configuration
        this.textConfig = {
            fontFamily: 'Courier',
            fontSize: '80px',
            color: '#707081',
            backgroundColor: null,
            align: 'center',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 0
        }

        //Increment Buttons and add text
        this.easy = this.add.sprite(screenCenterX - 200, screenCenterY - 350, 'easy').setInteractive().setScale(2).setOrigin(0.5,0.5);
        this.medium = this.add.sprite(screenCenterX, screenCenterY - 350, 'medium').setInteractive().setScale(2).setOrigin(0.5,0.5);
        this.medium.setTint(169,166,166); //Start game with medium settings
        this.impossible = this.add.sprite(screenCenterX + 200, screenCenterY - 350, 'impossible').setInteractive().setScale(2).setOrigin(0.5,0.5);
        this.difficultyText = this.add.text(screenCenterX, screenCenterY - 450, "Difficulty Selection", this.textConfig).setOrigin(0.5,0.5);
        this.button(this.easy, this, null, this.sfxConfig);
        this.button(this.medium, this, null, this.sfxConfig);
        this.button(this.impossible, this, null, this.sfxConfig);

        this.bgVolumeMinus = this.add.sprite(screenCenterX - 200, screenCenterY - 100, 'minus').setInteractive().setScale(0.05);
        this.bgVolumePlus = this.add.sprite(screenCenterX + 200, screenCenterY - 100, 'plus').setInteractive().setScale(0.05);
        this.bgVolumeText = this.add.text(screenCenterX, screenCenterY - 200, "Background Music", this.textConfig).setOrigin(0.5,0.5)
        this.bgVolumeDisplay = this.add.text(screenCenterX, screenCenterY - 100, Math.round(musicVolume * 10), this.textConfig).setOrigin(0.5,0.5)
        this.button(this.bgVolumeMinus, this, this.bgVolumeDisplay, this.sfxConfig);
        this.button(this.bgVolumePlus, this, this.bgVolumeDisplay, this.sfxConfig);

        this.sfxVolumeMinus = this.add.sprite(screenCenterX - 200, screenCenterY + 120, 'minus').setInteractive().setScale(0.05);
        this.sfxVolumePlus = this.add.sprite(screenCenterX + 200, screenCenterY + 120, 'plus').setInteractive().setScale(0.05);
        this.sfxVolumeText = this.add.text(screenCenterX, screenCenterY + 20, "SFX Volume", this.textConfig).setOrigin(0.5,0.5)
        this.sfxVolumeDisplay = this.add.text(screenCenterX, screenCenterY + 120, Math.round(sfxVolume * 10), this.textConfig).setOrigin(0.5,0.5)
        this.button(this.sfxVolumeMinus, this, this.sfxVolumeDisplay, this.sfxConfig);
        this.button(this.sfxVolumePlus, this, this.sfxVolumeDisplay, this.sfxConfig);

        this.developer = this.add.sprite(screenCenterX, screenCenterY + 250, 'developer').setInteractive().setScale(2).setOrigin(0.5,0.5);
        this.button(this.developer, this, null, this.sfxConfig);

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

    button(button, text, scene, sfxConfig){
        button.on('pointerover', () => this.actionOnHover(button)); //What happens when you hover over
        button.on('pointerout', () => this.actionOnHoverOut(button)); //What happens when you hover out
        button.on('pointerdown', () => this.actionOnClick(button, text, scene, sfxConfig)); //What happens when you click   
    }

    actionOnClick(button, settingScene, text, sfxConfig){
        //Plays Sound effect and go to menu
        if(button == this.backBtn){
            this.buttonSound.play(sfxConfig);
            settingScene.scene.start("menuScene"); 
        }
        //Increments background music and updates text
        else if(button == this.bgVolumePlus){
            this.clickSound.play(sfxConfig);
            if(Math.round(musicVolume * 10) / 10 < 1){
               musicVolume += 0.1;
               text.text = Math.round(musicVolume * 10);
            }
        }
        else if(button == this.bgVolumeMinus){
            this.clickSound.play(sfxConfig);
            if(Math.round(musicVolume * 10) / 10 > 0) {
                musicVolume -= 0.1;
                text.text = Math.round(musicVolume * 10);
            }
        }
        else if(button == this.sfxVolumePlus){
            this.clickSound.play(sfxConfig);
            if(Math.round(sfxVolume * 10) / 10 < 1){
               sfxVolume += 0.1;
               text.text = Math.round(sfxVolume * 10);
            }
        }
        else if(button == this.sfxVolumeMinus){
            this.clickSound.play(sfxConfig);
            if(Math.round(sfxVolume * 10) / 10 > 0){
               sfxVolume -= 0.1;
               text.text = Math.round(sfxVolume * 10);
            }
        }
        //Choose which difficulty is selected
        else if(button == this.easy){
            this.clickSound.play(sfxConfig);
            this.whichButton = 0
            this.difficulty();
        }
        else if(button == this.medium){
            this.clickSound.play(sfxConfig);
            this.whichButton = 1
            this.difficulty();
        }
        else if(button == this.impossible){
            this.clickSound.play(sfxConfig);
            this.whichButton = 2
            this.difficulty();
        }
        //Developer Mode
        else if(button = this.developer){
            this.buttonSound.play(sfxConfig);
            settingScene.scene.start("developerScene"); 
        }
    }

    actionOnHover(button){
        //Scale Button
        if(button == this.backBtn || button == this.easy || button == this.medium || button == this.impossible || button == this.developer){
            button.setScale(1.8); 
        }
        else{
            button.setScale(0.03);
        }
    }

    actionOnHoverOut(button){
        //Scale Button
        if(button == this.backBtn || button == this.easy || button == this.medium || button == this.impossible || button == this.developer){
            button.setScale(2); 
        }
        else{
            button.setScale(0.05);
        }
    }
        //Sets diffiuclty values and tints
    difficulty(){
        if(this.whichButton == 0){
            this.medium.clearTint();
            this.impossible.clearTint();
            this.easy.setTint(169,166,166);
            //update settings 
            shipMoveSpeed = 300;   //range: 300-800    default: 500    increment: 100 
            captureScale = 3;      //range: 1.5-3      default: 2.5    increment: 0.5
            minPlanet = 100;       //range: 50-150     default: 50     increment: 10
            maxPlanet = 150;       //range: 50-150     default: 150    increment: 10 cannot be less than minPlanet 
            planetDecrement = 0;   //range: 0-10       default: 5      increment: 1
            holeSpeed = 0;         //range: 0-1        default: 0.2    increment: 0.1
            mouseOrbit = false;    //range: bool       default: false
            gameAcceleration = 0;  //range: 1-0.5      default: 0.05   increment: 0.5
            ringFade = 0;          //range: 0-1        default: 0.1    increment: 0.05            
            

        }
        else if(this.whichButton == 1){
            this.easy.clearTint();
            this.impossible.clearTint();
            this.medium.setTint(169,166,166); 
            //update settings 
            shipMoveSpeed = 500;     //range: 300-800    default: 500    increment: 100 
            captureScale = 2.5;      //range: 1.5-3      default: 2.5    increment: 0.5
            minPlanet = 50;          //range: 50-150     default: 50     increment: 10
            maxPlanet = 150;         //range: 50-150     default: 150    increment: 10 cannot be less than minPlanet 
            planetDecrement = 5;     //range: 0-10       default: 5      increment: 1
            holeSpeed = 0.2;         //range: 0-1        default: 0.2    increment: 0.1
            mouseOrbit = false;      //range: bool       default: false
            gameAcceleration = 0.05; //range: 1-0.5      default: 0.05   increment: 0.5
            ringFade = 0.1;          //range: 0-1        default: 0.1    increment: 0.05
        }
        else if(this.whichButton == 2){
            this.easy.clearTint();
            this.medium.clearTint();
            this.impossible.setTint(169,166,166);
            //update settings 
            shipMoveSpeed = 800;     //range: 300-800    default: 500    increment: 100 
            captureScale = 1.5;      //range: 1.5-3      default: 2.5    increment: 0.5
            minPlanet = 50;          //range: 50-150     default: 50     increment: 10
            maxPlanet = 100;         //range: 50-150     default: 150    increment: 10 cannot be less than minPlanet 
            planetDecrement = 10;    //range: 0-10       default: 5      increment: 1
            holeSpeed = 1;           //range: 0-1        default: 0.2    increment: 0.1
            mouseOrbit = false;      //range: bool       default: false
            gameAcceleration = 0.05; //range: 1-0.5      default: 0.05   increment: 0.5
            ringFade = 1;            //range: 0-1        default: 0.1    increment: 0.05            
        }
    }
}