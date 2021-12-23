import { getInput } from '../helpers/getInput.js'

const costs = {
  A: 1,
  B: 10,
  C: 100,
  D: 1000,
}

const paths = {
  RA: [
    ['E', 'HA1', 'HA2'],
    ['E', 'HAB', 'HBC', 'HCD', 'HD1', 'HD2'],
  ],
  RB: [
    ['E', 'HAB', 'HA1', 'HA2'],
    ['E', 'HBC', 'HCD', 'HD1', 'HD2'],
  ],
  RC: [
    ['E', 'HBC', 'HAB', 'HA1', 'HA2'],
    ['E', 'HCD', 'HD1', 'HD2'],
  ],
  RD: [
    ['E', 'HCD', 'HBC', 'HAB', 'HA1', 'HA2'],
    ['E', 'HD1', 'HD2'],
  ],
  HA2: {
    A: ['HA1', 'E'],
    B: ['HA1', 'E', 'HAB', 'E'],
    C: ['HA1', 'E', 'HAB', 'E', 'HBC', 'E'],
    D: ['HA1', 'E', 'HAB', 'E', 'HBC', 'E', 'HCD', 'E'],
  },
  HA1: {
    A: ['E'],
    B: ['E', 'HAB', 'E'],
    C: ['E', 'HAB', 'E', 'HBC', 'E'],
    D: ['E', 'HAB', 'E', 'HBC', 'E', 'HCD', 'E'],
  },
  HAB: {
    A: ['E'],
    B: ['E'],
    C: ['E', 'HBC', 'E'],
    D: ['E', 'HBC', 'E', 'HCD', 'E'],
  },
  HBC: {
    A: ['E', 'HAB', 'E'],
    B: ['E'],
    C: ['E'],
    D: ['E', 'HCD', 'E'],
  },
  HCD: {
    A: ['E', 'HBC', 'E', 'HAB', 'E'],
    B: ['E', 'HBC', 'E'],
    C: ['E'],
    D: ['E'],
  },
  HD1: {
    A: ['E', 'HCD', 'E', 'HBC', 'E', 'HAB', 'E'],
    B: ['E', 'HCD', 'E', 'HBC', 'E'],
    C: ['E', 'HCD', 'E'],
    D: ['E'],
  },
  HD2: {
    A: ['HD1', 'E', 'HCD', 'E', 'HBC', 'E', 'HAB', 'E'],
    B: ['HD1', 'E', 'HCD', 'E', 'HBC', 'E'],
    C: ['HD1', 'E', 'HCD', 'E'],
    D: ['HD1', 'E'],
  },
}

export async function part1() {
  const positions = {
    HA2: null,
    HA1: null,
    HAB: null,
    HBC: null,
    HCD: null,
    HD1: null,
    HD2: null,
    RA: ['B', 'A'],
    RB: ['C', 'D'],
    RC: ['B', 'C'],
    RD: ['D', 'A'],
  }
}

export async function part2() {
  // const input = await getInput(23)
}

function possibleMoves(positions, roomSize = 2) {
  const results = []

  for (const room of ['RA', 'RB', 'RC', 'RD']) {
    if (positions[room].length > 0) {
      for (const path of paths[room]) {
        for (let distance = 0; distance <= path.length; distance++) {
          const hallway = path[distance]
          if (hallway === 'E') continue
          if (positions[hallway] !== null) break
          const newPositions = { ...positions }
          newPositions[hallway] = positions[room][0]
          positions[room] = position[room].slice(1)
          const moveDistance = roomSize - position[room].length + distance + 1
          // results.push({ cost = })
        }
      }
    }
  }
}
