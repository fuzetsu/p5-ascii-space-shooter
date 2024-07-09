import { HEIGHT, WIDTH } from "../constants";
import { Bullet } from "./bullet";

export class Enemy {
  pos: p5.Vector;
  speed: number;
  char: string;
  width: number;
  height: number;
  visible = true;
  lastShot = 0;

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
    fill(255);
    text(this.char, this.pos.x, this.pos.y);
    if (Date.now() - this.lastShot < 1000) {
      ellipse(this.pos.x + this.width / 2, this.pos.y + this.height / 2, 5);
    }
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
