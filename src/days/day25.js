import { getInput } from '../helpers/getInput.js'

export async function part1() {
  const input = await getInput(25)
  // const input = sampleInput
  let floor = input.map(parseLine)

  for (let step = 1; ; step++) {
    const result = doStep(floor)
    floor = result.floor
    if (!result.changed) {
      console.log(step)
      break
    }
  }
}

export async function part2() {
  // const input = await getInput(25)
}

const parseLine = (line) => line.split('')

const toString = (floor) => floor.map((row) => row.join('')).join('\n')

function doStep(floor) {
  let changed = false

  const east = floor.map((row) => row.slice(0))
  for (let row = 0; row < floor.length; row++) {
    for (let col = 0; col < floor[row].length; col++) {
      const nextCol = (col + 1) % floor[row].length
      if (floor[row][col] === '>' && floor[row][nextCol] === '.') {
        east[row][col] = '.'
        east[row][nextCol] = '>'
        changed = true
      }
    }
  }

  const south = east.map((row) => row.slice(0))
  for (let row = 0; row < east.length; row++) {
    for (let col = 0; col < east[row].length; col++) {
      const nextRow = (row + 1) % east.length
      if (east[row][col] === 'v' && east[nextRow][col] === '.') {
        south[row][col] = '.'
        south[nextRow][col] = 'v'
        changed = true
      }
    }
  }

  return { changed, floor: south }
}

const sampleInput = `v...>>.vv>
.vv>>.vv..
>>.>v>...v
>>v>>.>.v.
v>v.vv.v..
>.>>..v...
.vv..>.>v.
v.v..>>v.v
....v..v.>`.split('\n')
