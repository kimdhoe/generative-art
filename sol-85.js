/**
 * Wall Drawing #85 (1971)
 *
 *   A wall is divided into four horizontal parts.
 *
 *   In the top row are four equal divisions, each with lines in a different
 *   direction.
 *   In the second row, six double combinations;
 *   in the third row, four triple combinations;
 *   in the bottom row, all four combinations superimposed.
*/

const canvasSketch = require('canvas-sketch')
const random = require('canvas-sketch-util/random')

const SPACING = 5

const settings = {
  dimensions: [ 1000, 700 ]
}

const sketch = () => {
  return ({ context, width, height }) => {
    const rawHeight = height / 4

    context.fillStyle = 'white'
    context.fillRect(0, 0, width, height)

    drawRaw0(context, 0, 0 * rawHeight, width, 1 * rawHeight)
    drawRaw1(context, 0, 1 * rawHeight, width, 2 * rawHeight)
    drawRaw2(context, 0, 2 * rawHeight, width, 3 * rawHeight)
    drawRaw3(context, 0, 3 * rawHeight, width, 4 * rawHeight)
  }
}

const drawRaw0 = (context, ax, ay, bx, by) => {
  const colWidth = (bx - ax) / 4
  const [ f0, f1, f2, f3 ] = random.shuffle([
    drawHorizontal,
    drawVertical,
    drawRightDiagonal,
    drawLeftDiagonal,
  ])

  f0(context, ax + 0 * colWidth, ay, ax + 1 * colWidth, by)
  f1(context, ax + 1 * colWidth, ay, ax + 2 * colWidth, by)
  f2(context, ax + 2 * colWidth, ay, ax + 3 * colWidth, by)
  f3(context, ax + 3 * colWidth, ay, ax + 4 * colWidth, by)
}

const drawRaw1 = (context, ax, ay, bx, by) => {
  const colWidth = (bx - ax) / 6

  for (let i = 0; i < 6; i++) {
    const [ f, g ] = random.shuffle([
      drawHorizontal,
      drawVertical,
      drawRightDiagonal,
      drawLeftDiagonal,
    ])
    f(context, ax + i * colWidth, ay, ax + (i + 1) * colWidth, by)
    g(context, ax + i * colWidth, ay, ax + (i + 1) * colWidth, by)
  }
}

const drawRaw2 = (context, ax, ay, bx, by) => {
  const colWidth = (bx - ax) / 4

  for (let i = 0; i < 4; i++) {
    const [ f, g, h ] = random.shuffle([
      drawHorizontal,
      drawVertical,
      drawRightDiagonal,
      drawLeftDiagonal,
    ])
    f(context, ax + i * colWidth, ay, ax + (i + 1) * colWidth, by)
    g(context, ax + i * colWidth, ay, ax + (i + 1) * colWidth, by)
    h(context, ax + i * colWidth, ay, ax + (i + 1) * colWidth, by)
  }
}

const drawRaw3 = (context, ax, ay, bx, by) => {
  drawHorizontal(   context, ax, ay, bx, by)
  drawVertical(     context, ax, ay, bx, by)
  drawRightDiagonal(context, ax, ay, bx, by)
  drawLeftDiagonal( context, ax, ay, bx, by)
}

const drawHorizontal = (context, ax, ay, bx, by) => {
  for (let y = ay; y <= by; y += SPACING) {
    context.beginPath()
    context.moveTo(ax, y)
    context.lineTo(bx, y)
    context.lineWidth = 0.7
    context.strokeStyle = '#999'
    context.stroke()
  }
}

const drawVertical = (context, ax, ay, bx, by) => {
  for (let x = ax; x <= bx; x += SPACING) {
    context.beginPath()
    context.moveTo(x, ay)
    context.lineTo(x, by)
    context.lineWidth = 0.7
    context.strokeStyle = '#999'
    context.stroke()
  }
}

