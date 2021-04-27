// Blackhole.js
// Defines the black hole class

class Blackhole extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture,){
        super(scene, x, y, texture);
        scene.add.existing(this);

        this.rotation = 0; //Rotation of the black hole
        
        //Following used for Black Hole Waves random movement
        this.randomY; 
        this.movementSpeed = 0.5;
        this.lockRandom = false;
        this.lockDirection = false;

        //Following used for Black Hole/Black Hole Waves Movement to the Right
        this.speed = 0;
        this.setBack = 0;
    }

    // Which image will determine wheter to use the black hole or black hole waves
    update(whichImage){
        if(whichImage == 0){ // If Black Hole
            this.rotation += 0.005; //Rotate the black hole for visual sakes
        }
        else{ // If Black Hole Waves

            //Following used for randomMovement()
            if(this.lockRandom == false){
                if(this.lockDirection == false){
                    this.randomY = this.y + Math.floor(Math.random() * 200) + 1;
                }
                else{
                    this.randomY = this.y - Math.floor(Math.random() * 200) + 1;
                }

                this.lockRandom = true;
            }
            else{
                this.randomWaveMovement();
            }

            this.move(this.setBack);
        }
    } 

    // This function will randomize the Black Hole Wave movement for visual sakes
    randomWaveMovement(){
        if(this.y <= this.randomY && this.lockDirection == false){
            this.y += this.movementSpeed;
            return;
        }
        else {
            this.lockRandom = false;
            this.lockDirection = true;
        }

        if(this.y >= this.randomY && this.lockDirection == true){
            this.y -= this.movementSpeed;
            return;
        }
        else {
            this.lockRandom = false;
            this.lockDirection = false;
        }
    }

    // Sets the speed at which the Black Hole Waves advance
    setSpeed(speed){
        this.speed = speed;
    }

    // Sets how much the Black Hole Waves should go back after flying to a new planet
    setSetBack(setBack){
        this.setBack = setBack;
    }

    // Moves the Black Hole Waves forwards unless setBack calls them to move back a certain distance
    move(setBack){
        if(setBack == 0)
        {
            this.x += this.speed;
        }
        else{
            this.x -= this.setBack;
        }

        this.setBack = 0;
    }
}
