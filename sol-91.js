/**
 * Wall Drawing #91 (1971)
 *
 * A six-inch (15 cm) grid covering the wall.
 * Within each square, not straight lines from side to side, using red, yellow and blue pencils.
 * Each square contains at least one line of each color.
 */

const canvasSketch = require('canvas-sketch')
const random = require('canvas-sketch-util/random')

const settings = {
  dimensions: [ 500, 500 ]
}

const gridCount = 6
const lineWidth = 2.2
const palette = [ '#c92a2a', '#e67700', '#1864ab' ]

const sketch = () => {
  return ({ context, width, height }) => {
    const cellWidth = width / gridCount
    const cellHeight = height / gridCount

    context.fillStyle = 'white'
    context.fillRect(0, 0, width, height)

    for (let i = 0; i < gridCount; i++) {
      if (i) {
        context.beginPath()
        context.moveTo(0, cellHeight * i)
        context.lineTo(width, cellHeight * i)
        context.moveTo(cellWidth * i, 0)
        context.lineTo(cellWidth * i, height)
        context.strokeStyle = '#ddd'
        context.lineWidth = lineWidth * 0.4
        context.stroke()
      }

      for (let j = 0; j < gridCount; j++) {
        drawCell(context, i * cellWidth, j * cellHeight, (i + 1) * cellWidth, (j + 1) * cellHeight)
      }
    }
  }
}

const drawCell = (context, ax, ay, bx, by) => {
  palette.forEach(color => {
    drawRandomLine(context, ax, ay, bx, by, color)
  })

  const t = random.rangeFloor(0, 9)

  for (let i = 0; i < t; i++) {
    const c = random.pick(palette)
    drawRandomLine(context, ax, ay, bx, by, c)
  }
}

const drawRandomLine = (context, ax, ay, bx, by, color) => {
  const isHorizontal = random.pick([ true, false ])
  const control = {
    x: random.range(ax, bx),
    y: random.range(ay, by),
  }
  let start = null
  let end = null

  if (isHorizontal) {
    start = {
      x: ax,
      y: random.range(ay, by),
    }
    end = {
      x: bx,
      y: random.range(ay, by),
    }
  } else {
    start = {
      x: random.range(ax, bx),
      y: ay,
    }
    end = {
      x: random.range(ax, bx),
      y: by,
    }
  }

  context.beginPath()
  context.moveTo(start.x, start.y)
  context.quadraticCurveTo(control.x, control.y, end.x, end.y)
  context.strokeStyle = color
  context.lineWidth = lineWidth
  context.stroke()
}

canvasSketch(sketch, settings)

