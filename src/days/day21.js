import { getInput } from '../helpers/getInput.js'

export async function part1() {
  let die = 1
  let p1 = 6
  let s1 = 0
  let p2 = 9
  let s2 = 0
  let turn = 0
  while (s1 < 1000 && s2 < 1000) {
    turn++
    const [total, newDie] = rollDie(die)
    die = newDie
    if (turn % 2 === 1) {
      p1 = ((p1 + total - 1) % 10) + 1
      s1 += p1
    } else {
      p2 = ((p2 + total - 1) % 10) + 1
      s2 += p2
    }
  }
  console.log(Math.min(s1, s2) * turn * 3)
}

export async function part2() {
  // const input = await getInput(21)
}

function rollDie(die) {
  let [v1, d1] = rollOnce(die)
  let [v2, d2] = rollOnce(d1)
  let [v3, d3] = rollOnce(d2)
  return [v1 + v2 + v3, d3]
}
function rollOnce(die) {
  const value = die
  const d = (die % 100) + 1
  return [value, d]
}
