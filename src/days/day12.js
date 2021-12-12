import { getInput } from '../helpers/getInput.js'

export async function part1() {
  const input = await getInput(12)
  // const input = sampleInput
  const edgeMap = generateEdgeMap(input)

  const paths = findPaths(['start'], edgeMap)
  console.log(paths.length)
}

export async function part2() {
  const input = await getInput(12)
  // const input = sampleInput
  const edgeMap = generateEdgeMap(input)

  const paths = findPaths(['start'], edgeMap, 1)
  console.log(paths.length)
}

function findPaths(visited, edgeMap, smallRevisitCount = 0) {
  const cave = visited[visited.length - 1]
  if (cave === 'end') return [visited]

  const paths = []

  for (const move of edgeMap.get(cave)) {
    const newVisited = [...visited, move]
    if (move === 'start' || !hasValidRevisitCount(newVisited, smallRevisitCount)) continue
    paths.push(...findPaths(newVisited, edgeMap, smallRevisitCount))
  }

  return paths
}

function hasValidRevisitCount(path, smallRevisitCount) {
  const seenSmallCaves = new Set()
  let caveWithMultiples

  for (const cave of path) {
    if (cave === cave.toLowerCase()) {
      if (seenSmallCaves.has(cave)) {
        if (caveWithMultiples) return false
        caveWithMultiples = cave
      }
      seenSmallCaves.add(cave)
    }
  }

  if (!caveWithMultiples) return true
  return path.filter((cave) => cave === caveWithMultiples).length - 1 <= smallRevisitCount
}

function generateEdgeMap(input) {
  const result = new Map()

  for (const line of input) {
    const [cave1, cave2] = line.split('-')
    if (!result.has(cave1)) result.set(cave1, [])
    if (!result.has(cave2)) result.set(cave2, [])
    result.get(cave1).push(cave2)
    result.get(cave2).push(cave1)
  }

  return result
}

const sampleInput = `fs-end
he-DX
fs-he
start-DX
pj-DX
end-zg
zg-sl
zg-pj
pj-he
RW-he
fs-DX
pj-RW
zg-RW
start-pj
he-WI
zg-he
pj-fs
start-RW`.split('\n')
