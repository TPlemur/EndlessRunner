//Play.js
//Creates and populates the main space of play

class Play extends Phaser.Scene {
    constructor() {
        super("playScene")
    }

    preload() {
        //loading assets
        this.load.image('orbiter','assets/orbitPlaceholder.png');
        this.load.image('testPlanert','assets/planet.png');
    }

    create() {

        //define Keys
        keySPACE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        keyESC = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ESC);

        //flags & vars
        this.gameRuningFlag = true;

        //text configuration
        let textConfig = {
            fontFamily: 'Courier',
            fontSize: '200px',
            backgroundColor: '#F3B141',
            color: '#843605',
            align: 'right',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 0
        }

        this.testPlanet = new Planet(this,500,500,'testPlanert');
        this.testPlanet.setSize(100);

        //place orbiter in a random place
        this.orbirter = new Orbiter(this,
            500,500,500,500, //placed at origin of orbit
            this.testPlanet.radius*1.5,0, //radious, angle
            'orbiter',keySPACE
        )

        //translation test
        this.Clock = this.time.delayedCall(2000,()=>{
            this.orbirter.setTranslate(900,500,2);
            this.testPlanet.setTranslate(900,500,2);
        });



    }

    update(){
        //update the orbiter]
        if(this.gameRuningFlag){
            this.orbirter.update();
        }        
        else{//if game ends go space to go to menu
            if(Phaser.Input.Keyboard.JustDown(keySPACE)){
                this.scene.start('playScene');
            }
            if(Phaser.Input.Keyboard.JustDown(keyESC)){
                this.scene.start('menuScene')
            }
        }

        //check if the game should end
        if(this.orbirter.checkBounds() || this.orbirter.checkCollision(this.testPlanet)){
            this.gameRuningFlag = false
            //this.orbiter.explode() UNIMPLEMENTED
            this.add.text(game.config.width/2, game.config.height/2,'GAME OVER', this.textConfig).setOrigin(0.5);
        } 
    }


}