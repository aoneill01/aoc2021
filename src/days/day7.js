import { getInput } from '../helpers/getInput.js'

export async function part1() {
  const positions = await parsePositions()
  // const positions = sampleInput
  findSolution(positions, cost1)
}

export async function part2() {
  const positions = await parsePositions()
  // const positions = sampleInput
  findSolution(positions, cost2)
}

async function parsePositions() {
  const input = await getInput(7)
  return input[0].split(',').map((v) => +v)
}

function findSolution(positions, costCalculation) {
  const min = Math.min(...positions)
  let last = costCalculation(positions, min)
  for (let position = min + 1; true; position++) {
    const next = costCalculation(positions, position)
    if (next > last) {
      console.log(`Position ${position - 1} has a cost of ${last}`)
      break
    }
    last = next
  }
}

function cost1(positions, position) {
  return positions.reduce((cost, p) => cost + Math.abs(position - p), 0)
}

function cost2(positions, position) {
  return positions.reduce((cost, p) => {
    const distance = Math.abs(position - p)
    return cost + (distance * (distance + 1)) / 2
  }, 0)
}

const sampleInput = [16, 1, 2, 0, 4, 2, 7, 1, 2, 14]
