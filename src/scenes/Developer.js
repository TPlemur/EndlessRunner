//Developer.js
//Developer Screen

class Developer extends Phaser.Scene {
    constructor(){
        super("developerScene")
    }

    preload(){
        this.load.image('menuBG', './assets/menu/menuBackground.png');
        this.load.image('menuBGStars', './assets/menu/menuBackgroundStars.png');
        this.load.image('backButton', './assets/buttons/Back.png');
        this.load.image('plus', './assets/menu/plus.png');
        this.load.image('minus', './assets/menu/minus.png');

        this.load.audio('click', './assets/menu/operationClick.wav'); //Temporarily adding source here: https://freesound.org/people/JonnyRuss01/sounds/478197/
    }

    create(){
        //Min, Max, Increment Values
        this.shipSpeedMax = 800;
        this.shipSpeedMin = 300;
        this.shipSpeedIncrement = 100;

        this.captureMax = 2.9; //Off by .1 to account for math errors
        this.captureMin = 1.4;
        this.captureIncrement= 0.5;

        this.planetDecMax = 10;
        this.planetDecMin = 0;
        this.planetDecIncrement = 1;

        this.holeSpeedMax = 1;
        this.holeSpeedMin = 0;
        this.holeSpeedIncrement = 0.1;

        this.ringFadeMax = 1;
        this.ringFadeMin = 0;
        this.ringFadeIncrement = 0.05;

        this.printMouseOrbit = false;

        this.accelerationMax = 1;
        this.accelerationMin = 0;
        this.accelerationIncrement = 0.05;

        this.minPlanetMax = 150;
        this.minPlanetMin = 40;
        this.minPlanetIncrement = 10;

        this.maxPlanetMax = 160;
        this.maxPlanetMin = 50;
        this.maxPlanetIncrement = 10;

        //Sets the scaling of the minus and plus button
        this.buttonScale = 0.05;

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
            fontSize: '60px',
            color: '#9d9db0',
            backgroundColor: null,
            align: 'center',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 0
        }
        //Developer Options Text
        this.holeSpeedText = this.add.text(screenCenterX, screenCenterY - screenCenterY/2 - 230, "{ Developer Options }", this.textConfig).setOrigin(0.5,0.5)


        //Ship Speed
        this.shipSpeedMinus = this.add.sprite(screenWidth/6 - 150, screenCenterY - screenCenterY/2, 'minus').setInteractive().setScale(this.buttonScale);
        this.shipSpeedPlus = this.add.sprite(screenWidth/6 + 150, screenCenterY - screenCenterY/2, 'plus').setInteractive().setScale(this.buttonScale);
        this.shipSpeedText = this.add.text(screenWidth/6, screenCenterY - screenCenterY/2 - 100, "Ship Speed", this.textConfig).setOrigin(0.5,0.5)
        this.shipSpeedDisplay = this.add.text(screenWidth/6, screenCenterY - screenCenterY/2, Math.round(shipMoveSpeed / 100), this.textConfig).setOrigin(0.5,0.5)
        this.button(this.shipSpeedMinus, this, this.shipSpeedDisplay, this.sfxConfig);
        this.button(this.shipSpeedPlus, this, this.shipSpeedDisplay, this.sfxConfig);

        //Capture Scale
        this.captureMinus = this.add.sprite(screenWidth/6 - 150, screenCenterY, 'minus').setInteractive().setScale(this.buttonScale);
        this.capturePlus = this.add.sprite(screenWidth/6 + 150, screenCenterY, 'plus').setInteractive().setScale(this.buttonScale);
        this.captureText = this.add.text(screenWidth/6, screenCenterY - 100, "Capture Scale", this.textConfig).setOrigin(0.5,0.5)
        this.captureDisplay = this.add.text(screenWidth/6, screenCenterY, Math.round(captureScale * 10) /5, this.textConfig).setOrigin(0.5,0.5)
        this.button(this.captureMinus, this, this.captureDisplay, this.sfxConfig);
        this.button(this.capturePlus, this, this.captureDisplay, this.sfxConfig);

