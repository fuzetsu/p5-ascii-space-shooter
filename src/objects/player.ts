import { getHeight, getWidth } from '../util'
import { Bullet } from './bullet'

export class Player {
  char: string
  width: number
  height: number
  pos: p5.Vector
  lastShot = 0
  startScreen = false

  constructor(startScreen = false) {
    this.char = `   /\\
  (  )
  (  )
 /|/\\|\\
/_||||_\\`
    this.width = textWidth(this.char)
    this.height = this.char.split('\n').length * textLeading()

    this.pos = new p5.Vector(getWidth() / 2 - this.width / 2, getHeight() - 80)
    this.startScreen = startScreen
  }

  draw() {
    push()
    stroke(255)
    fill(255)
    textAlign('left')
    text(this.char, this.pos.x, this.pos.y)
    pop()
  }

  move(bullets: Bullet[]) {
    const shooting = mouseIsPressed || keyIsDown(32)
    if (shooting && Date.now() - this.lastShot > 200) {
      this.lastShot = Date.now()
      bullets.push(
        new Bullet('player', this.pos.x + -4 + this.width / 2, this.pos.y - 12),
      )
    }

    const mousePos = createVector(mouseX, mouseY)

    const offsetPos = createVector(this.width / 2, this.height / 2).add(
      this.pos,
    )
    const distance = mousePos.dist(offsetPos)
    if (distance > 5) {
      const maxSpeed = shooting ? 4 : 7
      const delta = createVector(mouseX, mouseY).sub(offsetPos)
      if (distance < this.height * 2) {
        delta.mult(0.05)
        delta.x = min(delta.x, maxSpeed)
        delta.y = min(delta.y, maxSpeed)
      } else {
        delta.normalize()
        delta.mult(maxSpeed)
      }
      this.pos.x = constrain(this.pos.x + delta.x, 10, getWidth() - this.width)
      if (!this.startScreen)
        this.pos.y = constrain(
          this.pos.y + delta.y,
          10,
          getHeight() - this.height,
        )
    }
  }
}
