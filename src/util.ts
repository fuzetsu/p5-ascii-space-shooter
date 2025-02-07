export const getWidth = () => Math.min(700, windowWidth - 20)
export const getHeight = () => Math.min(getWidth() * 1.7, windowHeight - 20)

export interface Box {
  x: number
  y: number
  width: number
  height: number
}
export const didBoxCollide = (box1: Box, box2: Box) => {
  return !(
    box1.x > box2.x + box2.width ||
    box2.x > box1.x + box1.width ||
    box1.y > box2.y + box2.height ||
    box2.y > box1.y + box1.height
  )
}
