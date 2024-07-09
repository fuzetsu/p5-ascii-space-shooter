import { WIDTH, HEIGHT } from "../constants";
import { Bullet } from "./bullet";

export class Player {
  char: string;
  width: number;
  height: number;
  pos: p5.Vector;
  speed: number = 7;
  lastShot = 0;

  constructor() {
    this.char = `   /\\
  (  )
  (  )
 /|/\\|\\
/_||||_\\`;
    this.width = textWidth(this.char);
    this.height = this.char.split("\n").length * textLeading();

    this.pos = new p5.Vector(WIDTH / 2 - this.width / 2, HEIGHT - 80);
  }

  draw() {
    fill(255);
    text(this.char, this.pos.x, this.pos.y);
  }

  move(bullets: Bullet[]) {
    const shooting = keyIsDown(32);
    const speedPenalty = shooting ? 3 : 0;

    if (keyIsDown(LEFT_ARROW) && this.pos.x > 5 - this.width / 2) {
      this.pos.sub(this.speed - speedPenalty);
    }
    if (keyIsDown(RIGHT_ARROW) && this.pos.x < WIDTH - 5 - this.width / 2) {
      this.pos.add(this.speed - speedPenalty);
    }
    if (shooting && Date.now() - this.lastShot > 200) {
      this.lastShot = Date.now();
      bullets.push(
        new Bullet(this.pos.x + -4 + this.width / 2, this.pos.y - 12),
      );
    }
  }
}
