class Board {
  constructor(board = { rows: 5, cols: 5 }) {
    if(Array.isArray(board)) {
      this.board = board
    } else {
      this.board = Board.random(board)
    }
  }

  countCellNeighbors(row, col) {
    const topLeft = this.board[row-1] ? this.board[row-1][col-1] : 0
    const top = this.board[row-1] ? this.board[row-1][col] : 0
    const topRight = this.board[row-1] ? this.board[row-1][col+1] : 0
    const left = this.board[row] ? this.board[row][col-1] : 0
    const right = this.board[row] ? this.board[row][col+1] : 0
    const botLeft = this.board[row+1] ? this.board[row+1][col-1] : 0
    const bot = this.board[row+1] ? this.board[row+1][col] : 0
    const botRight = this.board[row+1] ? this.board[row+1][col+1] : 0

    return [ topLeft, top, topRight, left, right, botLeft, bot, botRight ]
      .reduce((a, b) => typeof b === 'number' ? a + b : a, 0)
  }

  tick() {
    const newBoard = []
    this.board.forEach((row, rowIndex) => {
      newBoard[rowIndex] = []
      row.forEach((col, colIndex) => {
        const currentCell = this.board[rowIndex][colIndex]
        const livingNeighbors = this.countCellNeighbors(rowIndex, colIndex)

        if(currentCell) {
          newBoard[rowIndex][colIndex] = livingNeighbors === 2 || livingNeighbors === 3  ? 1 : 0
        } else {
          newBoard[rowIndex][colIndex] = livingNeighbors === 3 ? 1 : 0
        }
      })
    })

    this.board = newBoard
    return this // returning this for chaining
  }

  static random({ rows, cols }) {
    const arr = []

    for(var rowCount = 0; rowCount < rows; rowCount++) {
      arr[rowCount] = []

      for(var colCount = 0; colCount < cols; colCount++) {
        arr[rowCount][colCount] = Math.floor(Math.random() * 2)
      }
    }

    return arr
  }

  render() {
    return this.board
      .map(row => row.map(cell => cell ? '○' : ' ').join(' '))
      .join('\n')
  }
}

module.exports = { Board }
