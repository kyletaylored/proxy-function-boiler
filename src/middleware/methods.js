/**
 * Only allow certain methods.
 */

const allowedMethods = ['GET', 'POST']

module.exports = (req, res, next) => {
  if (! allowedMethods.includes(req.method)) {
    res
      .status(405)
      .set('Allow', 'GET, POST')
      .send('Method Not Allowed')
  }
  next()
}