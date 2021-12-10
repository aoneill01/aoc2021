import { getInput } from '../helpers/getInput.js'

export async function part1() {
  const input = await getInput(10)
  // const input = sampleInput

  const scores = {
    ')': 3,
    ']': 57,
    '}': 1197,
    '>': 25137,
  }

  const answer = input
    .map(parseLine)
    .map(({ error }) => error)
    .filter(Boolean)
    .map((error) => scores[error])
    .reduce((sum, score) => sum + score)

  console.log(answer)
}

export async function part2() {
  const input = await getInput(10)
  // const input = sampleInput

  const sortedPoints = input
    .map(parseLine)
    .filter(({ error }) => error === undefined)
    .map(({ stack }) => stack)
    .map(stackScore)
    .sort((a, b) => b - a)

  console.log(sortedPoints[(sortedPoints.length - 1) / 2])
}

function stackScore(stack) {
  const scores = {
    ')': 1,
    ']': 2,
    '}': 3,
    '>': 4,
  }

  let result = 0
  let c

  // todo: don't modify stack
  while ((c = stack.pop())) {
    result *= 5
    result += scores[c]
  }

  return result
}

function parseLine(line) {
  const pairs = {
    '(': ')',
    '[': ']',
    '{': '}',
    '<': '>',
  }

  const stack = []

  for (const c of line) {
    if (c in pairs) {
      stack.push(pairs[c])
    } else {
      const expected = stack.pop()
      if (expected !== c) return { error: c, stack }
    }
  }

  return { stack }
}

const sampleInput = `[({(<(())[]>[[{[]{<()<>>
[(()[<>])]({[<{<<[]>>(
{([(<{}[<>[]}>{[]{[(<()>
(((({<>}<{<{<>}{[]{[]{}
[[<[([]))<([[{}[[()]]]
[{[{({}]{}}([{[{{{}}([]
{<[[]]>}<{[{[{[]{()[[[]
[<(<(<(<{}))><([]([]()
<{([([[(<>()){}]>(<<{{
<{([{{}}[<[[[<>{}]]]>[]]`.split('\n')
