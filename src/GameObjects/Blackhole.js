// Blackhole.js
// Defines the black hole class

class Blackhole extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture){
        super(scene, x, y, texture);
        scene.add.existing(this);

        this.rotation = 0; //Rotation of the black hole
        this.collided = false;
        
        //Following used for Black Hole Waves random movement
        this.randomY; 
        this.movementSpeed = 0.5;
        this.lockRandom = false;
        this.lockDirection = false;

        //Following used for Black Hole/Black Hole Waves Movement to the Right
        this.speed = holeSpeed;
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
                    this.randomY = this.y + Math.floor(Math.random() * 100) + 1;
                }
                else{
                    this.randomY = this.y - Math.floor(Math.random() * 100) + 1;
                }

                this.lockRandom = true;
            }
            else{
                this.randomWaveMovement();
            }

            this.move();
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


    // Moves the Black Hole Waves forward
    move(){
        this.x += this.speed;
    }

    // Moves Black Hole waves backwards if traveled to new planet
    setTranslate(tx){
        if(tx <= screenWidth/1.4) {
            this.scene.tweens.add({
                targets: this,
               x: {from: this.x, to: screenWidth/1.4},
               ease:'Quad',
               duration: 2000,
            });
        }
        else{
            this.scene.tweens.add({
                targets: this,
               x: {from: this.x, to: tx},
               ease:'Quad',
               duration: 2000,
            });
        }
    }

    setCollision(check){
        this.collided = check;
    }

    getCollision(){
        return this.collided;
    }
}