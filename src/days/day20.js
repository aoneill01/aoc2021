import { getInput } from '../helpers/getInput.js'

export async function part1() {
  const input = await getInput(20)
  // const input = sampleInput
  const { image, algorithm } = parseInput(input)
  let next = enhance(enhance(image, algorithm), algorithm)
  const lit = next.flat().filter((pixel) => pixel === 1).length
  console.log(lit)
}

export async function part2() {
  const input = await getInput(20)
  // const input = sampleInput
  const { image, algorithm } = parseInput(input)
  let next = image
  for (let i = 0; i < 50; i++) {
    next = enhance(next, algorithm)
  }
  const lit = next.flat().filter((pixel) => pixel === 1).length
  console.log(lit)
}

function enhance(image, algorithm) {
  const result = Array.from(Array(image.length), () => new Array(image[0].length))

  for (let r = 0; r < image.length; r++) {
    for (let c = 0; c < image[0].length; c++) {
      const value = getValue(image, r, c)
      result[r][c] = algorithm[value]
    }
  }

  return result
}

function getValue(image, row, col) {
  let result = 0
  for (let r = row - 1; r <= row + 1; r++) {
    for (let c = col - 1; c <= col + 1; c++) {
      if (r < 0 || r >= image.length || c < 0 || c >= image[0].length) {
        result = (result << 1) + image[row][col]
      } else {
        result = (result << 1) + image[r][c]
      }
    }
  }
  return result
}

function parseInput(input) {
  const [algorithm, , ...image] = input

  const width = image.length
  const height = image[0].length

  const paddedImage = []
  const padding = 55
  for (let r = 0; r < height + padding * 2; r++) {
    paddedImage[r] = []
    for (let c = 0; c < width + padding * 2; c++) {
      if (r - padding >= 0 && r - padding < height && c - padding >= 0 && c - padding < width) {
        paddedImage[r][c] = image[r - padding][c - padding] === '#' ? 1 : 0
      } else {
        paddedImage[r][c] = 0
      }
    }
  }

  return {
    image: paddedImage,
    algorithm: [...algorithm].map((a) => (a === '#' ? 1 : 0)),
  }
}

const sampleInput =
  `..#.#..#####.#.#.#.###.##.....###.##.#..###.####..#####..#....#..#..##..###..######.###...####..#..#####..##..#.#####...##.#.#..#.##..#.#......#.###.######.###.####...#.##.##..#..#..#####.....#.#....###..#.##......#.....#..#..#..##..#...##.######.####.####.#.#...#.......#..#.#.#...####.##.#......#..#...##.#.##..#...##.#.##..###.#......#.#.......#.#.#.####.###.##...#.....####.#..#..#.##.#....##..#.####....##...##..#...#......#.#.......#.......##..####..#...#.#.#...##..#.#..###..#####........#..####......#..#

#..#.
#....
##..#
..#..
..###`.split('\n')
