import { getInput } from '../helpers/getInput.js'

export async function part1() {
  const input = await getInput(18)
  // const input = sampleInput
  const assignment = input.map(parseLine)
  const sum = assignment.reduce((sum, next) => add(sum, next))
  console.log(sum.toString())
  console.log(sum.magnitude())
}

export async function part2() {
  const input = await getInput(18)
  // const input = sampleInput
  const magnitudes = []
  for (let i = 0; i < input.length - 1; i++) {
    for (let j = i + 1; j < input.length; j++) {
      magnitudes.push(add(parseLine(input[i]), parseLine(input[j])).magnitude())
      magnitudes.push(add(parseLine(input[j]), parseLine(input[i])).magnitude())
    }
  }
  console.log(Math.max(...magnitudes))
}

const parseLine = (line) => createFromArray(JSON.parse(line))

const add = (a, b) => new Pair(a, b).reduce()

function createFromArray(array) {
  const left = Array.isArray(array[0]) ? createFromArray(array[0]) : new Leaf(array[0])
  const right = Array.isArray(array[1]) ? createFromArray(array[1]) : new Leaf(array[1])
  return new Pair(left, right)
}
class Node {
  parent
}

class Pair extends Node {
  left
  right

  constructor(left, right) {
    super()
    this.left = left
    this.right = right
    this.left.parent = this
    this.right.parent = this
  }

  toString() {
    return `[${this.left.toString()},${this.right.toString()}]`
  }

  inorderLeaves() {
    const result = []

    if ('value' in this.left) {
      result.push(this.left)
    } else {
      result.push(...this.left.inorderLeaves())
    }

    if ('value' in this.right) {
      result.push(this.right)
    } else {
      result.push(...this.right.inorderLeaves())
    }

    return result
  }

  reduce() {
    while (this.singleReduction()) {
      // console.log(this.toString())
    }
    return this
  }

  singleReduction() {
    const leaves = this.inorderLeaves()

    for (let i = 0; i < leaves.length; i++) {
      if (leaves[i].calculateDepth() > 4) {
        // explode
        if (i > 0) {
          leaves[i - 1].value += leaves[i].value
        }
        if (i + 2 < leaves.length) {
          leaves[i + 2].value += leaves[i + 1].value
        }
        const zero = new Leaf(0)
        if (leaves[i].parent.parent.left === leaves[i].parent) {
          leaves[i].parent.parent.left = zero
          zero.parent = leaves[i].parent.parent
          leaves[i].parent = null
        } else {
          leaves[i].parent.parent.right = zero
          zero.parent = leaves[i].parent.parent
          leaves[i].parent = null
        }
        return true
      }
    }

    for (let i = 0; i < leaves.length; i++) {
      if (leaves[i].value >= 10) {
        // split
        const split = new Pair(new Leaf(Math.floor(leaves[i].value / 2)), new Leaf(Math.ceil(leaves[i].value / 2)))

        if (leaves[i].parent.left === leaves[i]) {
          leaves[i].parent.left = split
          split.parent = leaves[i].parent
          leaves[i].parent = null
        } else {
          leaves[i].parent.right = split
          split.parent = leaves[i].parent
          leaves[i].parent = null
        }

        return true
      }
    }

    return false
  }

  magnitude() {
    return 3 * this.left.magnitude() + 2 * this.right.magnitude()
  }
}

class Leaf extends Node {
  value

  constructor(value) {
    super()
    this.value = value
  }

  toString() {
    return `${this.value}`
  }

  calculateDepth() {
    let result = 0
    let node = this
    while (node.parent !== undefined) {
      result++
      node = node.parent
    }
    return result
  }

  magnitude() {
    return this.value
  }
}

const sampleInput = `[[[0,[5,8]],[[1,7],[9,6]]],[[4,[1,2]],[[1,4],2]]]
[[[5,[2,8]],4],[5,[[9,9],0]]]
[6,[[[6,2],[5,6]],[[7,6],[4,7]]]]
[[[6,[0,7]],[0,9]],[4,[9,[9,0]]]]
[[[7,[6,4]],[3,[1,3]]],[[[5,5],1],9]]
[[6,[[7,3],[3,2]]],[[[3,8],[5,7]],4]]
[[[[5,4],[7,7]],8],[[8,3],8]]
[[9,3],[[9,9],[6,[4,9]]]]
[[2,[[7,7],7]],[[5,8],[[9,3],[0,2]]]]
[[[[5,2],5],[8,[3,7]]],[[5,[7,5]],[4,4]]]`.split('\n')
