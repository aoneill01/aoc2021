import { getInput } from '../helpers/getInput.js'
import Graph from 'node-dijkstra'

export async function part1() {
  const input = await getInput(15)
  // const input = sampleInput
  const cave = input.map((line) => line.split('').map((riskLevel) => +riskLevel))
  const graph = new Graph()

  for (let row = 0; row < cave.length; row++) {
    for (let col = 0; col < cave[row].length; col++) {
      graph.addNode(
        toKey(row, col),
        [...adjacentLocations(cave, row, col)]
          .map(({ row: r, col: c }) => getCost(cave, r, c))
          .reduce((acc, cost) => ({ ...acc, ...cost }), {})
      )
    }
  }

  const { cost } = graph.path(toKey(0, 0), toKey(cave.length - 1, cave[0].length - 1), { cost: true })

  console.log(cost)
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
  const graph = new Graph()

  for (let row = 0; row < cave.length; row++) {
    for (let col = 0; col < cave[row].length; col++) {
      graph.addNode(
        toKey(row, col),
        [...adjacentLocations(cave, row, col)]
          .map(({ row: r, col: c }) => getCost(cave, r, c))
          .reduce((acc, cost) => ({ ...acc, ...cost }), {})
      )
    }
  }

  const { cost } = graph.path(toKey(0, 0), toKey(cave.length - 1, cave[0].length - 1), { cost: true })

  console.log(cost)
}

const toKey = (row, col) => `${row},${col}`

const getCost = (cave, row, col) => ({ [toKey(row, col)]: cave[row][col] })

function* adjacentLocations(cave, row, col) {
  if (row - 1 >= 0) yield { row: row - 1, col }
  if (col - 1 >= 0) yield { row, col: col - 1 }
  if (row + 1 < cave.length) yield { row: row + 1, col }
  if (col + 1 < cave[row].length) yield { row, col: col + 1 }
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
