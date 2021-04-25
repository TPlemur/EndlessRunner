//Credits.js
//Credit Screen

class Credits extends Phaser.Scene {
    constructor(){
        super("creditsScene")
    }

    preload(){
        this.load.image('menuBG', './assets/menu/menuBackground.png');
        this.load.image('menuBGStars', './assets/menu/menuBackgroundStars.png');
        this.load.image('backButton', './assets/menu/creditsBackButton.png');

        //Black hole temp
        this.load.image('blackHole', './assets/blackHole.png');
        this.load.image('blackHoleWaves', './assets/blackHoleWaves.png');
    }

    create(){
        //Fades in the Scene
        this.cameras.main.fadeIn(500);

        this.menuBackground = this.add.tileSprite(0, 0, game.config.width, game.config.height, "menuBG").setOrigin(0,0).setScrollFactor(0);
        this.menuBackgroundStars = this.add.tileSprite(0, 0, game.config.width, game.config.height, "menuBGStars").setOrigin(0,0).setScrollFactor(0);

        this.backBtn = this.add.sprite(screenCenterX, screenCenterY + 350, 'backButton').setInteractive().setScale(2); //Initialize the button
        this.backBtn.on('pointerover', this.actionOnHover); //What happens when you hover over
        this.backBtn.on('pointerout', this.actionOnHoverOut); //What happens when you hover out
        this.backBtn.on('pointerdown', () => this.actionOnClick(this)); //What happens when you click   

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

        //Black hole temp
        this.blackHoleWaves = new Blackhole(this, screenCenterX - 3300, screenCenterY, 'blackHoleWaves').setScale(0.5);
        this.blackHole = new Blackhole(this, screenCenterX - 1100, screenCenterY, 'blackHole').setScale(0.2);
        this.blackHoleWaves.setSpeed(0.2);
    }

    update(){
        this.blackHoleWaves.update(1); // 1 represents Black Hole Waves
        this.blackHole.update(0); // 0 represents Black Hole

        //Update Mouse flame location
        this.mouseFlameEmitter.setPosition(this.game.input.mousePointer.x + 60, this.game.input.mousePointer.y + 50);
        
        this.parallaxBackground();
    }

    parallaxBackground(){
        this.menuBackground.tilePositionX = this.game.input.mousePointer.x / 20;
        this.menuBackground.tilePositionY = this.game.input.mousePointer.y / 20;
        this.menuBackgroundStars.tilePositionX = this.game.input.mousePointer.x / 35;
        this.menuBackgroundStars.tilePositionY = this.game.input.mousePointer.y / 35;
    }

    actionOnClick(creditsScene){
        //Plays Sound effect and go to menu
        creditsScene.sound.play('launchButtonSound');
        creditsScene.scene.start("menuScene"); 
    }

    actionOnHover(){
        //Scale Button
        this.setScale(1.8); 
    }

    actionOnHoverOut(){
        //Scale Button
        this.setScale(2);
    }

}