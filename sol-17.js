const canvasSketch = require('canvas-sketch')

const LINE_SPACING = 4

const settings = {
  dimensions: [ 512, 512 ]
}

const drawSquare = (context, width) => {
  const paths = []

  for (let x = 0; x <= width; x += LINE_SPACING) {
    paths.push([
      { x, y: 0 },
      { x, y: width },
    ])
  }

  paths.forEach(([ a, b ]) => {
    context.beginPath()
    context.moveTo(a.x, a.y)
    context.lineTo(b.x, b.y)
    context.strokeStyle = '#777'
    context.lineWidth = 1
    context.stroke()
  })
}

const drawSquareDiagonal = (context, width) => {
  const paths = []
  const spacing = LINE_SPACING / Math.cos(Math.PI / 4)

  for (let x = 0; x <= width; x += spacing) {
    paths.push([
      { x, y: 0 },
      { x: 0, y: x },
    ])
  }

  paths.forEach(([ a, b ]) => {
    context.beginPath()
    context.moveTo(a.x, a.y)
    context.lineTo(b.x, b.y)
    context.strokeStyle = '#777'
    context.lineWidth = 1
    context.stroke()
  })
}

const drawSquareDiagonal2 = (context, width) => {
  const paths = []
  const diagonal = 2 * Math.sqrt(Math.pow(width, 2) / 2)

  for (let x = 0; x <= diagonal; x += LINE_SPACING) {
    let x1 = x

    if (x > diagonal / 2) {
      x1 = diagonal - x
    }

    paths.push([
      { x: 0, y: x },
      { x: x1, y: x },
    ])
  }

  paths.forEach(([ a, b ]) => {
    context.beginPath()
    context.moveTo(a.x, a.y)
    context.lineTo(b.x, b.y)
    context.strokeStyle = '#777'
    context.lineWidth = 1
    context.stroke()
  })
}

const sketch = () => {
  return ({ context, width, height }) => {
    const a = Math.sqrt(2 * Math.pow(width, 2)) / 2

    context.fillStyle = 'white'
    context.fillRect(0, 0, width, height)

    context.save()
    context.translate(width / 2, width / -4)
    context.rotate(Math.PI / 4)
    drawSquare(context, a)
    context.restore()

    context.save()
    context.translate(0, width)
    context.rotate(Math.PI / -4)
    drawSquare(context, a)
    context.restore()

    context.save()
    context.translate(width / 2, width / 2)
    context.rotate(Math.PI / -4)
    drawSquareDiagonal(context, a)
    context.restore()

    context.save()
    drawSquareDiagonal2(context, a)
    context.restore()
  }
}

canvasSketch(sketch, settings)
