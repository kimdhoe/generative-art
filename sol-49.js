const canvasSketch = require('canvas-sketch')
const random = require('canvas-sketch-util/random')

const PALETTE = [
  '#343a40',
  '#e03131',
  '#9c36b5',
  '#3b5bdb',
  '#0c8599',
  '#099268',
  '#f08c00',
]

const settings = {
  dimensions: [ 650, 350 ]
}

const sketch = () => {
  return ({ context, width, height }) => {
    const partWidth = width / 15
    const spacing = partWidth / 7
    const palette = random.shuffle(PALETTE)
    const drawFns = random.shuffle([ drawVertical, drawHorizontal, drawRightDiagonal, drawLeftDiagonal ])
    const sets = powerSet([ 0, 1, 2, 3 ]).filter(s => s.length).sort((a, b) => a.length - b.length)

    context.fillStyle = 'white'
    context.fillRect(0, 0, width, height)
    context.beginPath()
    context.moveTo(0, 0)
    context.lineTo(width, 0)
    context.lineTo(width, height)
    context.lineTo(0, height)
    context.lineTo(0, 0)
    context.lineWidth = 0.9
    context.strokeStyle = '#777'
    context.stroke()

    sets.forEach((set, i) => {
      set.forEach(v => {
        const draw = drawFns[v]
        draw(context, palette[v], spacing, i * partWidth, 0, (i + 1) * partWidth, height)
      })
    })
  }
}

const drawVertical = (context, color, spacing, x0, y0, x1, y1) => {
  for (let x = x0; x <= x1; x += spacing) {
    context.beginPath()
    context.moveTo(x, y0)
    context.lineTo(x, y1)
    context.lineWidth = 0.7
    context.strokeStyle = color
    context.stroke()
  }
}

const drawHorizontal = (context, color, spacing, x0, y0, x1, y1) => {
  for (let y = y0; y <= y1; y += spacing) {
    context.beginPath()
    context.moveTo(x0, y)
    context.lineTo(x1, y)
    context.lineWidth = 0.7
    context.strokeStyle = color
    context.stroke()
  }
}

const drawRightDiagonal = (context, color, spacing, x0, y0, x1, y1) => {
  const h = x1 - x0
  const gap = Math.sqrt(2 * spacing * spacing)

  for (let y = y0; y <= y1 + h; y += gap) {
    context.beginPath()
    context.moveTo(x0, y)
    context.lineTo(x1, y - h)
    context.lineWidth = 0.7
    context.strokeStyle = color
    context.stroke()
  }
}

const drawLeftDiagonal = (context, color, spacing, x0, y0, x1, y1) => {
  const h = x1 - x0
  const gap = Math.sqrt(2 * spacing * spacing)

  for (let y = y0 - h; y <= y1; y += gap) {
    context.beginPath()
    context.moveTo(x0, y)
    context.lineTo(x1, y + h)
    context.lineWidth = 0.7
    context.strokeStyle = color
    context.stroke()
  }
}

const powerSet = set =>
  set.reduce(
    (subsets, x) => [
      ...subsets,
      ...subsets.map(subset => [ x, ...subset ])
    ],
    [ [] ],
  )

canvasSketch(sketch, settings)
