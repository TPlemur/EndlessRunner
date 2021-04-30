// Blackhole.js
// Defines the black hole class

//functions and vars for outside use:

//update(whichImage) updates the position and rotation acording to whichImage
//setTranslate(x) moves the hole back x, to a certain minimum x value
//consume(target)  shrinks the target into the middle of the black hole
//collided - set to true end the game

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

    // Moves the Black Hole Waves forward
    move(){
        this.x += this.speed*globalSpeed;
    }

    // Moves Black Hole waves backwards if traveled to new planet
    setTranslate(tx){
        if(tx <= screenWidth/1.4) {
            this.scene.tweens.add({
                targets: this,
               x: {from: this.x, to: screenWidth/1.4},
               ease:'Quad',
               duration: 1000*tweenspeed,
            });
        }
        else{
            this.scene.tweens.add({
                targets: this,
               x: {from: this.x, to: tx},
               ease:'Quad',
               duration: 1000*tweenspeed,
            });
        }
    }

    //shrinks the target into the black hole
    consume(target){
        this.scene.tweens.add({
            targets: target,
            x: -5,
            y: screenHeight/2,
            displayHeight: 0,
            displayWidth: 0,
            ease: 'Quad',
            duration: 1000*3*tweenspeed/4,
        });  
    }
}
