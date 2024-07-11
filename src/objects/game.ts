import { getHeight, getWidth } from '../util'

export class Game {
  draw() {
    push()
    fill(255)
    stroke(0)
    rect(0, 0, getWidth(), getHeight())
    pop()
  }
}
