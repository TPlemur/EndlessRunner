//Menu.js

class Menu extends Phaser.Scene{
    constructor(){
        super("menuScene");
    }

    preload(){
        //Load Images
        this.load.image('menuBG', './assets/menu/menuBackground.png');
        this.load.image('launchButton', './assets/menu/menuLaunchButton.png');
        this.load.image('creditsButton', './assets/menu/menuCreditsButton.png');
        this.load.image('rocketParticle', './assets/menu/rocketParticle.png');
        this.load.image('menuBGStars', './assets/menu/menuBackgroundStars.png');
        this.load.image('title', './assets/menu/menuTitle.png');

        //Load Audio
        this.load.audio('menuBGMusic', './assets/menu/menuMusic.wav'); //Temporarily Adding Source Here: https://freesound.org/people/szegvari/sounds/560736/
        this.load.audio('launchButtonSound', './assets/menu/menuLaunchButtonSound.wav'); //Temporarily Adding Source Here: https://freesound.org/people/pan14/sounds/263129/
        this.load.audio('titleSound', './assets/menu/titleSound.wav'); //Temporarily Adding Source Here: https://freesound.org/people/qubodup/sounds/171255/
    }

    create(){
        //Variable Initilization
        this.stopped = false;
        this.pulse = false;

        //Initialize Background Music that loops also any sound effects
        this.titleEffect = this.sound.add('titleSound');
        var effectConfig ={
            volume: 0.5,
            delay: 0.83,
        }
        this.titleEffect.play(effectConfig);

        this.menuBGMusic = this.sound.add('menuBGMusic');
        var musicConfig ={
            volume: 0.5,
            loop: true,
        }
        this.menuBGMusic.play(musicConfig);

        //Sets Cursor to a .cur file
        this.input.setDefaultCursor('url(./assets/menu/spaceshipCursor.cur), pointer'); //Temporary Adding Source Here: http://www.rw-designer.com/licenses

        //Set background that is tileable
        this.menuBackground = this.add.tileSprite(0, 0, game.config.width, game.config.height, "menuBG").setOrigin(0,0).setScrollFactor(0);
        this.menuBackgroundStars = this.add.tileSprite(0, 0, game.config.width, game.config.height, "menuBGStars").setOrigin(0,0).setScrollFactor(0);

        //Initialize Title
        this.title = this.add.sprite(screenCenterX, screenCenterY - 300, 'title').setScale(200);

        //Initialize Particles and Emitter
        this.rocketParticles = this.add.particles('rocketParticle').setScale(1);
        this.rocketEmitter = this.rocketParticles.createEmitter().setPosition(-1000,0);
        
        //Buttons
        this.launchBtn = this.add.sprite(screenCenterX, screenCenterY + 50, 'launchButton').setInteractive().setScale(3); //Initialize the button
        this.launchBtn.on('pointerover', () => this.actionOnHover(this.launchBtn, this.rocketEmitter)); //What happens when you hover over
        this.launchBtn.on('pointerout', () => this.actionOnHoverOut(this.launchBtn, this.rocketEmitter)); //What happens when you hover out
        this.launchBtn.on('pointerdown', () => this.actionOnClick(this.launchBtn, this, this.menuBGMusic)); //What happens when you click   
        
        this.creditsBtn = this.add.sprite(screenCenterX, screenCenterY + 350, 'creditsButton').setInteractive().setScale(3);
        this.creditsBtn.on('pointerover', () => this.actionOnHover(this.creditsBtn, this.rocketEmitter)); 
        this.creditsBtn.on('pointerout', () => this.actionOnHoverOut(this.creditsBtn, this.rocketEmitter)); 
        this.creditsBtn.on('pointerdown', () => this.actionOnClick(this.creditsBtn, this, this.menuBGMusic));  
    }

    update(){
        //Adds Parallax Effect, /20 is to slow down the amount the background moves
        this.parallaxBackground();

        //Zooms in Title and Pulses it
        this.pulseTitle();
    }

    actionOnClick(button, menuScene, bgMusic){
        //Plays Sound effect and Stop background music
        menuScene.sound.play('launchButtonSound');
        bgMusic.stop();

        //Depending on which button is pushed, a scene will run
        if(button == this.launchBtn){
            menuScene.scene.start("playScene"); 
        }
        else if(button == this.creditsBtn){
            menuScene.scene.start("creditsScene"); 
        }
    }

    actionOnHover(button, emitter){
        //Start Particles
        emitter.setPosition(button.x, button.y);
        emitter.setBlendMode(Phaser.BlendModes.ADD);  
        emitter.setSpeed(190).setScale(0.1).setLifespan(1100);
         
        //Scale Button
        button.setScale(2.8); 
    }

    actionOnHoverOut(button, emitter){
        //Stop Particles
        emitter.setPosition(button.x, button.y).setSpeed(0); 

        //Scale Button
        button.setScale(3);
    }

    parallaxBackground(){
        this.menuBackground.tilePositionX = this.game.input.mousePointer.x / 20;
        this.menuBackground.tilePositionY = this.game.input.mousePointer.y / 20;
        this.menuBackgroundStars.tilePositionX = this.game.input.mousePointer.x / 35;
        this.menuBackgroundStars.tilePositionY = this.game.input.mousePointer.y / 35;
    }

    pulseTitle(){
        if(this.title.scale > 2.5 && this.stopped == false){
            this.title.scale -= 3;
        }
        else{
            this.stopped = true;
        }

        if(this.stopped == true && this.pulse == false){
            this.title.scale += 0.003;

            if(this.title.scale >= 2.2){
                this.pulse = true;
            }
        }
        else if(this.stopped == true && this.pulse == true){
            this.title.scale -= 0.003;

            if(this.title.scale <= 2){
                this.pulse = false;
            }
        }
    }
}