        //Planet Decrement Scale
        this.planetDecMinus = this.add.sprite(screenWidth/6 - 150, screenCenterY + screenCenterY/2, 'minus').setInteractive().setScale(this.buttonScale);
        this.planetDecPlus = this.add.sprite(screenWidth/6 + 150, screenCenterY + screenCenterY/2, 'plus').setInteractive().setScale(this.buttonScale);
        this.planetDecText = this.add.text(screenWidth/6, screenCenterY + screenCenterY/2 - 100, "Planet Decrement", this.textConfig).setOrigin(0.5,0.5)
        this.planetDecDisplay = this.add.text(screenWidth/6, screenCenterY + screenCenterY/2, planetDecrement, this.textConfig).setOrigin(0.5,0.5)
        this.button(this.planetDecMinus, this, this.planetDecDisplay, this.sfxConfig);
        this.button(this.planetDecPlus, this, this.planetDecDisplay, this.sfxConfig);

        //Black Hole Speed Scale
        this.holeSpeedMinus = this.add.sprite(screenCenterX - 150, screenCenterY - screenCenterY/2, 'minus').setInteractive().setScale(this.buttonScale);
        this.holeSpeedPlus = this.add.sprite(screenCenterX + 150, screenCenterY - screenCenterY/2, 'plus').setInteractive().setScale(this.buttonScale);
        this.holeSpeedText = this.add.text(screenCenterX, screenCenterY - screenCenterY/2 - 100, "Black Hole Speed", this.textConfig).setOrigin(0.5,0.5)
        this.holeSpeedDisplay = this.add.text(screenCenterX, screenCenterY - screenCenterY/2, Math.round(holeSpeed * 10), this.textConfig).setOrigin(0.5,0.5)
        this.button(this.holeSpeedMinus, this, this.holeSpeedDisplay, this.sfxConfig);
        this.button(this.holeSpeedPlus, this, this.holeSpeedDisplay, this.sfxConfig);

        //Ring Fade Scale
        this.ringFadeMinus = this.add.sprite(screenCenterX - 150, screenCenterY, 'minus').setInteractive().setScale(this.buttonScale);
        this.ringFadePlus = this.add.sprite(screenCenterX + 150, screenCenterY, 'plus').setInteractive().setScale(this.buttonScale);
        this.ringFadeText = this.add.text(screenCenterX, screenCenterY- 100, "Ring Fade Scale", this.textConfig).setOrigin(0.5,0.5)
        this.ringFadeDisplay = this.add.text(screenCenterX, screenCenterY, Math.round(ringFade * 100)/ 10, this.textConfig).setOrigin(0.5,0.5)
        this.button(this.ringFadeMinus, this, this.ringFadeDisplay, this.sfxConfig);
        this.button(this.ringFadePlus, this, this.ringFadeDisplay, this.sfxConfig);

        //Mouse Orbit
        this.mouseOrbitMinus = this.add.sprite(screenCenterX - 150, screenCenterY + screenCenterY/2, 'minus').setInteractive().setScale(this.buttonScale);
        this.mouseOrbitPlus = this.add.sprite(screenCenterX + 150, screenCenterY + screenCenterY/2, 'plus').setInteractive().setScale(this.buttonScale);
        this.mouseOrbitText = this.add.text(screenCenterX, screenCenterY + screenCenterY/2 - 100, "Mouse Orbit", this.textConfig).setOrigin(0.5,0.5)
        if(mouseOrbit == true){
            this.printMouseOrbit = "true";
        }
        else {
            this.printMouseOrbit = "false";
        }
        this.mouseOrbitDisplay = this.add.text(screenCenterX, screenCenterY + screenCenterY/2, this.printMouseOrbit, this.textConfig).setOrigin(0.5,0.5)
        this.button(this.mouseOrbitMinus, this, this.mouseOrbitDisplay, this.sfxConfig);
        this.button(this.mouseOrbitPlus, this, this.mouseOrbitDisplay, this.sfxConfig);

