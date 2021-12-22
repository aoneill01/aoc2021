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
  const wins = [0n, 0n]
  calculateWins(6, 0, 9, 0, 0, 1n, wins)
  if (wins[0] > wins[1]) {
    console.log(`${wins[0]}`)
  } else {
    console.log(`${wins[1]}`)
  }
}

const distributions = {
  3: 1n,
  4: 3n,
  5: 6n,
  6: 7n,
  7: 6n,
  8: 3n,
  9: 1n,
}

function calculateWins(p1, s1, p2, s2, turn, universes, wins) {
  if (turn === 0) {
    for (const [roll, dist] of Object.entries(distributions)) {
      const r = +roll
      const [newP1, newP1Score] = movePlayer(p1, s1, r)
      if (newP1Score >= 21) {
        wins[0] += universes * dist
      } else {
        calculateWins(newP1, newP1Score, p2, s2, 1, universes * dist, wins)
      }
    }
  } else {
    for (const [roll, dist] of Object.entries(distributions)) {
      const r = +roll
      const [newP2, newP2Score] = movePlayer(p2, s2, r)
      if (newP2Score >= 21) {
        wins[1] += universes * dist
      } else {
        calculateWins(p1, s1, newP2, newP2Score, 0, universes * dist, wins)
      }
    }
  }
}

function movePlayer(p, s, roll) {
  const newP = ((p + roll - 1) % 10) + 1
  return [newP, s + newP]
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
