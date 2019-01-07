const canvasSketch = require('canvas-sketch')
const random = require('canvas-sketch-util/random')

const settings = {
  dimensions: [ 512, 512 ]
}

// Given a canvas width and the distance between two points,
// produces starting points of lines.
const getStartPoints = (width, spacing) => {
  const points = []

  for (let x = spacing / 2; x <= width - (spacing / 2); x += spacing) {
    points.push({ x, y: 0 })
  }

  return points
}

// Given a canvas context, start point of a line, canvas height,
// and the number of curves in a line, draws a curved line.
//   - height: The distance between the starting point and the ending point
//   - nCurves: The number of curve segments in a whole line.
const drawLine = (context, point, height, nCurves) => {
  const curveHeight = height / nCurves
  const width = 7

  for (let i = 0; i < nCurves; i++) {
    const contextPoint = {
      x: point.x,
      y: point.y + curveHeight * i,
    }
    const controlPoint = {
      x: point.x + (i % 2 ? -width : width),
      y: point.y + curveHeight * i + curveHeight / 2,
    }
    const endingPoint = {
      x: point.x,
      y: point.y + curveHeight * (i + 1),
    }

    context.beginPath()
    context.moveTo(contextPoint.x, contextPoint.y)
    context.quadraticCurveTo(
      controlPoint.x,
      controlPoint.y,
      endingPoint.x,
      endingPoint.y,
    )
    context.lineWidth = 0.7
    context.srokeStyle = '#777'
    context.stroke()
  }
}

const sketch = () => {
  return ({ context, width, height }) => {
    const startPoints = getStartPoints(width, 7)
    const nCurves = random.rangeFloor(5, 15)

    context.fillStyle = 'white'
    context.fillRect(0, 0, width, height)

    startPoints.forEach(point => {
      drawLine(context, point, height, nCurves)
    })
  }
}

canvasSketch(sketch, settings)
