//
// Player class, extension of sprite, controlled by the user
//
class Player extends Sprite{
  constructor({
    collisionBlocks = [],
    trapBlocks = [],
    imageSrc,
    frameRate,
    animations,
    loop
  }) {
    super({imageSrc, frameRate, animations, loop})

    // Initial position of Player
    // TODO: Consider extracting this so it can be unique each level
    this.position = {
      x: 220,
      y: 300
    }

    // Store position player started in
    this.initialX = this.position.x
    this.initialY = this.position.y

    // Initial velocity
    this.velocity = {
      x: 0,
      y: 0,
    }

    // Gravity applies to player
    this.gravity = 1;

    // Set collision and trap blocks
    this.collisionBlocks = collisionBlocks
    this. trapBlocks = trapBlocks

    // Set if player has beaten level, used so collision with win flag only happens once
    this.hasBeatLevel = false;

    this.hitSound = new sound('sounds/hit.ogg');
    this.hasWon = false;
  }

    // Update the player hitboxes and position
    update() {
      this.position.x += this.velocity.x;
      // Check for horizontal collisions (then apply gravity, then check for vertical collisions)

      // Updates the player hitbox
      this.updateHitbox()

      // Horizontal collisions
      this.checkForHorizontalCollisions()

      // Apply gravity
      this.applyGravity()

      // Updates the player hitbox again
      this.updateHitbox()

      // check for vertical collisions
      this.checkForVerticalCollisions()

      // Checks for trap collision
      this.checkForTrapCollisions()

    }

    handleInput(keys){
      this.velocity.x = 0;
      if(keys.d.pressed) {
        this.switchSprite('runRight')
        this.velocity.x = 5;
        this.lastDirection = 'right'
      }
      else if (keys.a.pressed) {
        this.switchSprite('runLeft')
         this.velocity.x = -5;
         this.lastDirection = 'left'
      }
      else {
        if(this.lastDirection === 'left'){
          this.switchSprite('idleLeft')
        } else {
          this.switchSprite('idleRight')
        }
      }
    }

    // All the functions below are called by the update method of the player, since these
    // are checks that need to happen every frame

    // Switch sprites depending on action
    switchSprite(actionName){
      if (this.image === this.animations[actionName].image) return
      this.currentFrame = 0
      this.image = this.animations[actionName].image
      this.frameRate = this.animations[actionName].frameRate
      this.frameBuffer = this.animations[actionName].frameBuffer
      this.loop = this.animations[actionName].loop
      this.currentAnimation = this.animations[actionName]
    }

    // Updates the player hitbox after movement
    updateHitbox() {
      this.hitbox = {
        position: {
          x: this.position.x, // Add offset here if needed
          y: this.position.y // add offset here if needed
        },
        width: 31, // width of the hitbox
        height: 31, // height of the hitbox
      }
    }

    // Checks for horizontal collisions
    checkForHorizontalCollisions() {
      for (let i = 0; i < this.collisionBlocks.length; i++){
        const collisionBlock = this.collisionBlocks[i]

        // if a collision exists, any side od the regtangle
        if(this.position.x <= collisionBlock.position.x + collisionBlock.width &&
           this.hitbox.position.x + this.hitbox.width >= collisionBlock.position.x &&
           this.hitbox.position.y + this.hitbox.height >= collisionBlock.position.y &&
           this.hitbox.position.y <= collisionBlock.position.y + collisionBlock.height
        ){
          // collision on x axis going to left
          if(this.velocity.x < 0 ){
            const offset = this.hitbox.position.x - this.position.x
            this.position.x = collisionBlock.position.x + collisionBlock.width - offset + 0.01
            break
          }
          // collision on x axis going to right
          if(this.velocity.x > 0 ){
            const offset = this.hitbox.position.x - this.position.x + this.hitbox.height
            this.position.x = collisionBlock.position.x - offset - 0.01
            break
          }
        }
      }
    }



    // Applies gravity
    applyGravity() {
      this.velocity.y += this.gravity;
      this.position.y += this.velocity.y;
    }

