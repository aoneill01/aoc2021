import memoize from 'memoizee'
import { getInput } from '../helpers/getInput.js'

export async function part1() {
  console.log(await calculateAnswer(80))
}

export async function part2() {
  console.log(await calculateAnswer(256))
}

async function calculateAnswer(days) {
  const input = await getInput(6)
  const timers = input[0].split(',').map((val) => parseInt(val, 10))
  return timers.reduce((sum, timer) => sum + countOfLanternfish(timer, days), 0)
}

const countOfLanternfish = memoize((timer, days) => {
  let result = 1
  days -= timer
  while (days > 0) {
    result += countOfLanternfish(8, days - 1)
    days -= 7
  }
  return result
})
