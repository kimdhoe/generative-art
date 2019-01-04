const canvasSketch = require('canvas-sketch')

const LINE_SPACING = 5

const settings = {
  dimensions: [ 512, 512 ]
}

const sketch = () => {
  return ({ context, width, height }) => {
    const bandWidth = width / 3

    const makePaths = () => {
      const paths = []
      const diagonalLength = Math.sqrt(2 * width * width)

      for (let x = 0; x <= diagonalLength; x += LINE_SPACING) {
        const a = { x, y: 0 }
        const b = { x, y: bandWidth }
        paths.push([ a, b ])
      }

      return paths
    }

    const drawBand = () => {
      paths.forEach(([ a, b ]) => {
        context.beginPath()
        context.moveTo(a.x, a.y)
        context.lineTo(b.x, b.y)
        context.strokeStyle = '#aaa'
        context.lineWidth = 1
        context.stroke()
      })
    }

    const paths = makePaths()

    context.fillStyle = 'white'
    context.fillRect(0, 0, width, height)

    context.save()
    context.translate(0, bandWidth)
    drawBand()
    context.restore()

    context.save()
    context.translate(bandWidth * 2, 0)
    context.rotate(Math.PI / 2)
    drawBand()
    context.restore()

    const offset = Math.sqrt(bandWidth * bandWidth / 2) / 2
    const a = Math.random() < 0.5
    if (a) {
      context.translate(-offset, height - offset)
    } else {
      context.translate(offset, -offset)
    }
    context.rotate(Math.PI / 4 * (a ? -1 : 1))
    drawBand()
  }
}

canvasSketch(sketch, settings)
