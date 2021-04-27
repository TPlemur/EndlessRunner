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
        this.load.image('menuBGStars', './assets/menu/menuBackgroundStars.png');
        this.load.image('title', './assets/menu/menuTitle.png');
        this.load.image('cursorParticles', './assets/menu/cursorParticles.png');

        //Load Audio
        this.load.audio('menuBGMusic', './assets/menu/menuMusic.wav'); //Temporarily Adding Source Here: https://freesound.org/people/szegvari/sounds/560736/
        this.load.audio('launchButtonSound', './assets/menu/menuLaunchButtonSound.wav'); //Temporarily Adding Source Here: https://freesound.org/people/pan14/sounds/263129/
        this.load.audio('launchNoise', './assets/menu/launchNoise.wav'); //Temporarily Adding Source Here: https://freesound.org/people/MATRIXXX_/sounds/444855/
    }

    create(){
        //Variable Initilization
        this.stopped = false;
        this.pulse = false;
        this.launchMe = false;

        //Fades in the Scene
        this.cameras.main.fadeIn(500);

        //Initialize Background Music that loops also any sound effects
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

        //Initialize Title
        this.title = this.add.sprite(screenCenterX, screenCenterY - 300, 'title').setScale(200);

        //Initialize Particles and Emitter
        this.rocketParticles = this.add.particles('menuBGStars').setScale(1);
        this.rocketEmitter = this.rocketParticles.createEmitter().setPosition(-1000,0);
        
        //Buttons
        this.launchBtn = this.add.sprite(screenCenterX, screenCenterY + 50, 'launchButton').setInteractive().setScale(3); //Initialize the button
        this.launchBtn.on('pointerover', () => this.actionOnHover(this.launchBtn, this.rocketEmitter)); //What happens when you hover over
        this.launchBtn.on('pointerout', () => this.actionOnHoverOut(this.launchBtn, this.rocketEmitter)); //What happens when you hover out
        this.launchBtn.on('pointerdown', () => this.actionOnClick(this.launchBtn, this, this.menuBGMusic, this.mouseFlameEmitter)); //What happens when you click   
        
        this.creditsBtn = this.add.sprite(screenCenterX, screenCenterY + 350, 'creditsButton').setInteractive().setScale(3);
        this.creditsBtn.on('pointerover', () => this.actionOnHover(this.creditsBtn, this.rocketEmitter)); 
        this.creditsBtn.on('pointerout', () => this.actionOnHoverOut(this.creditsBtn, this.rocketEmitter)); 
        this.creditsBtn.on('pointerdown', () => this.actionOnClick(this.creditsBtn, this, this.menuBGMusic, this.mouseFlameEmitter));  

        // Black Screen used for Transitioning between Scenes
        this.blackScreen = this.add.rectangle(screenCenterX, (screenCenterY + screenHeight) * 2, screenWidth, screenHeight * 3, 0x000000);
    }

    update(){
        //Shoot flames from the mouse
        this.mouseFlameEmitter.setPosition(this.game.input.mousePointer.x + 40, this.game.input.mousePointer.y + 30);

        //Adds Parallax Effect, /20 is to slow down the amount the background moves
        this.parallaxBackground();

        //Zooms in Title and Pulses it
        this.pulseTitle();

        //Will Launch the Menu up like a rocket
        if(this.launchMe == true){
            this.launchMenu(this.blackScreen, this.title, this.launchBtn, this.creditsBtn, this, this.rocketEmitter);
        }
    }

    actionOnClick(button, menuScene, bgMusic, emitter){
        //Plays Sound effect and Stop background music
        menuScene.sound.play('launchButtonSound');
        bgMusic.stop();

        //Depending on which button is pushed, a scene will run and the menu will launch
        if(button == this.launchBtn){
            //Play a Launching noise and Shake the screen
            menuScene.sound.play('launchNoise');
            menuScene.cameras.main.shake(1500);

            emitter.setAlpha(0);

            this.launchMe = true;
        }
        else if(button == this.creditsBtn){
            menuScene.scene.start("creditsScene"); 
        }
    }

    actionOnHover(button, emitter){
        //Start Particles
        emitter.setPosition(button.x, button.y);
        emitter.setBlendMode(Phaser.BlendModes.ADD);  
        emitter.setSpeed(150).setScale(0.1).setLifespan(800);
         
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

    launchMenu(blackScreen, title, launchButton, creditsButton, menuScene, emitter) {
        //Moves elements up
        blackScreen.y -= 20;
        title.y -= 20;
        launchButton.y -= 20;
        creditsButton.y -= 20;

        //Get rid of the emitter to make it look more clean
        emitter.setAlpha(0);

        //Adds a delay to luanching the scene
        this.time.addEvent({
            delay: 1500,
            callback: ()=>{
                menuScene.scene.start("playScene"); 
            },
        })
    }
}