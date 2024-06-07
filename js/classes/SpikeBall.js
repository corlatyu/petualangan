//
// Spike ball class, moving trap, uses pendulum algorithm
//
class SpikeBall extends Sprite{
  constructor({
    collisionBlocks = [],
    imageSrc,
    frameRate,
    animations,
    loop,
    x,
    y,
    chainLength,
  }) {
    super({imageSrc, frameRate, animations, loop})
    this.position = {
      x: 0,
      y: 0,
    }

    this.velocity = {
      x: 0,
      y: 0,
    }

    this.gravity = 1.0;

    this.collisionBlocks = collisionBlocks
    this.hasBeatLevel = false;
    this.xDirection = 'right'
    this.yDirection = 'up'

    this.angle = Math.PI / 2.0; // Adjust how high the spike ball goes changing value PI is divided by

    this.angleV = 0.0;
    this.angleA = 0.0;

    this.origin = {
      x: x,
      y: y,
    }
    this.length = chainLength;
  }

  update() {
    this.updateHitbox()
    this.updatePendulum();
    this.updateHitbox()
    this.updateLine()
    this.draw()
  }

  updateHitbox() {
    this.hitbox = {
      position: {
        x: this.position.x, // Add offset here if needed
        y: this.position.y // add offset here if needed
      },
      width: 28, // width of the hitbox
      height: 28, // height of the hitbox
    }
  }

  // pendulum motion
  updatePendulum() {
    this.force = this.gravity * Math.sin(this.angle);
    this.angleA = (-0.5 * this.force) / this.length; // Adjust speed with magic number multiplied by force
    this.angleV += this.angleA;
    this.angle += this.angleV;

    this.position.x = this.length * Math.sin(this.angle) + this.origin.x;
    this.position.y = this.length * Math.cos(this.angle) + this.origin.y;

  }

  updateLine() {
    c.beginPath();
    c.moveTo(this.origin.x, this.origin.y);
    c.lineTo(this.position.x + 14, this.position.y + 14);
    c.stroke();
  }

  // Usage:
  //traps = [
    // new SpikeBall({
    //   imageSrc: './img/traps/SpikedBall.png',
    //   frameRate: 1,
    //   animations: {}
    // }),
  //]


}