const drawRightDiagonal = (context, ax, ay, bx, by) => {
  const portrait = isPortrait(ax, ay, bx, by)


  if (portrait) {
    let lastY
    for (let x = ax; x <= bx; x += SPACING) {
      const a = { x, y: ay }
      const b = { x: ax, y: ay + (x - ax) }
      lastY = ay + (x - ax)

      context.beginPath()
      context.moveTo(a.x, a.y)
      context.lineTo(b.x, b.y)
      context.lineWidth = 0.7
      context.strokeStyle = '#999'
      context.stroke()
    }
    for (let y = lastY; y <= by; y += SPACING) {
      if (y  === lastY) {
        lastY = y - (bx - ax)
        continue
      }
      lastY = y - (bx - ax)
      context.beginPath()
      context.moveTo(ax, y)
      context.lineTo(bx, lastY)
      context.lineWidth = 0.7
      context.strokeStyle = '#999'
      context.stroke()
    }
    for (let y = lastY + SPACING; y <= by; y += SPACING) {
      context.beginPath()
      context.moveTo(bx, y)
      context.lineTo(bx - (by - y), by)
      context.lineWidth = 0.7
      context.strokeStyle = '#999'
      context.stroke()
    }
  } else {
    let lastX
    for (let y = ay; y <= by; y += SPACING) {
      const a = { x: ax, y }
      const b = { x: ax + (y - ay), y: ay }
      lastX = ax + (y - ay)

      context.beginPath()
      context.moveTo(a.x, a.y)
      context.lineTo(b.x, b.y)
      context.lineWidth = 0.7
      context.strokeStyle = '#999'
      context.stroke()
    }
    for (let x = lastX; x <= bx; x += SPACING) {
      if (x  === lastX) {
        lastX = x - (by - ay)
        continue
      }
      lastX = x - (by - ay)
      context.beginPath()
      context.moveTo(x, ay)
      context.lineTo(lastX, by)
      context.lineWidth = 0.7
      context.strokeStyle = '#999'
      context.stroke()
    }
    for (let x = lastX + SPACING; x <= bx; x += SPACING) {
      context.beginPath()
      context.moveTo(x, by)
      context.lineTo(bx, by - (bx - x))
      context.lineWidth = 0.7
      context.strokeStyle = '#999'
      context.stroke()
    }
  }
}

const drawLeftDiagonal = (context, ax, ay, bx, by) => {
  const portrait = isPortrait(ax, ay, bx, by)

  if (portrait) {
    let lastY
    for (let x = ax; x <= bx; x += SPACING) {
      const a = { x, y: by }
      const b = { x: ax, y: by - (x - ax) }
      lastY = by - (x - ax)

      context.beginPath()
      context.moveTo(a.x, a.y)
      context.lineTo(b.x, b.y)
      context.lineWidth = 0.7
      context.strokeStyle = '#999'
      context.stroke()
    }
    for (let y = lastY; y >= ay; y -= SPACING) {
      if (y  === lastY) {
        lastY = y + (bx - ax)  // y + HEIGHT === y + WIDTH
        continue
      }
      lastY = y + (bx - ax)
      context.beginPath()
      context.moveTo(ax, y)
      context.lineTo(bx, lastY)
      context.lineWidth = 0.7
      context.strokeStyle = '#999'
      context.stroke()
    }
    for (let y = lastY - SPACING; y >= ay; y -= SPACING) {
      context.beginPath()
      context.moveTo(bx, y)
      context.lineTo(bx - (y - ay), ay)
      context.lineWidth = 0.7
      context.strokeStyle = '#999'
      context.stroke()
    }
  } else {
    let lastX
    for (let y = by; y >= ay; y -= SPACING) {
      lastX = ax + (by - y)
      const a = { x: ax, y }
      const b = { x: lastX, y: by }

      context.beginPath()
      context.moveTo(a.x, a.y)
      context.lineTo(b.x, b.y)
      context.lineWidth = 0.7
      context.strokeStyle = '#999'
      context.stroke()
    }
    for (let x = lastX; x <= bx; x += SPACING) {
      if (x  === lastX) {
        lastX = lastX - (by - ay)
        continue
      }
      lastX = x - (by - ay)
      context.beginPath()
      context.moveTo(x, by)
      context.lineTo(lastX, ay)
      context.lineWidth = 0.7
      context.strokeStyle = '#999'
      context.stroke()
    }
    for (let x = lastX + SPACING; x <= bx; x += SPACING) {
      context.beginPath()
      context.moveTo(x, ay)
      context.lineTo(bx, ay + (bx - x))
      context.lineWidth = 0.7
      context.strokeStyle = '#999'
      context.stroke()
    }
  }
}

const isPortrait = (ax, ay, bx, by) => (by - ay) >= (bx - ax)

canvasSketch(sketch, settings)
