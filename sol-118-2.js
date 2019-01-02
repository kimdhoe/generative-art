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
    const paths = getPaths(points)

    paths.forEach(([ a, b ]) => {
      context.beginPath()
      context.moveTo(a.x, a.y)
      context.lineTo(b.x, b.y)
      context.lineWidth = random.range(2, 5)
      context.strokeStyle = '#444'
      context.stroke()
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
        random.range(0.3, 0.7),
      )
      const y = lerp(
        MARGIN + cellHeight * i,
        MARGIN + cellHeight * (i + 1),
        random.range(0.3, 0.7),
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
