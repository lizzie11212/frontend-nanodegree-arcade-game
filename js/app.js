"use strict";

let game = true;


class Creature {
  constructor(x, y, sprite, height, width) {
    this.x = x;
    this.y = y;
    this.sprite = 'images/' + sprite + '.png';
    this.height = height;
    this.width = width;
  }

  render() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
  }
}
// Enemies our player must avoid
class Enemy extends Creature{
  constructor(x,y,sprite = 'enemy-bug',height = 65,width = 95){
    super(x,y,sprite,height,width);
    this.speed = 150 * Math.floor(Math.random()*3 + 1);
  }
  // Update the enemy's position, required method for game
  // Parameter: dt, a time delta between ticks
  update(dt){
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    if (this.x > ctx.canvas.width + this.width){
      this.x = -200 * Math.floor(Math.random()*4 + 1);
      this.speed = 150 * Math.floor(Math.random()*3 + 1)
    } else {
      this.x += this.speed * dt;
    }

    // Check for collision between player and enemies
    if (player.x <= this.x + this.width &&
        player.x + player.width >= this.x &&
        player.y <= this.y + this.height &&
        player.height + player.y >= this.y) {
        //recet character's position
        player.x = 202;
        player.y = 380;
    }
  }
  // Draw the enemy on the screen, required method for game
}

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
class Player extends Creature {
  constructor(x,y,sprite='char-princess-girl',height = 75,width = 65,){
      super(x,y,sprite,height,width);
      this.player_x_speed = 101;
      this.player_y_speed = 83;
  }

  update(){
    if (game && this.y <=-35){
        game = false;
        setTimeout(() => {
            alert("You won!");
        }, 500);
    }
  }

  handleInput(keyPress){
    if (!game) return;

    if (keyPress === 'left'&& this.x - this.player_x_speed >=0 ){
        this.x -= this.player_x_speed;
    } else if (keyPress === 'right'&& this.x + this.player_x_speed < ctx.canvas.width ){
        this.x += this.player_x_speed;
    } else if (keyPress === 'down'&& this.y + this.player_y_speed < 463){
        this.y += this.player_y_speed;
    } else if (keyPress === 'up'&& this.y - this.player_y_speed >= -35){
        this.y -= this.player_y_speed;
    }
  }
}

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
let player = new Player(202,380);

const enemyPosition = [60,145,230]

let allEnemies = enemyPosition.map((y, index) => {
  return new Enemy(-100-100 * (Math.floor(Math.random()* (index+1))), y) }
);


// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});


function reset_game(){
  player = new Player(202,380);
  game = true;
}

/* Restart Button */
const restartBtn = document.querySelector(".restart");
restartBtn.addEventListener("click", reset_game);
