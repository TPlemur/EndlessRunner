//Creddits.js
//Credit Screen

class Credits extends Phaser.Scene {
    constructor(){
        super("creditsScene")
    }

    preload(){
        this.load.image('backButton', './assets/creditsBackButton.png');
    }

    create(){
        this.backBtn = this.add.sprite(screenCenterX, screenCenterY + 350, 'backButton').setInteractive().setScale(2); //Initialize the button
        this.backBtn.on('pointerover', this.actionOnHover); //What happens when you hover over
        this.backBtn.on('pointerout', this.actionOnHoverOut); //What happens when you hover out
        this.backBtn.on('pointerdown', () => this.actionOnClick(this)); //What happens when you click   
    }

    update(){
        
    }

    actionOnClick(creditsScene){
        //Plays Sound effect and go to menu
        creditsScene.sound.play('launchButtonSound');
        creditsScene.scene.start("menuScene"); 
    }

    actionOnHover(){
        //Scale Button
        this.setScale(1.8); 
    }

    actionOnHoverOut(){
        //Scale Button
        this.setScale(2);
    }

}