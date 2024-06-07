//
// Saw class, extension of sprite, moving trap
//
class Saw extends Sprite{
  constructor({
    imageSrc,
    frameRate,
    animations,
    loop,
    x,
    y,
  }) {
    super({imageSrc, frameRate, animations, loop})
    // Initial position of the saw
    this.position = {
      x: x,
      y: y,
    }

    // Initial velocity of the saw
    this.velocity = {
      x: 0,
      y: 3,
    }

    // Initial direction of the saw, keep in mind TODO above
    this.direction = 'down'

    // Range of where the saw goes
    // TODO: add x position for horizontal saws maybe?
    this.minY = this.position.y;
    this.maxY = this.position.y + 189;

  }

  update() {
    // Update hitbox
    this.updateHitbox()

    // Updates direction and velocity on y
    this.updateYPosition();

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
      height: 38, // height of the hitbox
    }
  }

// Updates the velcity, which updates position
updateYPosition() {
  this.position.y += this.velocity.y;
  if(this.direction == 'down' && this.position.y == this.maxY){
    this.direction = 'up'
    this.velocity.y = -3
  } else if (this.direction == 'up' && this.position.y == this.minY){
    this.direction = 'down'
    this.velocity.y = 3
  }
}


}
