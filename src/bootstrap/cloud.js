const { createLogger } = require('winston')
const { LoggingWinston } = require('@google-cloud/logging-winston')

const loggingWinston = new LoggingWinston()
const logger = createLogger({
  level: 'info',
  transports: [ loggingWinston ]
})

module.exports = logger