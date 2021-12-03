import { getInput } from '../helpers/getInput.js'

export async function part1() {
  const input = await getInput(3)
  const { gammaRate, epsilonRate } = calculateGammaAndEpsilonRates(input)
  console.log(gammaRate * epsilonRate)
}

export async function part2() {
  const input = await getInput(3)
  const oxygenGeneratorRating = getRating(input, oxygenGeneratorRatingCriteria)
  const co2ScrubberRating = getRating(input, co2ScrubberRatingCriteria)
  console.log(oxygenGeneratorRating * co2ScrubberRating)
}

function calculateGammaAndEpsilonRates(input) {
  const mcb = mostCommonBits(input)

  let gammaRate = 0
  let epsilonRate = 0
  for (const mostCommon of mcb) {
    gammaRate <<= 1
    epsilonRate <<= 1
    if (mostCommon === '1') {
      gammaRate++
    } else {
      epsilonRate++
    }
  }

  return { gammaRate, epsilonRate }
}

function mostCommonBits(input) {
  const oneBits = input.reduce((oneBits, value) => {
    for (let i = 0; i < value.length; i++) {
      if (oneBits[i] === undefined) oneBits[i] = 0
      if (value[i] === '1') oneBits[i]++
    }
    return oneBits
  }, [])

  const average = input.length / 2

  return oneBits.map((oneBit) => {
    oneBit = oneBit ?? 0
    if (oneBit === average) return '='
    return oneBit > average ? '1' : '0'
  })
}

function getRating(input, criteria) {
  for (let i = 0; input.length > 1; i++) {
    const mcb = mostCommonBits(input)

    input = input.filter((value) => criteria(value[i], mcb[i]))
  }

  return parseInt(input[0], 2)
}

function oxygenGeneratorRatingCriteria(bit, mostCommon) {
  if (mostCommon === '=') return bit === '1'
  return bit === mostCommon
}

function co2ScrubberRatingCriteria(bit, mostCommon) {
  if (mostCommon === '=') return bit === '0'
  return bit !== mostCommon
}

const sampleInput = [
  '00100',
  '11110',
  '10110',
  '10111',
  '10101',
  '01111',
  '00111',
  '11100',
  '10000',
  '11001',
  '00010',
  '01010',
]
