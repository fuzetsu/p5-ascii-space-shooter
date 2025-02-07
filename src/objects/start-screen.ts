import { Box, didBoxCollide, getHeight, getWidth } from '../util'
import { Bullet } from './bullet'
import { Player } from './player'

export class StartScreen {
  player: Player
  bullets: Bullet[] = []
  started = false

  constructor() {
    this.player = new Player(true)
  }

  draw() {
    push()

    this.player.draw()
    this.player.move(this.bullets)
    for (const bullet of this.bullets) {
      bullet.draw()
      bullet.move()
    }

    fill(255)
    stroke(255)
    textSize(50)
    textAlign('center', 'center')

    const centerX = getWidth() / 2
    const centerY = getHeight() / 2
    text('Space Shooter', centerX, centerY - textLeading())
    const box: Box = {
      x: centerX - 100,
      y: centerY,
      width: 200,
      height: textLeading() * 1.2,
    }
    if (
      didBoxCollide(box, {
        x: mouseX - 2,
        y: mouseY - 2,
        height: 4,
        width: 4,
      })
    ) {
      cursor('pointer')
      if (mouseIsPressed) {
        this.started = true
      }
    } else {
      cursor('initial')
    }
    textSize(25)
    text('START', box.x, box.y, box.width, box.height)
    noFill()
    rect(box.x, box.y, box.width, box.height)
    pop()
  }
}
