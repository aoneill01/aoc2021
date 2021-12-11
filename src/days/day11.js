import 'colors'
import readline from 'readline'
import { getInput } from '../helpers/getInput.js'

export async function part1() {
  const input = await getInput(11)
  // const input = sampleInput
  const octopuses = parseInput(input)

  console.clear()
  readline.cursorTo(process.stdout, 0, 0)
  console.log('Before any steps           ')
  printOctopuses(octopuses)
  console.log()

  let answer = 0
  for (let i = 1; i <= 100; i++) {
    answer += step(octopuses)
    readline.cursorTo(process.stdout, 0, 0)

    console.log(`After step ${`${i}`.padStart(3, ' ')}    `)
    printOctopuses(octopuses)

    await new Promise((resolve) => setTimeout(resolve, 200))
  }

  console.log(`${answer} flashes`)
}

export async function part2() {
  const input = await getInput(11)
  // const input = sampleInput
  const octopuses = parseInput(input)

  for (let i = 1; ; i++) {
    if (step(octopuses) === 100) {
      console.log(`Step ${i}`)
      break
    }
  }
}

function parseInput(input) {
  return input.map((line) => line.split('').map((energy) => +energy))
}

function printOctopuses(octopuses) {
  for (const line of octopuses) {
    console.log(line.reduce((acc, power) => acc + (power === 0 ? `${power}`.brightWhite : `${power}`.gray), ''))
  }
}

function adjacentLocations(octopuses, row, col) {
  const deltas = [
    { row: -1, col: -1 },
    { row: 0, col: -1 },
    { row: 1, col: -1 },
    { row: -1, col: 0 },
    { row: 1, col: 0 },
    { row: -1, col: 1 },
    { row: 0, col: 1 },
    { row: 1, col: 1 },
  ]
  const isValid = (rowOrCol) => rowOrCol >= 0 && rowOrCol < 10

  return deltas
    .map((delta) => ({ row: row + delta.row, col: col + delta.col }))
    .filter((loc) => isValid(loc.row) && isValid(loc.col))
}

function step(octopuses) {
  let flashCount = 0
  let flashes = incrementAllEnergy(octopuses)
  flashCount += flashes.length

  while (flashes.length > 0) {
    const newFlashes = []

    for (const flash of flashes) {
      for (const { row, col } of adjacentLocations(octopuses, flash.row, flash.col)) {
        if (octopuses[row][col] !== 0) {
          octopuses[row][col]++
          if (octopuses[row][col] > 9) {
            newFlashes.push({ row, col })
            octopuses[row][col] = 0
          }
        }
      }
    }

    flashCount += newFlashes.length
    flashes = newFlashes
  }

  return flashCount
}

function incrementAllEnergy(octopuses) {
  const result = []
  for (let row = 0; row < 10; row++) {
    for (let col = 0; col < 10; col++) {
      octopuses[row][col]++
      if (octopuses[row][col] > 9) {
        result.push({ row, col })
        octopuses[row][col] = 0
      }
    }
  }
  return result
}

const sampleInput = `5483143223
2745854711
5264556173
6141336146
6357385478
4167524645
2176841721
6882881134
4846848554
5283751526`.split('\n')
