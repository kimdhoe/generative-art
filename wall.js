/**
 * An example of a Sol LeWitt inspired "Wall Drawing" using
 * a simple generative algorithm.
 *
 * The instructions for this mural:
 *
 * - Using a 6x6 grid of evenly spaced points
 * - Connect two random points on the grid; forming a trapezoid with two
 *   parallel sides extending down
 * - Fill the trapezoid with a colour, then stroke with the background colour
 * - Find another two random points and repeat; continuing until all grid points
 *   are exhausted
 * - Layer the shapes by the average Y position of their two grid points
 */

const canvasSketch = require('canvas-sketch')
const random = require('canvas-sketch-util/random')
const { lerp } = require('canvas-sketch-util/math')
const palettes = require('nice-color-palettes/1000.json')

// A Point is an object: { x: number
//                       , y: number
//                       }
//   - x and y represent x / y coordinates respectively.

// A Grid is a Point[].

// A Shape is an object: { color:    string
//                       , path:     Path[]
//                       , averageY: number
//                       }

// A Path is a tuple: [ Point, Point, Point, Point ]
//   - bottom left, top left, top right, bottom right

const COUNT = 6
const MARGIN = 0
const LINE_WIDTH = 25
const settings = {
  dimensions: [ 2048, 2048 ]
}

// makeGrid :: number * number * number * number -> Grid
// Given a row/column count, horizontal/vertical margin, width and height,
// produces a grid.
const makeGrid = ({ count, margin, width, height }) => {
  const points = []

  for (let x = 0; x < count; x++) {
    for (let y = 0; y < count; y++) {
      const u = x / (count - 1)
      const v = y / (count - 1)
      const px = lerp(margin, width - margin, u)
      const py = lerp(margin, height - margin, v)

      points.push({
        x: px,
        y: py,
      })
    }
  }

  return points
}

// getShapes :: Grid * number -> Shape[]
// effect. Given a grid data, height, margin and a palette,
// produces random shapes sorted by the average Y position.
const getShapes = (grid, height, margin, palette) => {
  const shapes = []

  let points = [ ...grid ]

  while (points.length >= 2) {
    const { y } = points[0]

    points = random.shuffle(points)
    const a = points.shift()
    const b = points.shift()

    // skip if two points are on the same y axis
    if (a.y === b.y) {
      if (points.every(point => point.y === y)) break
      continue
    }

    const bottomY = height - margin
    const shape = {
      color: random.pick(palette),
      path: [
        {
          x: a.x,
          y: bottomY,
        },
        a,
        b,
        {
          x: b.x,
          y: bottomY,
        }
      ],
      averageY: (a.y + b.y) / 2,
    }

    shapes.push(shape)
  }

  shapes.sort((a, b) => a.averageY - b.averageY)

  return shapes
}


const sketch = ({ width, height }) => {
  const nColors = random.rangeFloor(1, 6)
  const palette = random.shuffle(random.pick(palettes)).slice(0, nColors)
  const points = makeGrid({
    width,
    height,
    count: COUNT,
    margin: MARGIN,
  })
  const shapes = getShapes(points, height, MARGIN, palette)

  return ({ context, width, height }) => {
    context.globalAlpha = 1
    context.fillStyle = 'white'
    context.fillRect(0, 0, width, height)

    shapes.forEach(({ path, color }) => {
      // draw lines
      context.beginPath()
      path.forEach(({ x, y }) => {
        context.lineTo(x, y)
      })
      context.closePath()

      // trapezoid with a background color
      context.globalAlpha = 0.85
      context.fillStyle = color
      context.fill()

      // outline
      context.lineWidth = LINE_WIDTH
      context.lineJoin = context.lineCap = 'round'
      context.globalAlpha = 1
      context.strokeStyle = 'white'
      context.stroke()
    })
  }
}

canvasSketch(sketch, settings)
