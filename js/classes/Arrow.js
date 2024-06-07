//
// Arrow class, extension of sprite, moving trap
// Arrows will go from right to left, might add from up and down later
//
class Arrow extends Sprite{
  constructor({
    imageSrc,
    frameRate,
    animations,
    loop,
    startX,
    startY,
  }) {
    super({imageSrc, frameRate, animations, loop})
    // Initial position of the arrow
    this.position = {
      x: startX,
      y: startY,
    }

    // Initial velocity of the arrow
    this.velocity = {
      x: -5,
      y: 0,
    }


  }

  // Called by the main game loop in index.js
  update() {

    // Update hitbox
    this.updateHitbox()

    // Updates direction and velocity on y
    this.updatePosition();

    // Update hitbox after updating velocity
    this.updateHitbox()

    // Draw sprites
    this.draw()
  }

  // Updates the Saw hitbox
  updateHitbox() {
    this.hitbox = {
      position: {
        x: this.position.x, // Add offset here if needed
        y: this.position.y // add offset here if needed
      },
      width: 38, // width of the hitbox
      height: 14, // height of the hitbox
    }
  }

// Updates the arrows position
updatePosition() {
  this.position.y += this.velocity.y;
  this.position.x += this.velocity.x;
  // Remove from view if position greater than map
  if(this.position.x < 120 ){
    this.width = 0
    this.height = 0
  }
}

}
