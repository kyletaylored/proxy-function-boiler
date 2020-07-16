const { createLogger, format, transports } = require('winston')
const util = require('util')
const chalk = require('chalk')

const selectColor = level => {
  switch (level) {
    case 'error':
      return chalk.red
    case 'warn':
      return chalk.yellow
    case 'debug':
      return chalk.green
    case 'info':
    case 'silly':
    default:
      return chalk.white
  }
}

const consoleFormat = format.printf(info => {
  const color = selectColor(info.level)
  const message = typeof info.message === 'object'
    ? util.inspect(info.message)
    : info.message
  
  return `\n${color(`[${info.level}]`)} ${message}\n`
})

const logger = createLogger({
  level: 'silly',
  format: consoleFormat,
  transports: [
    new transports.Console(),
    new transports.File({ filename: '../../logs/error.log', level: 'error' }),
    new transports.File({ filename: '../../logs/combined.log' })
  ],
})

module.exports = logger