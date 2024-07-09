import { WIDTH, HEIGHT } from "../constants";
import { Bullet } from "./bullet";

export class Player {
  char: string;
  width: number;
  height: number;
  pos: p5.Vector;
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
    const shooting = keyIsDown(32) || mouseIsPressed;
    if (shooting && Date.now() - this.lastShot > 200) {
      this.lastShot = Date.now();
      bullets.push(
        new Bullet(this.pos.x + -4 + this.width / 2, this.pos.y - 12),
      );
    }

    const mousePos = createVector(mouseX, mouseY);

    const offsetPos = createVector(this.width / 2, this.height / 2).add(
      this.pos,
    );
    const distance = mousePos.dist(offsetPos);
    if (distance > 10) {
      const delta = createVector(mouseX, mouseY).sub(offsetPos);
      if (distance < this.height * 2) {
        delta.mult(0.05);
      } else {
        delta.normalize();
        delta.mult(shooting ? 4 : 7);
      }
      this.pos.add(delta);
    }
  }
}
