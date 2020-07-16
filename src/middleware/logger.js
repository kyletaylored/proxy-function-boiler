const prod = typeof process.env.K_SERVICE !== 'undefined'
const logger = prod ? require('../bootstrap/cloud') : require('../bootstrap/local')

module.exports = (req, res, next) => {
  logger.info({
    message: `[${req.method}] [${req.ip}] ${req.url}`
  })
  next()
}