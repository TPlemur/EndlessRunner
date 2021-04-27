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
    scene: [Menu, Play, Credits, End],
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

//contol variables
let shipMoveSpeed = 500;     //range: 300-800    default: 500    increment: 100                                 IMPLEMENTED
let captureScale = 2.5;      //range: 1.5-3      default: 2.5    increment: 0.5                                 IMPLEMENTED
let musicVolume = 0.5;       //range: 0-1        default: 0.5    increment: 0.1
let sfxVolume = 0.5;         //range: 0-1        default: 0.5    increment: 0.1
let minPlanet = 50;          //range: 50-150     default: 50     increment: 10                                  IMPLEMENTED
let maxPlanet = 150;         //range: 50-150     default: 150    increment: 10 cannot be less than minPlanet    IMPLEMENTED
let planetDecrement = 5;     //range: 0-10       default: 5      increment: 1                                   IMPLEMENTED
let holeSpeed = 0.5;         //range: 0-1        default: 0.5    increment: 0.5                                 IMPLEMENTED
let mouseOrbit = false;      //range: bool       default: false                                                 IMPLEMENTED
let gameAcceleration = 0.05; //range: 1-0.5      default: 0.05   increment: 0.5
let ringFade = 0.1;          //range: 0-1        default: 0.1    increment: 0.05                                IMPLEMENTED

//define screen variables
let screenCenterX = screenWidth / 2;
let screenCenterY = screenHeight / 2;
