import { getInput } from '../helpers/getInput.js'

export async function part1() {
  const target = await getTarget()
  const testVelocities = getTestVelocities(target)
  console.log((testVelocities.maxVelY * (testVelocities.maxVelY + 1)) / 2)
}

export async function part2() {
  const target = await getTarget()
  const hitsTarget = targetChecker(target)

  const testVelocities = getTestVelocities(target)
  let count = 0
  for (let vx = testVelocities.minVelX; vx <= testVelocities.maxVelX; vx++) {
    for (let vy = testVelocities.minVelY; vy <= testVelocities.maxVelY; vy++) {
      if (hitsTarget(vx, vy)) count++
    }
  }
  console.log(count)
}

async function getTarget() {
  const input = await getInput(17)
  // const input = sampleInput
  const regex = /target area: x=(?<x1>-?\d+)..(?<x2>-?\d+), y=(?<y1>-?\d+)..(?<y2>-?\d+)/
  const { x1, x2, y1, y2 } = regex.exec(input[0]).groups
  return {
    upperLeft: { x: +x1, y: +y2 },
    lowerRight: { x: +x2, y: +y1 },
  }
}

function targetChecker(target) {
  return (vx, vy) => {
    let pos = { x: 0, y: 0 }
    while (pos.x <= target.lowerRight.x && pos.y >= target.lowerRight.y) {
      if (
        pos.x >= target.upperLeft.x &&
        pos.x <= target.lowerRight.x &&
        pos.y <= target.upperLeft.y &&
        pos.y >= target.lowerRight.y
      ) {
        return true
      }
      pos.x += vx
      pos.y += vy
      if (vx > 0) vx -= 1
      vy -= 1
    }
    return false
  }
}

function getTestVelocities(target) {
  return {
    minVelY: target.lowerRight.y,
    maxVelY: -target.lowerRight.y - 1,
    minVelX: 1,
    maxVelX: target.lowerRight.x,
  }
}

const sampleInput = ['target area: x=20..30, y=-10..-5']
