export default (plop) => {
  plop.setGenerator('day', {
    description: 'Generate new day file',
    prompts: [
      {
        type: 'input',
        name: 'day',
        message: 'Day number',
      },
    ],
    actions: [
      {
        type: 'add',
        path: 'src/days/day{{day}}.js',
        templateFile: 'plop-templates/day.hbs',
      },
    ],
  })
}
