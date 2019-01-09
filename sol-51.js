const canvasSketch = require('canvas-sketch')
const random = require('canvas-sketch-util/random')

// A Rect is a tuple: [ Point, Point, Point, Point ]
// A Point is an object: { x: number
//                       , y: number
//                       }

const settings = {
  dimensions: [ 700, 650 ]
}

const sketch = () => {
  return ({ context, width, height }) => {
    const windows = getWindows(width, height, 20)
    const points = findAllPoints(windows, width, height)

    context.fillStyle = 'white'
    context.fillRect(0, 0, width, height)

    connectPoints(context, points)
    drawRects(context, windows)
  }
}

const findAllPoints = (windows, width, height) => {
  return [
    ...windows.reduce(
      (acc, ps) => [ ...acc, ...ps ],
      [],
    ),
    { x: 0, y: 0 },
    { x: width, y: 0 },
    { x: width, y: height },
    { x: 0, y: height },
  ]
}

const connectPoints = (context, points) => {
  points.forEach(p => {
    points.forEach(q => {
      context.beginPath()
      context.moveTo(p.x, p.y)
      context.lineTo(q.x, q.y)
      context.lineWidth = 0.7
      context.strokeStyle = '#999'
      context.stroke()
    })
  })
}

const drawRects = (context, rects) => {
  rects.forEach(([ p1, p2, p3, p4 ]) => {
    context.beginPath()
    context.moveTo(p1.x, p1.y)
    context.lineTo(p2.x, p2.y)
    context.lineTo(p3.x, p3.y)
    context.lineTo(p4.x, p4.y)
    context.lineTo(p1.x, p1.y)
    context.lineWidth = 3
    context.strokeStyle = '#555'
    context.stroke()
    context.fill()
  })
}

const getWindows = (width, height, margin) => {
  const windows = []

  for (let i = 0; i < 3; i++) {
    const windowWidth = random.rangeFloor(width / 6, width / 4)
    const windowHeight = random.rangeFloor(height / 6, height / 4)
    const a = {
      x: random.rangeFloor(margin, width - windowWidth - margin),
      y: random.rangeFloor(margin, height - windowHeight - margin),
    }
    const b = {
      x: a.x + windowWidth,
      y: a.y,
    }
    const c = {
      x: a.x + windowWidth,
      y: a.y + windowHeight,
    }
    const d = {
      x: a.x,
      y: a.y + windowHeight,
    }
    const window = [ a, b, c, d ]

    if (windows.every(w => !isCollapsing(w, window))) {
      windows.push(window)
    }
  }

  return windows
}

const isCollapsing = (r1, r2) => {
  const r1Left = r1[0].x
  const r1Right = r1[1].x
  const r2Left = r2[0].x
  const r2Right = r2[1].x
  const r1Top = r1[0].y
  const r1Bottom = r1[2].y
  const r2Top = r2[0].y
  const r2Bottom = r2[2].y

  return r1Left <= r2Right && r1Right >= r2Left && r1Top <= r2Bottom && r1Bottom >= r2Top
}

canvasSketch(sketch, settings)
