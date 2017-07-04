const { Board } = require('./class')
const blessed = require('blessed')
const board = new Board({ rows: 25, cols: 45 })

var screen = blessed.screen({ smartCSR: true })
screen.title = 'my window title'
const box = blessed.box({
  top: 'center',
  left: 'center',
  width: '85%',
  height: '85%',
  content: '{center}loading...{/center}',
  tags: true,
  border: { type: 'line' },
  style: {
    fg: 'white',
    bg: '#333',
    border: { fg: '#f0f0f0' }
  }
})

screen.key(['escape', 'q', 'C-c'], () => process.exit(0))
box.focus()
screen.append(box)
screen.render()

let numCycles = 0
setInterval(() => {
  box.setContent(`{center}${board.render()}\n\n\n${numCycles} cycles completed{/center}`)
  board.tick()
  screen.render()
  numCycles++
}, 200)
