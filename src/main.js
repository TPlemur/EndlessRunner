//main.js
//declairs global variables and creates the phaser game object
//Thomas, jacqueline, Danny, Quinn

//config for the phaser game
const screenWidth = 1920;
const screenHeight = 1080;

let config= {
    type: Phaser.CANVAS,
    width: screenWidth,
    height: screenHeight,  
    
    //keeps aspect ratio to 16:9 (1920x1080)
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH
    },
    scene: [Menu, Play, Credits],
}

//define game object
let game = new Phaser.Game(config);

//define keys
let keySPACE, keyESC;

//global variabl
let globalSpeed = 1;

//define screen variables
let screenCenterX = screenWidth / 2;
let screenCenterY = screenHeight / 2;