        //Game Acceleration Scale
        this.accelerationMinus = this.add.sprite(screenWidth - screenCenterX/2, screenCenterY - screenCenterY/2, 'minus').setInteractive().setScale(this.buttonScale);
        this.accelerationPlus = this.add.sprite(screenWidth - screenCenterX/2 + 300, screenCenterY - screenCenterY/2, 'plus').setInteractive().setScale(this.buttonScale);
        this.accelerationText = this.add.text(screenWidth - screenCenterX/2 + 150, screenCenterY - screenCenterY/2 - 100, "Game Acceleration", this.textConfig).setOrigin(0.5,0.5)
        this.accelerationDisplay = this.add.text(screenWidth - screenCenterX/2 + 150, screenCenterY - screenCenterY/2, Math.round(gameAcceleration * 100) / 10, this.textConfig).setOrigin(0.5,0.5)
        this.button(this.accelerationMinus, this, this.accelerationDisplay, this.sfxConfig);
        this.button(this.accelerationPlus, this, this.accelerationDisplay, this.sfxConfig);

        //Min Planet Scale
        this.minPlanetMinus = this.add.sprite(screenWidth - screenCenterX/2, screenCenterY, 'minus').setInteractive().setScale(this.buttonScale);
        this.minPlanetPlus = this.add.sprite(screenWidth - screenCenterX/2 + 300, screenCenterY, 'plus').setInteractive().setScale(this.buttonScale);
        this.minPlanetText = this.add.text(screenWidth - screenCenterX/2 + 150, screenCenterY- 100, "Min Planet Scale", this.textConfig).setOrigin(0.5,0.5)
        this.minPlanetDisplay = this.add.text(screenWidth - screenCenterX/2 + 150, screenCenterY, minPlanet, this.textConfig).setOrigin(0.5,0.5)
        this.button(this.minPlanetMinus, this, this.minPlanetDisplay, this.sfxConfig);
        this.button(this.minPlanetPlus, this, this.minPlanetDisplay, this.sfxConfig);

