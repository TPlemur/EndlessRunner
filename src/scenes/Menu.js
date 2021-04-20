//Menu.js
//creates and populates the menu


class Menu extends Phaser.Scene{
    constructor(){
        super("menuScene");
    }
    
    preload(){
        //load things here
    }

    create(){
        //initialize window here

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

        this.add.text(100,100,'ping',textConfig);

    }

    update(){
        //change stuff here
    }

}