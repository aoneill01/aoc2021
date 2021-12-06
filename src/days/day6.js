import { getInput } from '../helpers/getInput.js'

export async function part1() {
  const input = await getInput(6)
  const timers = input[0].split(',').map((val) => parseInt(val, 10))
  // const timers = sampleInput
  for (let day = 1; day <= 80; day++) {
    nextDay(timers)
    // console.log(`After ${day} day(s): ${timers}`)
  }
  console.log(timers.length)
}

export async function part2() {
  const input = await getInput(6)
  const timers = input[0].split(',').map((val) => parseInt(val, 10))
  // const timers = sampleInput

  console.log(calculateAnswer(timers, 256))
}

function nextDay(timers) {
  const initialLength = timers.length
  for (let i = 0; i < initialLength; i++) {
    let timer = timers[i]
    timer--
    if (timer < 0) {
      timer = 6
      timers.push(8)
    }
    timers[i] = timer
  }
}

function calculateAnswer(timers, days) {
  const lookup = generateLookup(days)
  return timers.reduce((sum, timer) => sum + lookup[timer], 0)
}

function generateLookup(days) {
  const lookup = {}
  for (let i = 0; i <= 6; i++) {
    lookup[i] = countOfLanternfish(i, days)
  }
  return lookup
}

const cache = {}

function countOfLanternfish(timer, days) {
  let result = 1
  days -= timer
  while (days > 0) {
    let count
    if (cache[days]) {
      count = cache[days]
    } else {
      count = countOfLanternfish(9, days)
      cache[days] = count
    }
    result += count
    days -= 7
  }
  return result
}

const sampleInput = [3, 4, 3, 1, 2]
