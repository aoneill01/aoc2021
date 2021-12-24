const costs = {
  A: 1,
  B: 10,
  C: 100,
  D: 1000,
}

const paths = {
  RA: [
    ['E', 'HA1', 'HA2'],
    ['E', 'HAB', 'E', 'HBC', 'E', 'HCD', 'E', 'HD1', 'HD2'],
  ],
  RB: [
    ['E', 'HAB', 'E', 'HA1', 'HA2'],
    ['E', 'HBC', 'E', 'HCD', 'E', 'HD1', 'HD2'],
  ],
  RC: [
    ['E', 'HBC', 'E', 'HAB', 'E', 'HA1', 'HA2'],
    ['E', 'HCD', 'E', 'HD1', 'HD2'],
  ],
  RD: [
    ['E', 'HCD', 'E', 'HBC', 'E', 'HAB', 'E', 'HA1', 'HA2'],
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
    RA: ['A', 'C'],
    RB: ['D', 'D'],
    RC: ['C', 'B'],
    RD: ['A', 'B'],
  }

  console.log(cheapestSolution(positions))
}

export async function part2() {
  const positions = {
    HA2: null,
    HA1: null,
    HAB: null,
    HBC: null,
    HCD: null,
    HD1: null,
    HD2: null,
    RA: ['A', 'D', 'D', 'C'],
    RB: ['D', 'C', 'B', 'D'],
    RC: ['C', 'B', 'A', 'B'],
    RD: ['A', 'A', 'C', 'B'],
  }

  console.log(cheapestSolution(positions, 4))
}

function cheapestSolution(positions, roomSize = 2) {
  if (isComplete(positions, roomSize)) return { cost: 0, m: null }

  let cheapest = null
  let m = null
  for (const move of possibleMoves(positions, roomSize)) {
    const next = cheapestSolution(move.positions, roomSize)
    if (next.cost === null) continue
    const cost = move.cost + next.cost
    if (cheapest === null || cost < cheapest) {
      cheapest = cost
      m = move.positions
    }
  }

  return { cost: cheapest, m }
}

function possibleMoves(positions, roomSize = 2) {
  const results = []

  let foundDestination = false
  for (const hallway of ['HA2', 'HA1', 'HAB', 'HBC', 'HCD', 'HD1', 'HD2']) {
    const amp = positions[hallway]
    if (!amp) continue
    const room = `R${amp}`
    if (
      positions[room].every((a) => a === amp) &&
      paths[hallway][amp].every((h) => h === 'E' || positions[h] === null)
    ) {
      const newPositions = { ...positions }
      newPositions[hallway] = null
      newPositions[room] = [amp, ...positions[room]]
      const moveDistance = roomSize - positions[room].length + paths[hallway][amp].length
      results.push({ cost: moveDistance * costs[amp], positions: newPositions })
      foundDestination = true
    }
  }

  if (!foundDestination) {
    for (const room of ['RA', 'RB', 'RC', 'RD']) {
      if (positions[room].length > 0) {
        if (positions[room].every((amp) => amp === room[1])) continue
        for (const path of paths[room]) {
          for (let distance = 0; distance <= path.length; distance++) {
            const hallway = path[distance]
            if (hallway === 'E') continue
            if (positions[hallway] !== null) break
            const newPositions = { ...positions }
            const amp = positions[room][0]
            newPositions[hallway] = amp
            newPositions[room] = positions[room].slice(1)
            const moveDistance = roomSize - positions[room].length + distance + 1
            results.push({ cost: moveDistance * costs[amp], positions: newPositions })
          }
        }
      }
    }
  }

  return results
}

function isComplete(positions, roomSize = 2) {
  for (const room of ['RA', 'RB', 'RC', 'RD']) {
    if (positions[room].length < roomSize || !positions[room].every((amp) => amp === room[1])) return false
  }
  return true
}
