//main.js
//declairs global variables and creates the phaser game object
//Thomas, jacqueline, Danny, Quinn

console.log('is anyone there?');
//config for the phaser game
let config= {
    type: Phaser.CANVAS,
    width: 640,
    height:480,
    scene: [Menu, Play],
}

//define game object
let game = new Phaser.Game(config);

//define keys
let keySPACE;