    // Checks for vertical collisions
    checkForVerticalCollisions() {
      for (let i = 0; i < this.collisionBlocks.length; i++){
        const collisionBlock = this.collisionBlocks[i]

        // if a collision exists, any side od the regtangle
        if(this.hitbox.position.x <= collisionBlock.position.x + collisionBlock.width &&
           this.hitbox.position.x + this.hitbox.width >= collisionBlock.position.x &&
           this.hitbox.position.y + this.hitbox.height >= collisionBlock.position.y &&
           this.hitbox.position.y <= collisionBlock.position.y + collisionBlock.height
        ){
          // collision on y axis, top
          if(this.velocity.y < 0 ){
            this.velocity.y = 0
            const offset = this.hitbox.position.y - this.position.y
            this.position.y = collisionBlock.position.y + collisionBlock.height- offset + 0.01
            break
          }
          // collision on y axis, bottom
          if(this.velocity.y > 0 ){
            this.velocity.y = 0
            const offset = this.hitbox.position.y - this.position.y + this.hitbox.height
            this.position.y = collisionBlock.position.y - offset - 0.01
            break
          }
        }
      }
    }

    // Checks for trap collisions
    checkForTrapCollisions() {
      for (let i = 0; i < this.trapBlocks.length; i++){
        const trapBlock = this.trapBlocks[i]

        // if a collision exists, any side of the regtangle
        if(this.position.x <= trapBlock.position.x + trapBlock.width &&
           this.hitbox.position.x + this.hitbox.width >= trapBlock.position.x &&
           this.hitbox.position.y + this.hitbox.height >= trapBlock.position.y &&
           this.hitbox.position.y <= trapBlock.position.y + trapBlock.height
        ){
          // Collided with trap, go to beginning of level
          this.position.x = 220
          this.position.y = 300
          console.log('HITTT!');
          // Play hit sound
          this.hitSound.play();
        }
      }
    }

    // Checks collision with the win flag
    checkForWinFlag(winflag, level, levels){
      if(!this.hasBeatLevel && this.position.x <= winflag.position.x + winflag.width &&
        // Offset left side of flag
         this.hitbox.position.x + this.hitbox.width >= winflag.position.x + 18 &&
         this.hitbox.position.y + this.hitbox.height >= winflag.position.y + 12 &&
         this.hitbox.position.y <= winflag.position.y + winflag.height + 12){
           this.hasBeatLevel = true;
           gsap.to(overlay, {
             opacity: 1,
             onComplete: () => {
               level++

               // Check if levels is greater than last level, if so, loop back to level 1
               levels[level].init()
               // Switch srpite to initial sprite
               gsap.to(overlay, {
                 opacity: 0,
               })
             }
           })
         }
    }

    // Check for collisions with traps
    checkForCollisionWithMovingTraps(traps){
      traps.forEach((trap) => {
        if(this.position.x <= trap.position.x + trap.width &&
           this.hitbox.position.x + this.hitbox.width >= trap.position.x &&
           this.hitbox.position.y + this.hitbox.height >= trap.position.y &&
           this.hitbox.position.y <= trap.position.y + trap.height){
             // Collided with trap, go to beginning of level
             this.position.x = 220
             this.position.y = 300

             // Play hit sound
             this.hitSound.play();
           }
      });

    }

    // Check for collisions with Hourglass
    checkForCollisionWithHourglass(hourglasses){
      hourglasses.forEach((hourglass) => {
        if(this.position.x <= hourglass.position.x + hourglass.width &&
           this.hitbox.position.x + this.hitbox.width >= hourglass.position.x &&
           this.hitbox.position.y + this.hitbox.height >= hourglass.position.y &&
           this.hitbox.position.y <= hourglass.position.y + hourglass.height){
             // Collided with hourglass, add hourglasses grabbed
             grabedHourglasses++;
             // Remove hourglass
             hourglass.position.y = 0;
             hourglass.position.y = 0;
             hourglass.width = 0;
             hourglass.height = 0;
           }
      });

    }


}
