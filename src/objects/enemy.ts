import { HEIGHT, WIDTH } from "../constants";
import { Bullet } from "./bullet";

const MAX_HEALTH = 5;

export class Enemy {
  pos: p5.Vector;
  speed: number;
  char: string;
  width: number;
  height: number;
  visible = true;
  lastShot = 0;
  health: number = MAX_HEALTH;
  alive = true;
  damagePos: p5.Vector[] = [];

  constructor() {
    this.speed = 1;
    this.char = `  /\\
 /  \\
/____\\
\\    /
 \\  /
  \\/`;
    this.width = textWidth(this.char);
    this.height = this.char.split("\n").length * textLeading();
    this.pos = new p5.Vector(random(5, WIDTH - this.width), 0);
  }

  draw() {
    push();
    fill(255);

    text(this.char, this.pos.x, this.pos.y);

    if (Date.now() - this.lastShot < 1000) {
      fill(255, 255, 0);
      text(
        `
\\    /`,
        this.pos.x,
        this.pos.y,
      );
      ellipse(this.pos.x + this.width / 2, this.pos.y + this.height / 2, 5);
    }

    let damage = MAX_HEALTH - this.health;
    fill(255, 0, 0);
    while (--damage >= 0) {
      const factor = 0.3;
      this.damagePos[damage] ??= new p5.Vector(
        random(this.width - this.width * factor),
        random(this.height - this.height * factor),
      );
      ellipse(
        this.pos.x + this.width * (factor / 2) + this.damagePos[damage].x,
        this.pos.y + this.height * (factor / 2) + this.damagePos[damage].y,
        5,
      );
    }

    pop();
  }

  takeDamage(damage: number) {
    this.health -= damage;
    this.alive = this.health > 0;
  }

  move(bullets: Bullet[]) {
    this.pos.add(0, this.speed);
    this.visible = this.pos.y < HEIGHT + 20;
    if (Math.floor(random(100)) === 25) {
      this.lastShot = Date.now();
      bullets.push(
        new Bullet(
          this.pos.x - 4 + this.width / 2,
          this.pos.y + this.height,
          -6,
        ),
      );
    }
  }
}
