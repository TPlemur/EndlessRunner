//Settings.js
//Setting Screen

class Settings extends Phaser.Scene {
    constructor(){
        super("settingsScene")
    }

    preload(){
        this.load.image('menuBG', './assets/menu/menuBackground.png');
        this.load.image('menuBGStars', './assets/menu/menuBackgroundStars.png');
        this.load.image('backButton', './assets/buttons/Back.png');
        this.load.image('developer', './assets/buttons/Gear.png');
        this.load.image('easy', './assets/buttons/Easy.png');
        this.load.image('medium', './assets/buttons/Medium.png');
        this.load.image('impossible', './assets/buttons/Impossible.png');
        this.load.image('plus', './assets/buttons/Plus.png');
        this.load.image('minus', './assets/buttons/Minus.png');

        this.load.audio('click', './assets/menu/operationClick.wav'); //Temporarily adding source here: https://freesound.org/people/JonnyRuss01/sounds/478197/
    }

    create(){
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

        this.backBtn = this.add.sprite(screenCenterX, screenCenterY + 450, 'backButton').setInteractive().setScale(0.5); //Initialize the button
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
            color: fontColor,
            backgroundColor: null,
            align: 'center',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 0
        }

        //Increment Buttons and add text
        this.easy = this.add.sprite(screenCenterX - 400, screenCenterY - 350, 'easy').setInteractive().setScale(0.5).setOrigin(0.5,0.5);
        this.medium = this.add.sprite(screenCenterX, screenCenterY - 350, 'medium').setInteractive().setScale(0.5).setOrigin(0.5,0.5);
        this.impossible = this.add.sprite(screenCenterX + 400, screenCenterY - 350, 'impossible').setInteractive().setScale(0.5).setOrigin(0.5,0.5);
        if(whichButton == 0){
            this.easy.setTint(0x656565);
        }
        else if(whichButton == 1){
            this.medium.setTint(0x656565);
        }
        else if(whichButton == 2){
            this.impossible.setTint(0x656565);
        }
        this.difficultyText = this.add.text(screenCenterX, screenCenterY - 450, "Difficulty Selection", this.textConfig).setOrigin(0.5,0.5);
        this.button(this.easy, this, null, this.sfxConfig);
        this.button(this.medium, this, null, this.sfxConfig);
        this.button(this.impossible, this, null, this.sfxConfig);
        this.textConfig.fontSize = '40px'
        this.warningText = this.add.text(screenCenterX,screenCenterY - 270,"changing difficulty resets high score",this.textConfig).setOrigin(0.5);
        this.textConfig.fontSize = '80px'

        this.bgVolumeMinus = this.add.sprite(screenCenterX - 200, screenCenterY - 100, 'minus').setInteractive().setScale(buttonScale);
        this.bgVolumePlus = this.add.sprite(screenCenterX + 200, screenCenterY - 100, 'plus').setInteractive().setScale(buttonScale);
        this.bgVolumeText = this.add.text(screenCenterX, screenCenterY - 200, "Background Music", this.textConfig).setOrigin(0.5,0.5)
        this.bgVolumeDisplay = this.add.text(screenCenterX, screenCenterY - 100, Math.round(musicVolume * 10), this.textConfig).setOrigin(0.5,0.5)
        this.button(this.bgVolumeMinus, this, this.bgVolumeDisplay, this.sfxConfig);
        this.button(this.bgVolumePlus, this, this.bgVolumeDisplay, this.sfxConfig);

        this.sfxVolumeMinus = this.add.sprite(screenCenterX - 200, screenCenterY + 120, 'minus').setInteractive().setScale(buttonScale);
        this.sfxVolumePlus = this.add.sprite(screenCenterX + 200, screenCenterY + 120, 'plus').setInteractive().setScale(buttonScale);
        this.sfxVolumeText = this.add.text(screenCenterX, screenCenterY + 20, "SFX Volume", this.textConfig).setOrigin(0.5,0.5)
        this.sfxVolumeDisplay = this.add.text(screenCenterX, screenCenterY + 120, Math.round(sfxVolume * 10), this.textConfig).setOrigin(0.5,0.5)
        this.button(this.sfxVolumeMinus, this, this.sfxVolumeDisplay, this.sfxConfig);
        this.button(this.sfxVolumePlus, this, this.sfxVolumeDisplay, this.sfxConfig);

        this.developer = this.add.sprite(screenCenterX, screenCenterY + 275, 'developer').setInteractive().setScale(0.15).setOrigin(0.5,0.5);
        this.button(this.developer, this, null, this.sfxConfig);

    }

    update(){
        //Update Mouse flame location
        this.mouseFlameEmitter.setPosition(this.game.input.mousePointer.x + 23, this.game.input.mousePointer.y + 20);
        
        //if the pointer is too close to the edge move the particles way out of sight
        if(this.game.input.mousePointer.x<5||this.game.input.mousePointer.y<3){
            this.mouseFlameEmitter.setPosition(-100,-100);
        }
        
        this.parallaxBackground();

        this.developer.rotation += 0.01;
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
            whichButton = 0
            this.difficulty();
        }
        else if(button == this.medium){
            this.clickSound.play(sfxConfig);
            whichButton = 1
            this.difficulty();
        }
        else if(button == this.impossible){
            this.clickSound.play(sfxConfig);
            whichButton = 2
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
        if(button == this.backBtn || button == this.easy || button == this.medium || button == this.impossible){
            button.setScale(0.4); 
        }
        else if(button == this.developer)
        {
            button.setScale(0.13);
        }
        else{
           button.setScale(buttonScale - 0.05);
        }
    }

    actionOnHoverOut(button){
        //Scale Button
        if(button == this.backBtn || button == this.easy || button == this.medium || button == this.impossible){
            button.setScale(0.5); 
        }
        else if(button == this.developer)
        {
            button.setScale(0.15);
        }
        else{
            button.setScale(buttonScale);
        }
    }
        //Sets diffiuclty values and tints
    difficulty(){
        if(whichButton == 0){
            this.medium.clearTint();
            this.impossible.clearTint();
            this.easy.setTint(0x656565);
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
            highScore = 0;         //reset highScore            
            

        }
        else if(whichButton == 1){
            this.easy.clearTint();
            this.impossible.clearTint();
            this.medium.setTint(0x656565);
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
            highScore = 0;         //reset highScore 
        }
        else if(whichButton == 2){
            this.easy.clearTint();
            this.medium.clearTint();
            this.impossible.setTint(0x656565);
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
            highScore = 0;         //reset highScore             
        }
    }
}