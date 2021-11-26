import { Command } from 'commander'
import { getPartFunction } from './helpers/getDays.js'

const program = new Command()
program.option('-d, --day <day>', 'day number').option('-p, --part <part>', 'part number 1 or 2')
program.parse(process.argv)
const { day, part } = program.opts()

const partFunction = await getPartFunction(day, part)
console.log(`Starting day ${day}, part ${part}`)
console.time('runtime')
await partFunction()
console.timeEnd('runtime')