        //Max Planet Scale
        this.maxPlanetMinus = this.add.sprite(screenWidth - screenCenterX/2, screenCenterY + screenCenterY/2, 'minus').setInteractive().setScale(this.buttonScale);
        this.maxPlanetPlus = this.add.sprite(screenWidth - screenCenterX/2 + 300, screenCenterY + screenCenterY/2, 'plus').setInteractive().setScale(this.buttonScale);
        this.maxPlanetText = this.add.text(screenWidth - screenCenterX/2 + 150, screenCenterY + screenCenterY/2 - 100, "Max Planet Scale", this.textConfig).setOrigin(0.5,0.5)
        this.maxPlanetDisplay = this.add.text(screenWidth - screenCenterX/2 + 150, screenCenterY + screenCenterY/2, maxPlanet, this.textConfig).setOrigin(0.5,0.5)
        this.button(this.maxPlanetMinus, this, this.maxPlanetDisplay, this.sfxConfig);
        this.button(this.maxPlanetPlus, this, this.maxPlanetDisplay, this.sfxConfig);
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
            settingScene.scene.start("settingsScene"); 
        }
        //Increments ship speed and updates text
        else if(button == this.shipSpeedPlus){
            this.clickSound.play(sfxConfig);
            if(shipMoveSpeed < this.shipSpeedMax){
               shipMoveSpeed += this.shipSpeedIncrement;
               text.text = Math.round(shipMoveSpeed / 100);
            }
        }
        else if(button == this.shipSpeedMinus){
            this.clickSound.play(sfxConfig);
            if(shipMoveSpeed > this.shipSpeedMin) {
                shipMoveSpeed -= this.shipSpeedIncrement;
                text.text = Math.round(shipMoveSpeed / 100);
            }
        }
        //Increments capture scale
        else if(button == this.capturePlus){
            this.clickSound.play(sfxConfig);
            if(captureScale < this.captureMax){
                captureScale += this.captureIncrement;
               text.text = Math.round(captureScale * 10) / 5;
            }
        }
        else if(button == this.captureMinus){
            this.clickSound.play(sfxConfig);
            if(captureScale > this.captureMin) {
                captureScale -= this.captureIncrement;
                text.text = Math.round(captureScale * 10) / 5;
            }
        }
        //Increments planet decrement scale
        else if(button == this.planetDecPlus){
            this.clickSound.play(sfxConfig);
            if(planetDecrement < this.planetDecMax){
                planetDecrement += this.planetDecIncrement;
                text.text = planetDecrement
            }
        }
        else if(button == this.planetDecMinus){
            this.clickSound.play(sfxConfig);
            if(planetDecrement > this.planetDecMin){
                planetDecrement -= this.planetDecIncrement;
                text.text = planetDecrement
            }
        }
        //Increments black hole speed scale
        else if(button == this.holeSpeedPlus){
            this.clickSound.play(sfxConfig);
            if(Math.round(holeSpeed * 10) / 10 < this.holeSpeedMax){
                holeSpeed += this.holeSpeedIncrement;
                text.text = Math.round(holeSpeed * 10);
            }
        }
        else if(button == this.holeSpeedMinus){
            this.clickSound.play(sfxConfig);
            if(Math.round(holeSpeed * 10) / 10> this.holeSpeedMin){
                holeSpeed -= this.holeSpeedIncrement;
                text.text = Math.round(holeSpeed * 10);
            }
        }
         //Ring fade scale
         else if(button == this.ringFadePlus){
            this.clickSound.play(sfxConfig);
            if(Math.round(ringFade * 100) / 100 < this.ringFadeMax){
                ringFade += this.ringFadeIncrement;
                text.text = Math.round(ringFade * 100) / 100;
            }
        }
        else if(button == this.ringFadeMinus){
            this.clickSound.play(sfxConfig);
            if(Math.round(ringFade * 100) / 100 > this.ringFadeMin){
                ringFade -= this.ringFadeIncrement;
                text.text = Math.round(ringFade * 100) / 100;
            }
        }
        //Mouse Orbit
        else if(button == this.mouseOrbitPlus){
            this.clickSound.play(sfxConfig);
            mouseOrbit = true;
            this.mouseOrbitText = "true";
            text.text = this.mouseOrbitText
        }   
        else if(button == this.mouseOrbitMinus){
            this.clickSound.play(sfxConfig);
            mouseOrbit = false;
            this.mouseOrbitText = "false";
            text.text = this.mouseOrbitText
        }      
        //Game Acceleration
        else if(button == this.accelerationPlus){
            this.clickSound.play(sfxConfig);
            if(Math.round(gameAcceleration * 100) / 100 < this.accelerationMax){
                gameAcceleration += this.accelerationIncrement;
                text.text = Math.round(gameAcceleration * 100) / 100;
            }
        }     
        else if(button == this.accelerationMinus){
            this.clickSound.play(sfxConfig);
            if(Math.round(gameAcceleration * 100) / 100 > this.accelerationMin){
                gameAcceleration -= this.accelerationIncrement;
                text.text = Math.round(gameAcceleration * 100) / 100;
            }
        }     
        //minPlanet Scale
        else if(button == this.minPlanetPlus){
            this.clickSound.play(sfxConfig);
            if(minPlanet < this.minPlanetMax){
                if(minPlanet >= maxPlanet - 10){
                    maxPlanet += this.maxPlanetIncrement;
                    this.maxPlanetDisplay.text = maxPlanet;
                }
                minPlanet += this.minPlanetIncrement;
               text.text = minPlanet;
            }
        }
        else if(button == this.minPlanetMinus){
            this.clickSound.play(sfxConfig);
            if(minPlanet > this.minPlanetMin){
                minPlanet -= this.minPlanetIncrement;
               text.text = minPlanet;
            }
        }   
        //maxPlanet Scale
        else if(button == this.maxPlanetPlus){
            this.clickSound.play(sfxConfig);
            if(maxPlanet < this.maxPlanetMax){
                maxPlanet += this.maxPlanetIncrement;
               text.text = maxPlanet;
            }
        }
        else if(button == this.maxPlanetMinus){
            this.clickSound.play(sfxConfig);
            if(maxPlanet > this.maxPlanetMin && maxPlanet - 10> minPlanet){
                maxPlanet -= this.maxPlanetIncrement;
               text.text = maxPlanet;
            }
        }     
    }

    actionOnHover(button){
        //Scale Button
        if(button == this.backBtn){
            button.setScale(0.4); 
        }
        else{
            button.setScale(0.03);
        }
    }

    actionOnHoverOut(button){
        //Scale Button
        if(button == this.backBtn){
            button.setScale(0.5); 
        }
        else{
            button.setScale(0.05);
        }
    }
}