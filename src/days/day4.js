import { getInput } from '../helpers/getInput.js'

export async function part1() {
  const input = await getInput(4)
  // const input = sampleInput

  const { selectedNumbers, boards } = parseInput(input)

  for (const number of selectedNumbers) {
    console.log(`playing ${number}`)
    boards.forEach((board) => board.play(number))
    const winner = boards.find((board) => board.hasWon())
    if (winner) {
      console.log(`found winner with score ${winner.sumOfUnmarked() * number}`)
      return
    }
  }
}

export async function part2() {
  const input = await getInput(4)
  // const input = sampleInput

  let { selectedNumbers, boards } = parseInput(input)

  for (const number of selectedNumbers) {
    console.log(`playing ${number}`)
    boards.forEach((board) => board.play(number))
    const winners = boards.filter((board) => board.hasWon())
    if (winners.length) {
      if (boards.length === 1) {
        console.log(`found last winner with score ${winners[0].sumOfUnmarked() * number}`)
        return
      }
      boards = boards.filter((b) => !winners.includes(b))
    }
  }
}

function parseInput(input) {
  const selectedNumbers = input[0].split(',').map((n) => parseInt(n, 10))
  const boards = []

  const parseBoardLine = (line) =>
    line
      .trim()
      .split(/\s+/)
      .map((n) => parseInt(n, 10))

  for (let i = 2; i < input.length; i += 6) {
    const boardValues = [
      parseBoardLine(input[i]),
      parseBoardLine(input[i + 1]),
      parseBoardLine(input[i + 2]),
      parseBoardLine(input[i + 3]),
      parseBoardLine(input[i + 4]),
    ]

    boards.push(new BingoBoard(boardValues))
  }

  return { selectedNumbers, boards }
}

class BingoBoard {
  #boardValues
  #selectedSquares = [
    [false, false, false, false, false],
    [false, false, false, false, false],
    [false, false, false, false, false],
    [false, false, false, false, false],
    [false, false, false, false, false],
  ]

  constructor(boardValues) {
    this.#boardValues = boardValues
  }

  hasWon() {
    l1: for (let row = 0; row < 5; row++) {
      for (let col = 0; col < 5; col++) {
        if (!this.#selectedSquares[row][col]) continue l1
      }
      return true
    }

    l2: for (let col = 0; col < 5; col++) {
      for (let row = 0; row < 5; row++) {
        if (!this.#selectedSquares[row][col]) continue l2
      }
      return true
    }

    return false
  }

  play(number) {
    for (let col = 0; col < 5; col++) {
      for (let row = 0; row < 5; row++) {
        if (this.#boardValues[row][col] === number) {
          this.#selectedSquares[row][col] = true
          return
        }
      }
    }
  }

  sumOfUnmarked() {
    let score = 0
    for (let col = 0; col < 5; col++) {
      for (let row = 0; row < 5; row++) {
        if (!this.#selectedSquares[row][col]) {
          score += this.#boardValues[row][col]
        }
      }
    }
    return score
  }
}

const sampleInput = `7,4,9,5,11,17,23,2,0,14,21,24,10,16,13,6,15,25,12,22,18,20,8,19,3,26,1

22 13 17 11  0
 8  2 23  4 24
21  9 14 16  7
 6 10  3 18  5
 1 12 20 15 19

 3 15  0  2 22
 9 18 13 17  5
19  8  7 25 23
20 11 10 24  4
14 21 16 12  6

14 21 17 24  4
10 16 15  9 19
18  8 23 26 20
22 11 13  6  5
 2  0 12  3  7`.split('\n')
