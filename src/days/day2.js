import { getInput } from '../helpers/getInput.js'

class Submarine {
  #depth = 0
  #distance = 0
  #aim = 0

  parseCommand(command) {
    const [operation, value] = command.split(' ')
    switch (operation) {
      case 'forward':
        this.#distance += +value
        break
      case 'down':
        this.#depth += +value
        break
      case 'up':
        this.#depth -= +value
        break
    }
  }

  parseCommand2(command) {
    const [operation, value] = command.split(' ')
    switch (operation) {
      case 'forward':
        this.#distance += +value
        this.#depth += this.#aim * +value
        break
      case 'down':
        this.#aim += +value
        break
      case 'up':
        this.#aim -= +value
        break
    }
  }

  depth() {
    return this.#depth
  }

  distance() {
    return this.#distance
  }
}

export async function part1() {
  const input = await getInput(2)
  const sub = new Submarine()

  for (const command of input) {
    sub.parseCommand(command)
  }

  console.log(sub.distance() * sub.depth())
}

export async function part2() {
  const input = await getInput(2)
  const sub = new Submarine()

  for (const command of input) {
    sub.parseCommand2(command)
  }

  console.log(sub.distance() * sub.depth())
}
