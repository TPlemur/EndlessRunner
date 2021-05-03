//
// Quasar Escape
// Thomas Price, Jacqueline Castro, Danny Baghdasarians, Quinn Satow
// Date Completed: 5/3/21
//
//
// __Creative_Tilt_Justification__
//
// What our endless runner does that is techincally interesting is the games utilization of orbiting a planet. By doing so we take the endless runner from running on the ground
// to orbiting planets in order to escape a giant black hole that is chasing you. 
//
// We are particularly proud of how controllable our variables for gameplay are. With the amount of variables that we implemented, the games pace and difficulty can be changed
// and catered to the users needs. Planets, ships, blackholes, music, etc., each have various variables attached to them that are completely changeable. In addition, we are proud
// of how our ship orbits a planet, and captures the next planet so effortlessly and without any Phaser physics at all!
//
// We utilized the Phaser 3 API and documentation straight from their website to help us understand concepts and implement things that we have not learned yet but wanted to go out of
// our way to add to the game to make it all the more enjoyable to play. Particle systems and Texture atlas's were 2 of the many things that we had to go out and do our own research on
// to understand how to use them and manipulate them to fit our game.
//
// Our visual style was created by our artist Jacqueline and really emphasizes a space theme that is not too complex but enough so that players can feel the polish that it adds to the game.
//
// We are proud of our art assets as they are all created by our arists and no outside sources. Our music is fantastic and matches the game and we have aquired it from sources that allow free
// usage of their works.
//
// We believe we are trying something unique in the endless runner form as our game utilizes space travel in many different directions as well as orbiting planets. This new take on
// endless runners we hope will be refreshing and uniquely stand out.
//
//
// Sources: 
// Menu Music: https://freesound.org/people/szegvari/sounds/560736/
// Music: https://www.bensound.com/royalty-free-music/track/sci-fi
// Button Sound: https://freesound.org/people/pan14/sounds/263129/
// Launch Noise: https://freesound.org/people/MATRIXXX_/sounds/444855/
// Crash Sound: https://freesound.org/people/soneproject/sounds/346425/
// SuccessSound: https://freesound.org/people/soneproject/sounds/345271/
// Font: https://www.dafont.com/futured.font
//
//
// main.js
// Declairs global variables and creates the phaser game object
//

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
let font = 'font1';

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
let gameAcceleration = 0.1; //range: 1-0.5      default: 0.05   increment: 0.5                                              SETTINGS DONE
let ringFade = 0.05;          //range: 0-1        default: 0.1    increment: 0.05                               IMPLEMENTED SETTINGS DONE

//define screen variables
let screenCenterX = screenWidth / 2;
let screenCenterY = screenHeight / 2;
