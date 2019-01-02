const canvasSketch = require('canvas-sketch')
const random = require('canvas-sketch-util/random')
const { lerp } = require('canvas-sketch-util/math')

const ROWS = 5
const COLS = 10
const MARGIN = 0

const settings = {
  dimensions: [ 1048, 786 ]
}

const sketch = () => {
  return ({ context, width, height }) => {
    context.fillStyle = 'white'
    context.fillRect(0, 0, width, height)

    const points = getPoints({ width, height, rows: ROWS, cols: COLS })

    points.forEach(({ x, y }) => {
      points.forEach(point => {
        if (!(point.x === x && point.y === y)) {
          context.beginPath()
          context.moveTo(x, y)
          context.lineTo(point.x, point.y)
          context.lineWidth = 0.1
          context.strokeStyle = '#333'
          context.stroke()
        }
      })
    })
  }
}

const getPoints = ({ width, height, rows = 5, cols = 10 }) => {
  const points = []

  const cellWidth = (width - 2 * MARGIN) / cols
  const cellHeight = (height - 2 * MARGIN) / rows

  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      const x = lerp(
        MARGIN + cellWidth * j,
        MARGIN + cellWidth * (j + 1),
        random.range(0.2, 0.8),
      )
      const y = lerp(
        MARGIN + cellHeight * i,
        MARGIN + cellHeight * (i + 1),
        random.range(0.2, 0.8),
      )

      points.push({ x, y })
    }
  }

  return points
}

const getPaths = points => {
  const paths = []
  let ps = [ ...points ]

  while (ps.length >= 2) {
    ps = random.shuffle(ps)

    const a = ps.shift()
    const b = ps.shift()

    paths.push([ a, b ])
  }

  return paths
}

canvasSketch(sketch, settings)
