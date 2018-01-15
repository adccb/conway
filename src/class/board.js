// @flow

type Cell = 0 | 1
type BoardArray = Array<Array<Cell>>
type BoardMap = {
  rows: number,
  cols: number
}

const sum = (arr: Array<number>) => arr.reduce((a, b) => a + b, 0)

const emptyArray = (length: number) => new Array(length).fill(undefined)
const createBoard = (rows: number, cols: number, f: Function): BoardArray => {
  return emptyArray(rows).map((_, rowIndex) => {
    return emptyArray(cols).map((_, colIndex) => f(rowIndex, colIndex))
  })
}

const numNeighbors = (board: BoardArray, row: number, col: number): number => {
  return sum([
    board[row-1] ? board[row-1][col-1] : 0,
    board[row-1] ? board[row-1][col] : 0,
    board[row-1] ? board[row-1][col+1] : 0,
      
    board[row] ? board[row][col-1] : 0,
    board[row] ? board[row][col+1] : 0,
      
    board[row+1] ? board[row+1][col-1] : 0,
    board[row+1] ? board[row+1][col] : 0,
    board[row+1] ? board[row+1][col+1] : 0,
  ])
}

class Board {
  board: BoardArray
  boardMap: BoardMap

  constructor(boardMap: BoardMap) {
    this.boardMap = boardMap

    this.board = createBoard(
      boardMap.rows, 
      boardMap.cols, 
      _ => ((Math.floor(Math.random() * 2): any) : Cell)
    )
  }

  tick() {
    // this.board = 
    const newBoard = []
    this.board.forEach((row, rowIndex) => {
      newBoard[rowIndex] = []
      row.forEach((col, colIndex) => {
        const currentCell = this.board[rowIndex][colIndex]
        const livingNeighbors = numNeighbors(this.board, rowIndex, colIndex)

        if(currentCell) {
          newBoard[rowIndex][colIndex] = livingNeighbors === 2 || livingNeighbors === 3  ? 1 : 0
        } else {
          newBoard[rowIndex][colIndex] = livingNeighbors === 3 ? 1 : 0
        }
      })
    })

    this.board = newBoard
    return this
  }

  render() {
    return this.board
      .map(row => row.map(cell => cell ? '○' : ' ').join(' '))
      .join('\n')
  }
}

module.exports = { Board }
