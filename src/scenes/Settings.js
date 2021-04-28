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
        this.load.image('plus', './assets/menu/plus.png');
        this.load.image('minus', './assets/menu/minus.png');
    }

    create(){

        //Fades in the Scene
        this.cameras.main.fadeIn(500);

        this.menuBackground = this.add.tileSprite(0, 0, game.config.width, game.config.height, "menuBG").setOrigin(0,0).setScrollFactor(0);
        this.menuBackgroundStars = this.add.tileSprite(0, 0, game.config.width, game.config.height, "menuBGStars").setOrigin(0,0).setScrollFactor(0);

        this.backBtn = this.add.sprite(screenCenterX, screenCenterY + 350, 'backButton').setInteractive().setScale(2); //Initialize the button
        this.button(this.backBtn, this);

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
        this.bgVolumeMinus = this.add.sprite(screenCenterX - 200, screenCenterY + 50, 'minus').setInteractive().setScale(0.05);
        this.bgVolumePlus = this.add.sprite(screenCenterX + 200, screenCenterY + 50, 'plus').setInteractive().setScale(0.05);
        this.bgVolumeText = this.add.text(screenCenterX, screenCenterY - 40, "Background Music", this.textConfig).setOrigin(0.5,0.5)
        this.bgVolumeDisplay = this.add.text(screenCenterX, screenCenterY + 50, Math.round(musicVolume * 10), this.textConfig).setOrigin(0.5,0.5)
        this.button(this.bgVolumeMinus, this, this.bgVolumeDisplay);
        this.button(this.bgVolumePlus, this, this.bgVolumeDisplay);
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

    button(button, text, scene){
        button.on('pointerover', () => this.actionOnHover(button)); //What happens when you hover over
        button.on('pointerout', () => this.actionOnHoverOut(button)); //What happens when you hover out
        button.on('pointerdown', () => this.actionOnClick(button, text, scene)); //What happens when you click   
    }

    actionOnClick(button, settingScene, text){
        //Plays Sound effect and go to menu
        if(button == this.backBtn){
            settingScene.sound.play('launchButtonSound');
            settingScene.scene.start("menuScene"); 
        }
        //Increments background music and updates text
        else if(button == this.bgVolumePlus){
            if(Math.round(musicVolume * 10) / 10 < 1){
               musicVolume += 0.1;
               text.text = Math.round(musicVolume * 10);
            }
        }
        else if(button == this.bgVolumeMinus){
            if(Math.round(musicVolume * 10) / 10 > 0) {
                musicVolume -= 0.1;
                text.text = Math.round(musicVolume * 10);
            }
        }
    }

    actionOnHover(button){
        //Scale Button
        if(button == this.backBtn){
            button.setScale(1.8); 
        }
        else{
            button.setScale(0.03);
        }
    }

    actionOnHoverOut(button){
        //Scale Button
        if(button == this.backBtn){
            button.setScale(2); 
        }
        else{
            button.setScale(0.05);
        }
    }



}