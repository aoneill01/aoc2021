import { getInput } from '../helpers/getInput.js'

export async function part1() {
  //   const program = new Program(
  //     `inp w
  // mul x 0
  // add x z
  // mod x 26
  // div z 1
  // add x 10
  // eql x w
  // eql x 0
  // mul y 0
  // add y 25
  // mul y x
  // add y 1
  // mul z y
  // mul y 0
  // add y w
  // add y 5
  // mul y x
  // add z y`.split('\n')
  //   )
  //   program.exec(arrayInput([5]))
  //   console.log(program.toString())

  // const digits = [9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9]
  // const filler = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
  // const input = await getInput(24)
  // const program = new Program(input)

  // const found = []
  // for (let digitIndex = 0; digitIndex < 14; digitIndex++) {
  //   let min = null
  //   for (let digit = 9; digit >= 1; digit--) {
  //     const a = [...found, digit, ...filler.slice(0, 14 - digitIndex - 1)]
  //     program.exec(arrayInput(a))
  //     if (min === null || program.registerValue('z') < min.z) {
  //       min = { digit, z: program.registerValue('z') }
  //     }
  //   }
  //   console.log(min, found)
  //   found.push(min.digit)
  // }

  let best = [9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9]
  const input = await getInput(24)
  const program = new Program(input)

  while (true) {
    let min = null
    for (let digitIndex = 0; digitIndex < 14; digitIndex++) {
      for (let digit = 9; digit >= 1; digit--) {
        const value = best.slice(0)
        value[digitIndex] = digit
        program.exec(arrayInput(value))
        if (min === null || program.registerValue('z') < min.z) {
          min = { value, z: program.registerValue('z') }
        }
      }
    }
    console.log(min)
    best = min.value
  }

  // let sum = 0
  // for (let i = 0; i < 100000000000000; i++) {
  //   sum += 1
  //   // if (i % 1000000 === 0) console.log(i)
  // }
  // console.log('done')
}

export async function part2() {
  // const input = await getInput(24)
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
