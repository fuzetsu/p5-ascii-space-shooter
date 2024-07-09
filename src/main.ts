import { HEIGHT, WIDTH } from "./constants";
import { Bullet } from "./objects/bullet";
import { Enemy } from "./objects/enemy";
import { Explosion } from "./objects/explosion";
import { Player } from "./objects/player";

let player: Player | null = null;
let enemies: Enemy[] = [];
let explosions: Explosion[] = [];
let bullets: Bullet[] = [];
let gameOver: number = -1;
let score: number = 0;
let spawnRate = 120;

// @ts-ignore
window.setup = () => {
  createCanvas(WIDTH, HEIGHT);
};

// @ts-ignore
window.draw = () => {
  textFont("menlo");
  textAlign("left");
  background(0);
  textSize(13);

  if (gameOver === 0) {
    textAlign("center");
    textSize(50);
    fill(255);
    text("GAME OVER\nPress Space", WIDTH / 2, HEIGHT / 2);
    if (keyIsDown(32)) {
      player = null;
      gameOver = -1;
    }
    return;
  }

  if (gameOver !== -1) {
    gameOver -= 1;
  }

  if (!player) {
    player = new Player();
    enemies = [];
    explosions = [];
    bullets = [];
    score = 0;
    spawnRate = 120;
  }

  if (gameOver === -1 || gameOver > 20) {
    player.draw();
  }
  if (gameOver === -1) {
    player.move(bullets);
  }

  if (gameOver === -1 && frameCount % spawnRate === 0) {
    if (spawnRate > 80 && random(10) < 2) {
      console.log("increasing spawnRate", spawnRate);
      spawnRate -= 20;
    }
    enemies.push(new Enemy());
  }

  for (let enemy of enemies) {
    enemy.draw();
    enemy.move(bullets);
  }
  enemies = enemies.filter((x) => x.visible);

  for (let bullet of bullets) {
    bullet.draw();
    bullet.move();
  }

  const allChars = [player, ...enemies];
  for (let bullet of bullets) {
    for (let character of allChars) {
      const charOrigin = new p5.Vector(
        character.pos.x + character.width / 2,
        character.pos.y + character.height / 2,
      );
      const distance = character.width / 2;
      // ellipse(charOrigin.x, charOrigin.y, 5, 5);
      if (charOrigin.dist(bullet.pos) < distance) {
        bullet.visible = false;
        if (character === player) {
          if (gameOver === -1) gameOver = 50;
          explosions.push(new Explosion(charOrigin.x, charOrigin.y));
        } else if (character instanceof Enemy) {
          character.takeDamage(2.5);
          if (!character.alive) {
            explosions.push(new Explosion(charOrigin.x, charOrigin.y));
            score += 1;
            enemies = enemies.filter((x) => x !== character);
          }
        }
      }
    }
  }

  bullets = bullets.filter((x) => x.visible);

  for (let explosion of explosions) {
    explosion.draw();
    explosion.move();
  }
  explosions = explosions.filter((x) => !x.finished);

  const entityCount = 1 + bullets.length + explosions.length + enemies.length;
  // text('player bullets ' + player.bullets.length, 3, HEIGHT - 20)
  text("entities " + entityCount, 3, HEIGHT - 5);
  text("score " + score, 3, HEIGHT - 5 - textLeading());
};
