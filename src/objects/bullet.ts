import { HEIGHT } from '../constants'

export class Bullet {
  pos: p5.Vector
  speed: number
  char: string
  visible = true

  constructor(x: number, y: number, speed = 10) {
    this.pos = new p5.Vector(x, y)
    this.speed = speed
    this.char = '|'
  }

  draw() {
    fill(255)
    text(this.char, this.pos.x, this.pos.y)
  }

  move() {
    this.pos.sub(0, this.speed)
    this.visible = this.pos.y > 0 && this.pos.y < HEIGHT + 20
  }
}
