//main.js
//declairs global variables and creates the phaser game object
//Thomas, jacqueline, Danny, Quinn

//config for the phaser game
const screenWidth = 1920;
const screenHeight = 1080;

let config= {
    type: Phaser.AUTO,
    width: screenWidth,
    height: screenHeight,  
    
    //keeps aspect ratio to 16:9 (1920x1080)
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH
    },
    scene: [Menu, Play, Credits, Settings, Developer, End],
}

//define game object
let game = new Phaser.Game(config);

//define keys
let keySPACE, keyESC;

//global variabl
let globalSpeed = 1;
let gameScore = 0;
let highScore = 0;
let highScoreHolder; //if we want to have something like this
let causeOfDeath = 'Mission Aborted';
let tweenspeed = 2; //time in seconds
let whichButton = 1; // Game starts off with medium settings 0 = Easy, 1 = Medium, 2 = Hard, 3 = custom
let buttonScale = 0.35; //Sets the size of the plus and minus buttons
let fontColor = '#B0BABA';

//contol variables
let shipMoveSpeed = 500;     //range: 300-800    default: 500    increment: 100                                 IMPLEMENTED SETTINGS DONE
let captureScale = 2.5;      //range: 1.5-3      default: 2.5    increment: 0.5                                 IMPLEMENTED SETTINGS DONE
let musicVolume = 0.5;       //range: 0-1        default: 0.5    increment: 0.1                                 IMPLEMENTED SETTINGS DONE
let sfxVolume = 0.5;         //range: 0-1        default: 0.5    increment: 0.1                                 IMPLEMENTED SETTINGS DONE
let minPlanet = 40;          //range: 40-150     default: 50     increment: 10                                  IMPLEMENTED SETTINGS DONE
let maxPlanet = 160;         //range: 50-160     default: 150    increment: 10 cannot be less than minPlanet    IMPLEMENTED SETTINGS DONE
let planetDecrement = 5;     //range: 0-10       default: 5      increment: 1                                   IMPLEMENTED SETTINGS DONE
let holeSpeed = 0.2;         //range: 0-1        default: 0.2    increment: 0.1                                 IMPLEMENTED SETTINGS DONE
let mouseOrbit = false;      //range: bool       default: false                                                 IMPLEMENTED SETTINGS DONE
let gameAcceleration = 0.1; //range: 1-0.5      default: 0.05   increment: 0.5                                             SETTINGS DONE
let ringFade = 0.05;          //range: 0-1        default: 0.1    increment: 0.05                                IMPLEMENTED SETTINGS DONE

//define screen variables
let screenCenterX = screenWidth / 2;
let screenCenterY = screenHeight / 2;
