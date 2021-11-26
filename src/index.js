import inquirer from 'inquirer'
import { getDays } from './helpers/getDays.js'

const days = await getDays()

const { day, part } = await inquirer.prompt([
  {
    type: 'list',
    name: 'day',
    message: 'Which day?',
    choices: Object.keys(days).sort(),
  },
  {
    type: 'list',
    name: 'part',
    message: 'Which part?',
    choices: ['part 1', 'part 2'],
  },
])

await days[day][part.replace(/\s/g, '')]()
