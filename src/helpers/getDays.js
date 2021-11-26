import { readdir } from 'fs'
import { promisify } from 'util'

export async function getDays() {
  return (await promisify(readdir)('./src/days/')).map(fileToDay)
}

function fileToDay(file) {
  const regex = /day(?<day>\d+).js/
  const { day } = regex.exec(file).groups
  return parseInt(day, 10)
}

export async function getPartFunction(day, part) {
  let module
  try {
    module = await import(`../days/day${parseInt(day, 10)}.js`)
  } catch (err) {
    throw new Error(`Day ${day} not found`)
  }

  const fn = module[`part${parseInt(part, 10)}`]
  if (!fn) {
    throw new Error(`Part ${part} not found`)
  }
  return fn
}
