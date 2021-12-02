import { getInputAsyncGenerator } from '../helpers/getInput.js'

export async function part1() {
  const input = getInputAsyncGenerator(1)
  console.log(await countIncreases(mapIter(input, toDepth)))
}

export async function part2() {
  const input = getInputAsyncGenerator(1)
  // const input = [199, 200, 208, 210, 200, 207, 240, 269, 260, 263]
  console.log(await countIncreases(windowGenerator(mapIter(input, toDepth), 3)))
}

async function countIncreases(values) {
  const iterator = (values[Symbol.asyncIterator] ?? values[Symbol.iterator]).call(values)
  let increaseCount = 0
  let previous = (await iterator.next())?.value

  for await (const next of iterator) {
    if (next > previous) increaseCount++
    previous = next
  }

  return increaseCount
}

async function* windowGenerator(values, windowLength) {
  const iterator = (values[Symbol.asyncIterator] ?? values[Symbol.iterator]).call(values)
  const history = []

  let window = 0

  for (let i = 0; i < windowLength; i++) {
    const next = await iterator.next()
    if (next.done) return
    window += next.value
    history.push(next.value)
  }

  yield window

  let i = windowLength - 1

  for await (const value of iterator) {
    i = (i + 1) % windowLength
    window = window - history[i] + value
    history[i] = value
    yield window
  }
}

const toDepth = (value) => parseInt(value, 10)

async function* mapIter(iter, callback) {
  for await (const value of iter) {
    yield callback(value)
  }
}

// function tap(iter) {
//   return mapIter(iter, (value) => {
//     console.log(value)
//     return value
//   })
// }

// export async function part2() {
//   const input = await getInput(1)
//   const depths = input.map(toDepth)
//   let increases = 0
//   for (let i = 0; i < depths.length - 3; i++) {
//     const window1 = depths[i] + depths[i + 1] + depths[i + 2]
//     const window2 = depths[i + 1] + depths[i + 2] + depths[i + 3]
//     if (window1 < window2) {
//       increases++
//     }
//   }
//   console.log(increases)
// }
