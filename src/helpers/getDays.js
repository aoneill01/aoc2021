import { readdir } from 'fs'
import { promisify } from 'util'

export async function getDays() {
  const result = {}
  for (const file of await promisify(readdir)('./src/days/')) {
    const module = await import(`../days/${file}`)
    result[fileToDay(file)] = module
  }
  return result
}

function fileToDay(file) {
  const regex = /day(?<day>\d+).js/
  const { day } = regex.exec(file).groups
  return `day ${day.padStart(2, '0')}`
}
