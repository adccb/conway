// @flow

type Cell = 0 | 1
type BoardArray = Array<Array<Cell>>
type BoardMap = {
  rows: number,
  cols: number
}

const sum = (arr: Array<number>) => arr.reduce((a, b) => a + b, 0)
const toCell = b => b ? 1 : 0
const emptyArray = (length: number) => new Array(length).fill(undefined)
const createBoard = ({ rows, cols }: BoardMap, f: Function): BoardArray => {
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

const cellLives = (cell: Cell, neighbors: number): Cell => (
  cell ? toCell(neighbors === 2 || neighbors === 3) : toCell(neighbors === 3)
)

class Board {
  board: BoardArray
  boardMap: BoardMap

  constructor(boardMap: BoardMap) {
    this.boardMap = boardMap

    this.board = createBoard(
      boardMap, 
      _ => ((Math.floor(Math.random() * 2): any) : Cell)
    )
  }

  tick() {
    this.board = createBoard(this.boardMap, (rowIndex, colIndex) => (
      cellLives(
        this.board[rowIndex][colIndex],
        numNeighbors(this.board, rowIndex, colIndex)  
      ) 
    ))
  }

  render() {
    return this.board
      .map(row => row.map(cell => cell ? '○' : ' ').join(' '))
      .join('\n')
  }
}

module.exports = { Board }
