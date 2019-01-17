const canvasSketch = require('canvas-sketch')
const random = require('canvas-sketch-util/random')

const settings = {
  dimensions: [ 2048, 2048 ]
}

const sketch = () => {
  return ({ context, width, height }) => {
    context.fillStyle = 'white'
    context.fillRect(0, 0, width, height)

    const t = 5

    const cellWidth = width / t
    const cellHeight = height /t

    for (let i = 0; i < t; i++) {
      for (let j = 0; j < t; j++) {
        console.log(i, j)
        drawCell(context, cellWidth * i, cellHeight * j, cellWidth * (i + 1), cellHeight * (j + 1), true)
      }
    }
  }
}

const drawCell = (context, ax, ay, bx, by, arc) => {
  const [ end, start ] = [
    random.rangeFloor(0.5, 1.5),
    random.rangeFloor(0.5, 1.5)
  ].sort()
console.log(start, end)
  console.log('')
  const startAngle = Math.PI * start
  const endAngle = Math.PI * end

  const centerX = ax + (bx - ax) / 2
  const centerY = ay + (by - ay) / 2

  // console.log(centerX, centerY)

  context.beginPath()
  context.arc(centerX, centerY, (bx - ax) / 2, startAngle, endAngle)
  context.lineWidth = 5
  context.strokeStyle = 'black'
  context.stroke()
}

canvasSketch(sketch, settings)
