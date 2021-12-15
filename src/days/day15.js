import { getInput } from '../helpers/getInput.js'
import { writeFileSync } from 'fs'

export async function part1() {
  const input = await getInput(15)
  // const input = sampleInput
  const cave = input.map((line) => line.split('').map((riskLevel) => +riskLevel))
  const risk = [...Array(cave.length)].map(() => Array(cave[0].length).fill(null))

  for (let row = 0; row < cave.length; row++) {
    for (let col = 0; col < cave[row].length; col++) {
      if (row == 0 && col == 0) {
        risk[row][col] = 0
      } else if (row == 0) {
        risk[row][col] = risk[row][col - 1] + cave[row][col]
      } else if (col == 0) {
        risk[row][col] = risk[row - 1][col] + cave[row][col]
      } else {
        risk[row][col] = Math.min(risk[row][col - 1], risk[row - 1][col]) + cave[row][col]
      }
    }
  }

  console.log(risk[cave.length - 1][cave[0].length - 1])
}

export async function part2() {
  const input = await getInput(15)
  // const input = sampleInput
  const template = input.map((line) => line.split('').map((riskLevel) => +riskLevel))
  const cave = [...Array(template.length * 5)].map(() => Array(template[0].length * 5).fill(null))
  for (let i = 0; i < 5; i++) {
    for (let j = 0; j < 5; j++) {
      const increase = i + j
      for (let row = 0; row < template.length; row++) {
        for (let col = 0; col < template[row].length; col++) {
          let value = template[row][col] + increase
          while (value > 9) value -= 9
          cave[i * template.length + row][j * template[0].length + col] = value
        }
      }
    }
  }
  const risk = [...Array(cave.length)].map(() => Array(cave[0].length).fill(null))

  for (let row = 0; row < cave.length; row++) {
    for (let col = 0; col < cave[row].length; col++) {
      if (row == 0 && col == 0) {
        risk[row][col] = 0
      } else if (row == 0) {
        risk[row][col] = risk[row][col - 1] + cave[row][col]
      } else if (col == 0) {
        risk[row][col] = risk[row - 1][col] + cave[row][col]
      } else {
        risk[row][col] = Math.min(risk[row][col - 1], risk[row - 1][col]) + cave[row][col]
      }
    }
  }

  console.log(cave, risk, risk[cave.length - 1][cave[0].length - 1])
  writeDebug(cave, risk)
}

function writeDebug(cave, risk) {
  //
}

const sampleInput = `1163751742
1381373672
2136511328
3694931569
7463417111
1319128137
1359912421
3125421639
1293138521
2311944581`.split('\n')
