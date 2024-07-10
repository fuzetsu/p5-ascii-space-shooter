import { HEIGHT, WIDTH } from '../constants'

export class Game {
  draw() {
    push()
    fill(255)
    stroke(0)
    rect(0, 0, WIDTH, HEIGHT)
    pop()
  }
}
