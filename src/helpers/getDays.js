import { readdir } from 'fs'
import { promisify } from 'util'

const regex = /^day(?<day>\d+).js$/
const readDirAsync = promisify(readdir)
const isDayFile = (file) => regex.test(file)
const fileToDay = (file) => parseInt(regex.exec(file).groups.day)

export const getDays = async () => (await readDirAsync('./src/days/')).filter(isDayFile).map(fileToDay)

export async function getPartFunction(day, part) {
  const module = await import(`../days/day${parseInt(day, 10)}.js`)

  const fn = module[`part${parseInt(part, 10)}`]
  if (!fn) {
    throw new Error(`Part ${part} not found`)
  }
  return fn
}
