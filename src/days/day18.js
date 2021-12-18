import { getInput } from '../helpers/getInput.js'

export async function part1() {
  // const input = await getInput(18)

  const a = parseLine('[[[[4,3],4],4],[7,[[8,4],9]]]')
  const b = parseLine('[1,1]')

  console.dir(add(a, b), { depth: null })
}

export async function part2() {
  // const input = await getInput(18)
}

const parseLine = (line) => JSON.parse(line)

const add = (a, b) => reduce([a, b])

function reduce(value) {
  return singleReduction(value)

  // return value
}

function singleReduction(value) {
  let stack = []
  let node = { value, depth: 0 }

  // inorder traversal
  while (true) {
    if (Array.isArray(node.value)) {
      stack.push(node)
      node = { value: node.value[0], depth: node.depth + 1, isRight: true }
    } else {
      console.log(node)
      // if (node.depth > 4) {
      //   let parent = stack.pop()
      //   while ()
      //   return true
      // }
      const parent = stack.pop()
      if (parent === undefined) break
      node = { value: parent.value[1], depth: parent.depth + 1, isRight: false }
    }
  }

  return false
}
