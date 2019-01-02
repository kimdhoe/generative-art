const canvasSketch = require('canvas-sketch')

const settings = {
  dimensions: [ 512, 512 ]
}

const results = [
  { name: 'Satisfied', count: 1043, color: 'lightblue' },
  { name: 'Neutral', count: 563, color: 'lightgreen' },
  { name: 'Unsatisfied', count: 510, color: 'pink' },
  {  name: 'No comment', count: 175, color: 'silver'  },
]

const sketch = () => {
  return ({ context, width, height }) => {
    context.fillStyle = 'white'
    context.fillRect(0, 0, width, height)

    const img = document.createElement('img')
    img.src = './player_big.png'

    const spriteW = 48
    const spriteH = 60

    img.addEventListener('load', () => {
      let cycle = 0
      setInterval(() => {
        context.clearRect(0, 0, spriteW, spriteH)
        context.drawImage(
          img,
          cycle * spriteW, 0, spriteW, spriteH,
          0, 0, spriteW, spriteH,
        )
        cycle = (cycle + 1) % 8
      }, 120)
    })

  }
}

canvasSketch(sketch, settings)
