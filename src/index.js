import inquirer from 'inquirer'
import nodemon from 'nodemon'
import { getDays } from './helpers/getDays.js'

const days = await getDays()

const { day, part } = await inquirer.prompt([
  {
    type: 'list',
    name: 'day',
    message: 'Which day?',
    choices: days.sort((a, b) => b - a),
  },
  {
    type: 'list',
    name: 'part',
    message: 'Which part?',
    choices: [1, 2],
  },
])

console.log()

nodemon(`src/runDay.js --day ${day} --part ${part}`).on('restart', () => console.log('\n----------------------\n'))
