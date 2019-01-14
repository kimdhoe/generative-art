const canvasSketch = require('canvas-sketch')

const settings = {
  dimensions: [ 500, 500 ]
}

const sketch = () => {
  return ({ context, width, height }) => {
    context.fillStyle = 'white'
    context.fillRect(0, 0, width, height)

    for (let x = 12; x <= width - 9; x += 14) {
      const a = { x, y: 0 }
      const b = { x, y: height }

      context.beginPath()
      context.moveTo(a.x, a.y)
      context.lineTo(b.x, b.y)
      context.lineWidth = 3
      context.strokeStyle = 'black'
      context.stroke()
    }
  }
}

canvasSketch(sketch, settings)
