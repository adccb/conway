const { Board } = require('../class')

describe('Board', () => {
  it('should be able to return a random board', () => {
    const random = Board.random({ rows: 3, cols: 3 })
    expect(Array.isArray(random)).toBe(true)
  })

  it('should use the board if one is provided', () => {
    const boardArray = [ [0, 1, 0], [0, 1, 0], [0, 1, 0] ]
    const board = new Board(boardArray)
    expect(board.board).toEqual(boardArray)
  })

  it('should create a random board if none is provided', () => {
    const board = new Board()
    expect(Array.isArray(board.board)).toBe(true)
    expect(board.board.length).toBe(5)
  })

  it('should simulate one tick', () => {
    const startBoard = [ [ 1, 0, 0 ], [ 1, 1, 0 ], [ 1, 0, 1 ], ]
    const afterBoard = [ [ 1, 1, 0 ], [ 1, 0, 0 ], [ 1, 0, 0 ], ]
    const board = new Board(startBoard)
    expect(board.tick().board).toEqual(afterBoard)
  })
})
