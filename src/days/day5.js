import { getInput } from '../helpers/getInput.js'

export async function part1() {
  const input = await getInput(5)
  // const input = sampleInput
  const vents = input.map((line) => new Vent(line))
  const locationCounts = new Map()
  for (const vent of vents) {
    for (const location of vent.getLocations()) {
      const key = keyForLocation(location)
      locationCounts.set(key, (locationCounts.get(key) ?? 0) + 1)
    }
  }
  const answer = [...locationCounts.values()].reduce((acc, count) => acc + (count > 1 ? 1 : 0), 0)
  console.log(answer)
}

export async function part2() {
  const input = await getInput(5)
  // const input = sampleInput
  const vents = input.map((line) => new Vent(line))
  const locationCounts = new Map()
  for (const vent of vents) {
    for (const location of vent.getLocations2()) {
      const key = keyForLocation(location)
      locationCounts.set(key, (locationCounts.get(key) ?? 0) + 1)
    }
  }
  const answer = [...locationCounts.values()].reduce((acc, count) => acc + (count > 1 ? 1 : 0), 0)
  console.log(answer)
}

class Vent {
  constructor(line) {
    const regex = /(?<x1>\d+),(?<y1>\d+) -> (?<x2>\d+),(?<y2>\d+)/
    const match = regex.exec(line)
    this.p1 = { x: +match.groups.x1, y: +match.groups.y1 }
    this.p2 = { x: +match.groups.x2, y: +match.groups.y2 }
  }

  getLocations() {
    if (this.p1.x === this.p2.x) {
      const x = this.p1.x
      const direction = this.p1.y > this.p2.y ? -1 : 1
      const result = []
      for (let y = this.p1.y; y !== this.p2.y + direction; y += direction) {
        result.push({ x, y })
      }
      return result
    }

    if (this.p1.y === this.p2.y) {
      const y = this.p1.y
      const direction = this.p1.x > this.p2.x ? -1 : 1
      const result = []
      for (let x = this.p1.x; x !== this.p2.x + direction; x += direction) {
        result.push({ x, y })
      }
      return result
    }

    return []
  }

  getLocations2() {
    const locations = this.getLocations()
    if (locations.length) return locations

    const result = []
    const xs = range(this.p1.x, this.p2.x)
    const ys = range(this.p1.y, this.p2.y)
    for (let i = 0; i < xs.length; i++) {
      result.push({ x: xs[i], y: ys[i] })
    }
    return result
  }
}

function keyForLocation({ x, y }) {
  return `${x},${y}`
}

function range(start, end) {
  const result = []
  const direction = start > end ? -1 : 1
  for (let value = start; value !== end + direction; value += direction) {
    result.push(value)
  }
  return result
}

const sampleInput = `0,9 -> 5,9
8,0 -> 0,8
9,4 -> 3,4
2,2 -> 2,1
7,0 -> 7,4
6,4 -> 2,0
0,9 -> 2,9
3,4 -> 1,4
0,0 -> 8,8
5,5 -> 8,2`.split('\n')
