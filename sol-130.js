/**
 * Sol LeWitt Wall Drawing #130 (1972)
 *
 * Grid and arcs from four corners.
 */

const canvasSketch = require('canvas-sketch')
const random = require('canvas-sketch-util/random')

const SPACING = 50
const LINE_WIDTH = 3

const settings = {
  dimensions: [ 600, 600 ]
}

const sketch = () => {
  return ({ context, width, height }) => {
    context.fillStyle = 'white'
    context.fillRect(0, 0, width, height)

    for (let x = 0; x <= width; x += SPACING) {
      context.beginPath()
      context.moveTo(x, 0)
      context.lineTo(x, height)
      context.lineWidth = LINE_WIDTH
      context.strokeStyle = 'black'
      context.stroke()
    }
    for (let y = 0; y <= height; y += SPACING) {
      context.beginPath()
      context.moveTo(0, y)
      context.lineTo(width, y)
      context.lineWidth = LINE_WIDTH
      context.strokeStyle = 'black'
      context.stroke()
    }

    drawArcs(context, width, height)

    context.save()
    context.translate(width / 2, height / 2)
    context.rotate(Math.PI / 2)
    context.translate(width / -2, height / -2)
    drawArcs(context, width, height)
    context.restore()

    context.save()
    context.translate(width / 2, height / 2)
    context.rotate(Math.PI / 2 * 2)
    context.translate(width / -2, height / -2)
    drawArcs(context, width, height)
    context.restore()

    context.save()
    context.translate(width / 2, height / 2)
    context.rotate(Math.PI / 2 * 3)
    context.translate(width / -2, height / -2)
    drawArcs(context, width, height)
    context.restore()
  }
}

const drawArcs = (context, width, height) => {
  const longer = Math.max(width, height)
  const length = Math.sqrt(2 * longer * longer)

  for (let x = 0; x <= length; x += SPACING) {
    context.beginPath()
    context.arc(0, 0, x, Math.PI / -2, Math.PI / 2)
    context.lineWidth = LINE_WIDTH
    context.strokeStyle = 'black'
    context.stroke()
  }
}

canvasSketch(sketch, settings)
