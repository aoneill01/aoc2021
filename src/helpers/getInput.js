import fetch from 'node-fetch'
import dotenv from 'dotenv'
dotenv.config()

export async function getInput(day) {
  const response = await fetch(`https://adventofcode.com/2021/day/${day}/input`, {
    headers: {
      accept: 'text/html',
      cookie: process.env.COOKIE,
    },
    method: 'GET',
  })

  const text = await response.text()

  const lines = text.split('\n')
  return lines[lines.length - 1] === '' ? lines.slice(0, lines.length - 1) : lines
}

export async function* getInputAsyncGenerator(day) {
  const response = await fetch(`https://adventofcode.com/2021/day/${day}/input`, {
    headers: {
      accept: 'text/html',
      cookie: process.env.COOKIE,
    },
    method: 'GET',
  })

  let previous = ''
  for await (const chunk of response.body) {
    previous += chunk
    while (true) {
      const eolIndex = previous.indexOf('\n')
      if (eolIndex < 0) break
      const line = previous.slice(0, eolIndex + 1)
      yield line.trim()
      previous = previous.slice(eolIndex + 1)
    }
  }
  if (previous.length > 0) {
    yield previous
  }
}
