//
// Class to handle user inputs
//
window.addEventListener('keydown', (event) => {
  switch (event.key) {
    // Player events
    // Jump
    case 'w':
      if(player.velocity.y === 0) {
        player.velocity.y = -15;
      }
    break;

    // left
    case 'a':
      keys.a.pressed = true;
    break;

    // right
    case 'd':
      keys.d.pressed = true;
    break;

    // Game events
    // Pause menu
    case "Escape":
      pauseGame()
    break;
  }
});

// This solves weird movement of player if a and d are pressed simultaneously
window.addEventListener('keyup', (event) => {
  switch (event.key) {
    // left
    case 'a':
      keys.a.pressed = false;
    break;

    // right
    case 'd':
      keys.d.pressed = false;
    break;
  }
});
