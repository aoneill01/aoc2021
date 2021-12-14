import { getInput } from '../helpers/getInput.js'

export async function part1() {
  await runForSteps(10)
}

export async function part2() {
  await runForSteps(40)
}

async function runForSteps(stepCount) {
  const input = await getInput(14)
  // const input = sampleInput
  const { start, pairs, rules } = parseInput(input)

  let p = pairs
  for (let i = 0; i < stepCount; i++) {
    p = step(p, rules)
  }

  console.log(calculateAnswer(start, p))
}

function calculateAnswer(start, pairs) {
  const counts = countElements(start, pairs)

  const max = Math.max(...counts.values())
  const min = Math.min(...counts.values())

  return max - min
}

function countElements(start, pairs) {
  // Add 1 for the last element because it won't be included later
  const result = new Map([[start[start.length - 1], 1]])

  for (const [pair, count] of pairs) {
    // Count each element that starts the pair to prevent double counting
    const element = pair[0]
    result.set(element, (result.get(element) ?? 0) + count)
  }

  return result
}

function step(pairs, rules) {
  const newPairs = new Map()

  for (const rule of rules) {
    if (pairs.has(rule.left)) {
      // A matched pair of AB -> Z results in new pairs of AZ and ZB
      const keys = [`${rule.left[0]}${rule.right}`, `${rule.right}${rule.left[1]}`]
      for (const key of keys) {
        newPairs.set(key, (newPairs.get(key) ?? 0) + pairs.get(rule.left))
      }
      pairs.delete(rule.left)
    }
  }

  // Any unmatched pairs are carried over
  for (const [pair, count] of pairs) {
    newPairs.set(pair, (newPairs.get(pair) ?? 0) + count)
  }

  return newPairs
}

function parseInput(input) {
  const start = input[0]
  const pairs = new Map()

  // Calculate all pairs of elements in the starting template
  for (let i = 0; i < start.length - 1; i++) {
    const pair = start.substring(i, i + 2)
    pairs.set(pair, (pairs.get(pair) ?? 0) + 1)
  }

  return {
    start,
    pairs,
    rules: input.slice(2).map((rule) => {
      const [left, right] = rule.split(' -> ')
      return { left, right }
    }),
  }
}

const sampleInput = `NNCB

CH -> B
HH -> N
CB -> H
NH -> C
HB -> C
HC -> B
HN -> C
NN -> C
BH -> H
NC -> B
NB -> B
BN -> B
BB -> N
BC -> B
CC -> N
CN -> C`.split('\n')
