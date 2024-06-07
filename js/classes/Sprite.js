//
// Sprite class. All objects base themselves on this class
//
class Sprite {
    constructor({ position, imageSrc, frameRate = 1, animations, frameBuffer = 2, loop = true, autoplay = true}) {
      this.position = position
      this.image = new Image();
      this.image.onload = () => {
        this.loaded = true;
        // frameRate = frame count, defualted to 1
        this.width = this.image.width / this.frameRate
        this.height = this.image.height
      }
      this.image.src = imageSrc;
      this.loaded = false;
      // Fames per spritesheet
      this.frameRate = frameRate
      this.currentFrame = 0;
      this.elapsedFrames = 0
      this.frameBuffer = frameBuffer
      this.animations = animations
      this.loop = loop
      this.autoplay = autoplay
      this.currentAnimation

      // Get name of the animations
      if(this.animations){
        for(let key in this.animations){
          const image = new Image()
          image.src = this.animations[key].imageSrc
          this.animations[key].image = image
        }
      }
    }

    // Called by the main animate function
    draw(){
      if (!this.loaded) return
      const cropbox = {
        position: {
          // Selecting frame
          x: this.width * this.currentFrame,
          y: 0
        },
        width: this.width,
        height: this.height,
      }
      c.drawImage(this.image,
        cropbox.position.x, cropbox.position.y,
        cropbox.width, cropbox.height,
        this.position.x, this.position.y,
        this.width, this.height
      )

      this.updateFrames()
    }

    play() {
      this.autoplay = true;
    }

    // Update the animation frame
    updateFrames(){
      if(!this.autoplay) return
      this.elapsedFrames++
      if(this.elapsedFrames % this.frameBuffer === 0) {
      if(this.currentFrame < this.frameRate - 1) this.currentFrame++
      else if(this.loop) this.currentFrame = 0
    }
    }
}
