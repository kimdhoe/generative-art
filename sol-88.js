const canvasSketch = require('canvas-sketch')
const random = require('canvas-sketch-util/random')

const settings = {
  dimensions: [ 500, 500 ]
}

const gridCount = 6
const lineWidth = 3

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
        context.strokeStyle = 'black'
        context.lineWidth = lineWidth
        context.stroke()
      }

      for (let j = 0; j < gridCount; j++) {
        drawCell(context, i * cellWidth, j * cellHeight, (i + 1) * cellWidth, (j + 1) * cellHeight)
      }
    }
  }
}

const drawCell = (context, ax, ay, bx, by) => {
  const f = random.pick([ draw1, draw2, draw3, draw4 ])
  f(context, ax, ay, bx, by)
}

const draw1 = (context, ax, ay, bx, by) => {
  const w = bx - ax
  const h = by - ay
  const n = random.rangeFloor(1, 6)

  drawLine(context, bx, ay, ax, by)

  if (n > 1) {
    for (let i = 1; i < n; i++) {
      drawLine(context, ax + w / n * i, ay, ax, ay + h / n * i)
      drawLine(context, bx, ay + h / n * i, ax + w / n * i, by)
    }
  }
}

const draw2 = (context, ax, ay, bx, by) => {
  context.save()
  context.translate(ax + (bx - ax), ay)
  context.rotate(Math.PI / 2)
  context.translate(-ax, -ay)
  draw1(context, ax, ay, bx, by)
  context.restore()
}

const draw3 = (context, ax, ay, bx, by) => {
  const w = bx - ax
  const h = by - ay
  const n = random.rangeFloor(1, 12)

  if (n > 1) {
    for (let i = 1; i < n; i++) {
      drawLine(context, ax, ay + h / n * i, bx, ay + w / n * i)
    }
  } else {
    drawLine(context, ax, (ay + by) / 2, bx, (ay + by) / 2)
  }
}

const draw4 = (context, ax, ay, bx, by) => {
  const w = bx - ax
  const h = by - ay
  const n = random.rangeFloor(1, 12)

  if (n > 1) {
    for (let i = 1; i < n; i++) {
      drawLine(context, ax + w / n * i, ay, ax + w / n * i, by)
    }
  } else {
    drawLine(context, (ax + bx) / 2, ay, (ax + bx) / 2, by)
  }
}

const drawLine = (context, ax, ay, bx, by) => {
  if (by > ay) {
    return drawLine(context, bx, by, ax, ay)
  }

  const w = bx - ax
  const h = by - ay
  const distance = Math.sqrt(w * w + h * h)
  const theta = Math.atan(h / w)

  context.save()
  context.translate(ax, ay)
  context.rotate(theta)
  context.translate(-ax, -ay)
  drawHorizontalLine(context, ax, ay, distance, 30)
  context.restore()
}

const drawHorizontalLine = (context, x, y, length, rhythm) => {
  const end = { x: x + length, y }

  while (length >= rhythm) {
    const a = {
      x: x + rhythm / 4,
      y: y - rhythm / 9,
    }
    const b = {
      x: x + 3 * rhythm / 4,
      y: y + rhythm / 9,
    }
    context.beginPath()
    context.moveTo(x, y)
    context.lineTo(a.x, a.y)
    context.lineTo(b.x, b.y)
    context.lineTo(x + rhythm, y)
    context.strokeStyle = 'black'
    context.lineWidth = lineWidth
    context.stroke()
    length = length - rhythm
    x = x + rhythm
  }

  context.beginPath()
  context.moveTo(x, y)
  context.lineTo(end.x, end.y)
  context.strokeStyle = 'black'
  context.lineWidth = lineWidth
  context.stroke()
}

canvasSketch(sketch, settings)

