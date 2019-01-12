const canvasSketch = require('canvas-sketch')
const random = require('canvas-sketch-util/random')
const palettes = require('nice-color-palettes/1000.json')

const settings = {
  dimensions: [ 512, 512 ]
}

const sketch = () => {
  return ({ context, width, height }) => {
    context.fillStyle = 'white'
    context.fillRect(0, 0, width, height)

    for (let i = 0; i < 500; i++) {
      drawRandomPath(context, width, height)
    }
  }
}

const drawRandomPath = (context, width, height) => {
  const [ a, b, c ] = getRandomPath(width, height)
  const color = random.pick(random.pick(palettes))

  context.beginPath()
  context.moveTo(a.x, a.y)
  context.quadraticCurveTo(b.x, b.y, c.x, c.y)
  context.lineWidth = 1
  context.strokeStyle = color
  context.stroke()
}

const getRandomPath = (width, height) => {
  const [ side1, side2 ] = random.shuffle([ 1, 2, 3, 4 ])
  const a = getPoint(width, height, side1)
  const b = getPoint(width, height, 0)
  const c = getPoint(width, height, side2)

  return [ a, b, c ]
}

const getPoint = (width, height, side) => {
  let x
  let y

  if (side === 1) {
    x = random.rangeFloor(0, width)
    y = 0
  } else if (side === 2) {
    x = width
    y = random.rangeFloor(0, height)
  } else if (side === 3) {
    x = random.rangeFloor(0, width)
    y = height
  } else if (side === 4) {
    x = 0
    y = random.rangeFloor(0, height)
  } else if (side === 0) {
    x = random.rangeFloor(0, width)
    y = random.rangeFloor(0, height)
  }

  return { x, y }
}

canvasSketch(sketch, settings)
