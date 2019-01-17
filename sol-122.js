const canvasSketch = require('canvas-sketch')
const random = require('canvas-sketch-util/random')

const settings = {
  dimensions: [ 500, 500 ]
}

const LINE_WIDTH = 3

const sketch = () => {
  return ({ context, width, height }) => {
    context.fillStyle = 'white'
    context.fillRect(0, 0, width, height)

    const t = 9

    const cellWidth = width / t
    const cellHeight = height /t

    for (let i = 0; i < t; i++) {
      for (let j = 0; j < t; j++) {
        drawCell1(context, cellWidth * i, cellHeight * j, cellWidth * (i + 1), cellHeight * (j + 1), true)
      }
    }
  }
}

const drawCell1 = (context, ax, ay, bx, by, arc) => {
  const rotate = random.rangeFloor(0, 4)
  const centerX = ax + (bx - ax) / 2
  const centerY = ay + (by - ay) / 2

  context.save()

  context.translate(ax + (bx - ax) / 2, ay + (by - ay) / 2)
  context.rotate(rotate * Math.PI / 2)
  context.translate(-(ax + (bx - ax) / 2), -(ay + (by - ay) / 2))

  context.translate(-(bx - ax) / 2, (bx - ax) / 2)
  context.beginPath()
  context.arc(centerX, centerY, bx - ax, Math.PI * -0.5, 0)
  context.lineWidth = LINE_WIDTH
  context.lineCap = 'round'
  context.strokeStyle = 'black'
  context.stroke()
  context.translate(-(-(bx - ax) / 2), -(bx - ax) / 2)

  const f = random.pick([
    drawRightDiagonal,
    drawHorizontal,
    drawVertical,
    drawBrokenLine,
    drawNotStraightLine,
  ])

  f(context, ax, ay, bx, by)

  context.restore()
}

const drawNotStraightLine = (context, ax, ay, bx, by) => {
  const center = {
    x: (ax + bx) / 2,
    y: (ay + by) / 2,
  }

  context.beginPath()
  context.moveTo(bx, ay)

  context.quadraticCurveTo(center.x, ay, center.x, center.y)
  context.quadraticCurveTo(center.x, by, ax, by)
  context.lineWidth = LINE_WIDTH
  context.lineCap = 'round'
  context.strokeStyle = 'black'
  context.stroke()
}

const drawBrokenLine = (context, ax, ay, bx, by) => {
  const f = random.pick([
    drawBrokenLine1,
    drawBrokenLine2,
    drawBrokenLine3,
  ])

  f(context, ax, ay, bx, by)
}

const drawBrokenLine1 = (context, ax, ay, bx, by) => {
  context.beginPath()
  context.moveTo(bx, ay)
  context.lineTo(bx - (bx - ax) / 3, by - (by - ay) / 3)
  context.lineTo(ax, by)
  context.strokeStyle = 'black'
  context.lineWidth = LINE_WIDTH
  context.lineCap = 'round'
  context.stroke()
}
const drawBrokenLine2 = (context, ax, ay, bx, by) => {
  context.beginPath()
  context.moveTo(bx, ay)
  context.lineTo(ax + (bx - ax) / 3, ay + (by - ay) / 3)
  context.lineTo(ax, by)
  context.strokeStyle = 'black'
  context.lineWidth = LINE_WIDTH
  context.lineCap = 'round'
  context.stroke()
}
const drawBrokenLine3 = (context, ax, ay, bx, by) => {
  context.beginPath()
  context.moveTo(ax, (by + ay) / 2)
  context.lineTo((bx + ax) / 2, (by + ay) / 2)
  context.lineTo(bx, ay)
  context.strokeStyle = 'black'
  context.lineWidth = LINE_WIDTH
  context.lineCap = 'round'
  context.stroke()
}

const drawRightDiagonal = (context, ax, ay, bx, by) => {
  context.beginPath()
  context.moveTo(bx, ay)
  context.lineTo(ax, by)
  context.strokeStyle = 'black'
  context.lineWidth = LINE_WIDTH
  context.lineCap = 'round'
  context.stroke()
}

const drawHorizontal = (context, ax, ay, bx, by) => {
  context.beginPath()
  context.moveTo(ax, (by + ay) / 2)
  context.lineTo(bx, (by + ay) / 2)
  context.lineWidth = LINE_WIDTH
  context.lineCap = 'round'
  context.strokeStyle = 'black'
  context.stroke()
}

const drawVertical = (context, ax, ay, bx, by) => {
  context.beginPath()
  context.moveTo((bx + ax) / 2, ay)
  context.lineTo((bx + ax) / 2, by)
  context.lineWidth = LINE_WIDTH
  context.lineCap = 'round'
  context.strokeStyle = 'black'
  context.stroke()
}

canvasSketch(sketch, settings)
