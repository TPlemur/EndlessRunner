//Play.js
//Creates and populates the main space of play

class Play extends Phaser.Scene {
    constructor(){
        super("playScene")
    }

    preload(){
        //load things here
    }

    create(){
        //initialize here

        //text configuration
        let textConfig = {
            fontFamily: 'Courier',
            fontSize: '28px',
            backgroundColor: '#F3B141',
            color: '#843605',
            align: 'right',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 0
        }

        this.add.text(100,100,'pong',textConfig);
        console.log('is anyone there?');
    }

    update(){
        //run game here
    }


}