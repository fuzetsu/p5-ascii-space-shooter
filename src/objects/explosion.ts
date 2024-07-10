export class Explosion {
  pos: p5.Vector
  timer: number
  char: string
  finished = false

  constructor(x: number, y: number) {
    this.pos = new p5.Vector(x, y)
    this.timer = 30
    this.char = `'.\\|/.'
(\\   /)
- -O- -
(/   \\)
.'/|\\'.`
  }

  draw() {
    push()
    fill(255, 0, 0)
    translate(this.pos)
    textAlign('center', 'center')
    text(this.char, 0, 0)
    pop()
  }

  move() {
    this.timer -= 1
    this.finished = this.timer <= 0
  }
}
