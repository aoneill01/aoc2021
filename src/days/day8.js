import { getInput } from '../helpers/getInput.js'

export async function part1() {
  const input = await getInput(8)
  // const input = sampleInput
  const values = input.map(parseLine)
  const answer = values.reduce((count, value) => {
    const digits = `${value}`.split('').map((v) => +v)
    return count + digits.reduce((subCount, digit) => subCount + ([1, 4, 7, 8].includes(digit) ? 1 : 0), 0)
  }, 0)
  console.log(answer)
}

export async function part2() {
  const input = await getInput(8)
  // const input = sampleInput
  const values = input.map(parseLine)
  const answer = values.reduce((count, value) => count + value, 0)
  console.log(answer)
}

function parseLine(line) {
  const [start, end] = line.split(' | ')
  const uniquePatterns = start.split(' ')
  const digits = end.split(' ')

  const wireMapping = solveWireMapping(uniquePatterns)
  return digits.reduce((acc, digit) => acc * 10 + digitToNumber(digit, wireMapping), 0)
}

function digitToNumber(digit, wireMapping) {
  const key = [...digit]
    .map((segment) => wireMapping[segment])
    .sort()
    .join('')
  return segmentsToNumber[key]
}

function solveWireMapping(uniquePatterns) {
  const ofLength = (length) => (segment) => segment.length === length
  const one = uniquePatterns.find(ofLength(2))
  const four = uniquePatterns.find(ofLength(4))
  const seven = uniquePatterns.find(ofLength(3))
  // const eight = uniquePatterns.find(ofLength(7))
  const twoThreeFive = uniquePatterns.filter(ofLength(5))
  const zeroSixNine = uniquePatterns.filter(ofLength(6))

  const a = and(not(one), seven)
  const f = and(...zeroSixNine, one)
  const c = and(not(f), one)
  const d = and(...twoThreeFive, four)
  const g = and(not(a + d), ...twoThreeFive)
  const b = and(not(a + f + g), ...zeroSixNine)
  const e = not(a + b + c + d + f + g)

  return {
    [a]: 'a',
    [b]: 'b',
    [c]: 'c',
    [d]: 'd',
    [e]: 'e',
    [f]: 'f',
    [g]: 'g',
  }
}

function and(a, ...rest) {
  function binaryAnd(a, b) {
    let result = ''
    for (const partA of a) {
      if (b.includes(partA)) result += partA
    }
    return result
  }

  let result = a
  for (const next of [...rest]) {
    result = binaryAnd(result, next)
  }
  return result
}

function not(a) {
  const notSeen = new Set('abcdefg'.split(''))
  for (const segment of a) {
    notSeen.delete(segment)
  }
  return [...notSeen].join('')
}

const segmentsToNumber = {
  abcefg: 0,
  cf: 1,
  acdeg: 2,
  acdfg: 3,
  bcdf: 4,
  abdfg: 5,
  abdefg: 6,
  acf: 7,
  abcdefg: 8,
  abcdfg: 9,
}

const sampleInput = `be cfbegad cbdgef fgaecd cgeb fdcge agebfd fecdb fabcd edb | fdgacbe cefdb cefbgd gcbe
edbfga begcd cbg gc gcadebf fbgde acbgfd abcde gfcbed gfec | fcgedb cgb dgebacf gc
fgaebd cg bdaec gdafb agbcfd gdcbef bgcad gfac gcb cdgabef | cg cg fdcagb cbg
fbegcd cbd adcefb dageb afcb bc aefdc ecdab fgdeca fcdbega | efabcd cedba gadfec cb
aecbfdg fbg gf bafeg dbefa fcge gcbea fcaegb dgceab fcbdga | gecf egdcabf bgf bfgea
fgeab ca afcebg bdacfeg cfaedg gcfdb baec bfadeg bafgc acf | gebdcfa ecba ca fadegcb
dbcfg fgd bdegcaf fgec aegbdf ecdfab fbedc dacgb gdcebf gf | cefg dcbef fcge gbcadfe
bdfegc cbegaf gecbf dfcage bdacg ed bedf ced adcbefg gebcd | ed bcgafe cdgba cbgef
egadfb cdbfeg cegd fecab cgb gbdefca cg fgcdab egfdb bfceg | gbdfcae bgc cg cgb
gcafb gcf dcaebfg ecagb gf abcdeg gaef cafbge fdbac fegbdc | fgae cfgab fg bagce`.split('\n')
