const canvasSketch = require('canvas-sketch')
const { lerp } = require('canvas-sketch-util/math')

const COUNT = 25

const settings = {
  dimensions: [ 512, 512 ]
}

const makePaths = ({ x0, y0, x1, y1, vertical }) => {
  const paths = []

  for (let i = 0; i < COUNT; i++) {
    const ux = i / COUNT
    const uy = (COUNT - i) / COUNT
    const ux1 = (i + 1) / COUNT
    const uy1 = (COUNT - i - 1) / COUNT

    if (vertical) {
      paths.push([
        {
          x: lerp(x0, x1, (i + 1) / COUNT),
          y: y0,
        },
        {
          x: lerp(x0, x1, (i + 1) / COUNT),
          y: y1,
        },
      ])
    } else {
      paths.push([
        {
          x: x0,
          y: lerp(y0, y1, (i + 1) / COUNT),
        },
        {
          x: x1,
          y: lerp(y0, y1, (i + 1) / COUNT),
        },
      ])
    }

    paths.push([
      {
        x: lerp(x0, x1, ux),
        y: y0,
      },
      {
        x: x1,
        y: lerp(y0, y1, uy),
      },
    ])
    paths.push([
      {
        x: x0,
        y: lerp(y0, y1, ux1),
      },
      {
        x: lerp(x0, x1, uy1),
        y: y1,
      },
    ])
    paths.push([
      {
        x: lerp(x0, x1, ux1),
        y: y0,
      },
      {
        x: x0,
        y: lerp(y0, y1, ux1),
      },
    ])
    paths.push([
      {
        x: x1,
        y: lerp(y0, y1, ux1),
      },
      {
        x: lerp(x0, x1, ux1),
        y: y1
      },
    ])
  }

  return paths
}

const sketch = () => {
  return ({ context, width, height }) => {
    context.fillStyle = 'white'
    context.fillRect(0, 0, width, height)

    context.beginPath()
    context.moveTo(0, 0)
    context.lineTo(width, 0)
    context.lineTo(width, height / 2)
    context.moveTo(0, 0)
    context.lineTo(0, height / 2)
    context.lineTo(width / 2, height / 2)
    context.lineTo(width / 2, height)
    context.lineTo(width, height)
    context.moveTo(0, width / 2)
    context.lineTo(0, height)
    context.lineWidth = 0.7
    context.strokeStyle = '#aaa'
    context.stroke()

    const paths = []
    paths.push(...makePaths({
      x0: 0,
      y0: 0,
      x1: width / 2,
      y1: height / 2,
      vertical: true,
    }))
    paths.push(...makePaths({
      x0: width / 2,
      y0: 0,
      x1: width,
      y1: height / 2,
    }))
    paths.push(...makePaths({
      x0: 0,
      y0: height / 2,
      x1: width / 2,
      y1: height,
    }))
    paths.push(...makePaths({
      x0: width / 2,
      y0: height / 2,
      x1: width,
      y1: height,
      vertical: true,
    }))

    paths.forEach(([ a, b ]) => {
      context.beginPath(0)
      context.moveTo(a.x, a.y)
      context.lineTo(b.x, b.y)
      context.stroke()
    })
  }
}

canvasSketch(sketch, settings)
