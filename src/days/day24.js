import { getInput } from '../helpers/getInput.js'

export async function part1() {
  console.log(await findAnswer(true))
}

export async function part2() {
  console.log(await findAnswer(false))
}

async function findAnswer(isMax) {
  const input = await getInput(24)
  const program = new Program(input)

  let close = findClose(program)
  let matches = []
  while (true) {
    for (let i = 0; i < 14 - 2; i++) {
      for (let j = i + 1; j < 14 - 1; j++) {
        for (let k = j + 1; k < 14; k++) {
          for (let a = 1; a <= 9; a++) {
            for (let b = 1; b <= 9; b++) {
              for (let c = 1; c <= 9; c++) {
                const modelNumber = [...close]
                modelNumber[i] = a
                modelNumber[j] = b
                modelNumber[k] = c
                program.exec(arrayInput(modelNumber))
                if (program.registerValue('z') === 0) {
                  matches.push(modelNumber.join(''))
                }
              }
            }
          }
        }
      }
    }
    matches.sort()
    if (isMax) matches.reverse()
    const best = matches[0]
    if (close.join('') === best) return best
    close = best.split('').map((v) => +v)
  }
}

function findClose(program) {
  const filler = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
  const close = []
  for (let digitIndex = 0; digitIndex < 14; digitIndex++) {
    let min = null
    for (let digit = 9; digit >= 1; digit--) {
      const a = [...close, digit, ...filler.slice(0, 14 - digitIndex - 1)]
      program.exec(arrayInput(a))
      if (min === null || program.registerValue('z') < min.z) {
        min = { digit, z: program.registerValue('z') }
      }
    }
    close.push(min.digit)
  }
  return close
}

class Program {
  #instructions
  #instructionPointer
  #registers = {
    w: new Register(),
    x: new Register(),
    y: new Register(),
    z: new Register(),
  }

  constructor(input) {
    const instructionMap = {
      inp: Inp,
      add: Add,
      mul: Mul,
      div: Div,
      mod: Mod,
      eql: Eql,
    }

    this.#instructions = []
    for (const line of input) {
      const [inst, ...rest] = line.split(' ')
      const operands = rest.map((value) => this.parseOperand(value))
      this.#instructions.push(new instructionMap[inst](...operands))
    }
  }

  parseOperand(value) {
    return this.#registers[value] ?? new Num(+value)
  }

  exec(getInput) {
    this.reset()

    while (this.#instructionPointer < this.#instructions.length) {
      this.#instructions[this.#instructionPointer].exec(getInput)
      this.#instructionPointer++
    }
  }

  reset() {
    this.#instructionPointer = 0
    Object.values(this.#registers).forEach((register) => (register.value = 0))
  }

  toString() {
    return `w: ${this.#registers.w.value}
x: ${this.#registers.x.value}
y: ${this.#registers.y.value}
z: ${this.#registers.z.value}`
  }

  registerValue(reg) {
    return this.#registers[reg].value
  }
}

class Inp {
  #a

  constructor(a) {
    this.#a = a
  }

  exec(getInput) {
    this.#a.value = getInput()
  }
}

class Add {
  #a
  #b

  constructor(a, b) {
    this.#a = a
    this.#b = b
  }

  exec() {
    this.#a.value = this.#a.value + this.#b.value
  }
}

class Mul {
  #a
  #b

  constructor(a, b) {
    this.#a = a
    this.#b = b
  }

  exec() {
    this.#a.value = this.#a.value * this.#b.value
  }
}

class Div {
  #a
  #b

  constructor(a, b) {
    this.#a = a
    this.#b = b
  }

  exec() {
    this.#a.value = Math.trunc(this.#a.value / this.#b.value)
  }
}

class Mod {
  #a
  #b

  constructor(a, b) {
    this.#a = a
    this.#b = b
  }

  exec() {
    this.#a.value = this.#a.value % this.#b.value
  }
}

class Eql {
  #a
  #b

  constructor(a, b) {
    this.#a = a
    this.#b = b
  }

  exec() {
    this.#a.value = this.#a.value === this.#b.value ? 1 : 0
  }
}

class Register {
  #value = 0

  get value() {
    return this.#value
  }

  set value(v) {
    this.#value = v
  }
}

class Num {
  #value = 0

  constructor(value) {
    this.#value = value
  }

  get value() {
    return this.#value
  }
}

function arrayInput(value) {
  let i = 0
  return () => value[i++]
}

function numberToDigitArray(num) {
  return `${num}`.split('').map((digit) => +digit)
}

function* modelNumberGenerator() {
  let last = 100000000000000
  while (last >= 10000000000000) {
    last--
    const digits = numberToDigitArray(last)
    if (digits.some((d) => d === 0)) continue
    yield last
  }
}

function* modelNumberGenerator2() {
  let last = 11111111111111
  while (last < 100000000000000) {
    last++
    const digits = numberToDigitArray(last)
    if (digits.some((d) => d === 0)) continue
    yield last
  }
}
