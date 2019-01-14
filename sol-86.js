const canvasSketch = require('canvas-sketch')
const random = require('canvas-sketch-util/random')

const LENGTH = 120

const settings = {
  dimensions: [ 700, 700 ]
}

const sketch = () => {
  return ({ context, width, height }) => {
    context.fillStyle = 'white'
    context.fillRect(0, 0, width, height)

    const paths = getPaths(width, height)

    paths.forEach(([ a, b ]) => {
      context.beginPath()
      context.moveTo(a.x, a.y)
      context.lineTo(b.x, b.y)
      context.lineWidth = 3
      context.strokeStyle = 'black'
      context.stroke()
    })
  }
}

const getPaths = (width, height) => {
  const paths = []

  for (let i = 0; i < 1000; i++) {
    const a = {
      x: random.rangeFloor(20, width + 1 - 20),
      y: random.rangeFloor(20, height + 1 - 20),
    }
    let b = {
      x: -1,
      y: -1,
    }
    while (!(b.x >= 20 && b.x <= width - 19 && b.y >= 20 && b.y <= height - 19)) {
      const theta = 2 * Math.PI * random.range(0, 1)
      const dx = LENGTH * Math.cos(theta)
      const dy = LENGTH * Math.sin(theta)
      b.x = a.x + dx
      b.y = a.y + dy
    }

    paths.push([ a, b ])
  }

  return paths
}

canvasSketch(sketch, settings)
