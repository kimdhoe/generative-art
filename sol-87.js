/**
 * Wall Drawing #87 (1971)
 *
 * A square divided horizontally and vertically into four equal parts,
 * each with lines and colors in four directions superimposed progressively.
 */

const canvasSketch = require('canvas-sketch')
const random = require('canvas-sketch-util/random')
const palettes = require('nice-color-palettes/200.json')

const settings = {
  dimensions: [ 700, 700 ]
}

const sketch = () => {
  return ({ context, width, height }) => {
    context.fillStyle = 'white'
    context.fillRect(0, 0, width, height)

    const [ draw1, draw2 ] = random.shuffle([ _draw1, _draw2 ])
    const [ color1, color2, color3, color4 ] = random.pick(palettes)

    draw1(context, width / 2, color1)

    context.save()
    context.translate(width / 2, 0)
    draw1(context, width / 2, color1)
    context.restore()

    context.save()
    context.translate(0, width / 2)
    draw1(context, width / 2, color1)
    context.restore()

    context.save()
    context.translate(width / 2, width / 2)
    draw1(context, width / 2, color1)
    context.restore()

    context.save()
    context.translate(width, 0)
    context.rotate(Math.PI / 2)
    draw1(context, width / 2, color2)
    context.restore()

    context.save()
    context.translate(width / 2, width / 2)
    context.rotate(Math.PI / 2)
    draw1(context, width / 2, color2)
    context.restore()

    context.save()
    context.translate(width, width / 2)
    context.rotate(Math.PI / 2)
    draw1(context, width / 2, color2)
    context.restore()

    context.save()
    context.translate(0, width / 2)
    draw2(context, width / 2, color3)
    context.restore()
    context.save()
    context.translate(width / 2, width / 2)
    draw2(context, width / 2, color3)
    context.restore()

    context.save()
    context.translate(width, width / 2)
    context.rotate(Math.PI / 2)
    draw2(context, width / 2, color4)
    context.restore()
  }
}

const _draw1 = (context, width, color) => {
  const spacing = width / 40

  for (let y = 0; y <= width; y += spacing) {
    const a = { x: 0, y }
    const b = { x: width, y }
    context.beginPath(0)
    context.moveTo(a.x, a.y)
    context.lineTo(b.x, b.y)
    context.strokeStyle = color
    context.lineWidth = 0.7
    context.stroke()
  }
}

const _draw2 = (context, width, color) => {
  const spacing = width / 40

  for (let x = 0; x <= width; x += spacing) {
    const a = { x, y: 0 }
    const b = { x: 0, y: x }
    context.beginPath()
    context.moveTo(a.x, a.y)
    context.lineTo(b.x, b.y)
    context.strokeStyle = color
    context.lineWidth = 0.7
    context.stroke()
  }
  for (let x = spacing; x <= width; x += spacing) {
    const a = { x, y: width }
    const b = { x: width, y: x }
    context.beginPath()
    context.moveTo(a.x, a.y)
    context.lineTo(b.x, b.y)
    context.strokeStyle = color
    context.lineWidth = 0.7
    context.stroke()
  }
}

canvasSketch(sketch, settings)
