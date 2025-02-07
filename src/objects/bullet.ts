import { getHeight } from '../util'

export class Bullet {
  pos: p5.Vector
  width: number
  height: number
  speed: number
  char: string
  visible = true
  owner: 'player' | 'enemy'

  constructor(owner: Bullet['owner'], x: number, y: number, speed = 10) {
    this.owner = owner
    this.pos = new p5.Vector(x, y)
    this.speed = speed
    this.char = '|'
    this.width = textWidth(this.char)
    this.height = textLeading()
  }

  draw() {
    fill(255)
    text(this.char, this.pos.x, this.pos.y)
  }

  move() {
    this.pos.sub(0, this.speed)
    this.visible = this.pos.y > 0 && this.pos.y < getHeight() + 20
  }
}
