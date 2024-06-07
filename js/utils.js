//
// Utility class
//
let blockSize = 16
let rowSize = 64 // tiles in width
Array.prototype.parse2D = function() {
  const rows = []
  for(let i = 0; i < this.length; i+= rowSize){
    rows.push(this.slice(i, i + rowSize));
  }
  return rows
}

// Used for collision blocks
// Called at each level by the level initiator to create the collision map
// Result is set to the player
Array.prototype.createObjectsFrom2D = function () {
  const objects = []
  this.forEach((row, y) => {
    row.forEach((symbol, x) => {
      if(symbol === 542){
        // push a new collision into collisionblocks array
        objects.push(new CollisionBlock({
          position: {
            x: x * blockSize,
            y: y * blockSize,
          }
        }))
      }
    })
  })
  return objects
}

// Used for trap blocks (spikes)
// Result is set to the player
Array.prototype.createTrapsFrom2D = function () {
  const objects = []
  this.forEach((row, y) => {
    row.forEach((symbol, x) => {
      if(symbol === 491){
        // push a new collision into collisionblocks array
        objects.push(new TrapBlock({
          position: {
            x: x * blockSize,
            y: y * blockSize,
          }
        }))
      }
    })
  })
  return objects
}
