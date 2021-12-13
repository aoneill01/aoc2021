import { getInput } from '../helpers/getInput.js'

export async function part1() {
  const input = await getInput(13)
  // const input = sampleInput

  const { points, folds } = parseInput(input)

  console.log(foldPaper(points, folds[0]).length)
}

export async function part2() {
  const input = await getInput(13)
  // const input = sampleInput

  let { points, folds } = parseInput(input)

  for (const fold of folds) {
    points = foldPaper(points, fold)
  }

  console.log(toString(points))
}

function parseInput(input) {
  let i
  const result = { points: [], folds: [] }

  for (i = 0; input[i] !== ''; i++) {
    const [x, y] = input[i].split(',')
    result.points.push({ x: +x, y: +y })
  }

  i++

  for (; i < input.length; i++) {
    const [direction, value] = input[i].substring(11).split('=')
    result.folds.push({ direction, value: +value })
  }

  return result
}

function foldPaper(points, fold) {
  const unique = new Set()
  const result = []

  for (const point of points) {
    const newPoint = { ...point }

    switch (fold.direction) {
      case 'x':
        newPoint.x = fold.value - Math.abs(newPoint.x - fold.value)
        break
      case 'y':
        newPoint.y = fold.value - Math.abs(newPoint.y - fold.value)
        break
    }

    const key = `${newPoint.x},${newPoint.y}`

    if (!unique.has(key)) {
      unique.add(key)
      result.push(newPoint)
    }
  }

  return result
}

function toString(points) {
  const maxX = Math.max(...points.map(({ x }) => x))
  const maxY = Math.max(...points.map(({ y }) => y))
  let result = ''

  for (let y = 0; y <= maxY; y++) {
    const line = points
      .filter((point) => point.y === y)
      .map((point) => point.x)
      .reduce((acc, x) => {
        acc[x] = '#'
        return acc
      }, Array(maxX).fill(' '))

    result += line.join('') + '\n'
  }

  return result
}

const sampleInput = `6,10
0,14
9,10
0,3
10,4
4,11
6,0
6,12
4,1
0,13
10,12
3,4
3,0
8,4
1,10
2,14
8,10
9,0

fold along y=7
fold along x=5`.split('\n')
