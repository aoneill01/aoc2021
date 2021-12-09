import { getInput } from '../helpers/getInput.js'

export async function part1() {
  const input = await getInput(9)
  // const input = sampleInput
  const floor = inputToFloor(input)
  let riskLevel = 0
  for (const { row, col } of findLowPoints(floor)) {
    riskLevel += floor[row][col] + 1
  }
  console.log(riskLevel)
}

export async function part2() {
  const input = await getInput(9)
  // const input = sampleInput
  const floor = inputToFloor(input)
  const basinSizes = []
  for (const { row, col } of findLowPoints(floor)) {
    const basinSize = calculateBasinSize(floor, row, col, new Set())
    basinSizes.push(basinSize)
  }
  basinSizes.sort((a, b) => b - a)
  console.log(basinSizes.slice(0, 3).reduce((product, basinSize) => product * basinSize))
}

function calculateBasinSize(floor, row, col, seen) {
  const key = `${row},${col}`
  if (floor[row][col] >= 9 || seen.has(key)) return 0

  let result = 1
  seen.add(key)
  for (const { row: r, col: c } of adjacentLocations(floor, row, col)) {
    result += calculateBasinSize(floor, r, c, seen)
  }
  return result
}

function inputToFloor(input) {
  return input.map((line) => [...line].map((height) => +height))
}

function* findLowPoints(floor) {
  for (let row = 0; row < floor.length; row++) {
    for (let col = 0; col < floor[row].length; col++) {
      if ([...adjacentValues(floor, row, col)].every((adj) => floor[row][col] < adj)) {
        yield { row, col }
      }
    }
  }
}

function* adjacentValues(floor, row, col) {
  for (const { row: r, col: c } of adjacentLocations(floor, row, col)) {
    yield floor[r][c]
  }
}

function* adjacentLocations(floor, row, col) {
  if (row - 1 >= 0) yield { row: row - 1, col }
  if (col - 1 >= 0) yield { row, col: col - 1 }
  if (row + 1 < floor.length) yield { row: row + 1, col }
  if (col + 1 < floor[row].length) yield { row, col: col + 1 }
}

const sampleInput = `2199943210
3987894921
9856789892
8767896789
9899965678`.split('\n')
