const express = require('express')
const router = express.Router()
const axios = require('axios')
const allowMethods = require('../middleware/methods')
const proxyUrl = process.env.PROXYURL
const pjson = require('../../package.json')

/**
 * Dispatch a request to the upstream API.
 * @param {object} req The request
 * @param {object} res The response
 */
const dispatch = async (req, res) => {
  // Prepare request headers.
  prepareHeaders(req)

  // Proxy with Axios
  try {
    const axiosRes = await axios({
      method: req.method,
      url: proxyUrl + req.url,
      data: req.body,
      headers: req.headers,
    })
    // console.log(axiosRes)
    respHandler(res, axiosRes.status, axiosRes.data)
  } catch (err) {
    errorHandler(err, res)
  }
}

// Handle GET and POST requests
router.use(allowMethods)
router.route('/*').get(dispatch).post(dispatch)

/**
 *
 * @param {object} res
 * @param {int} status Response status code
 * @param {string} data Response body content
 */
const respHandler = (res, status, data) => {
  res.status(status).send(data)
}

/**
 * Handle errors from Axios.
 * @param {object} err Axios error object.
 */
const errorHandler = (err, res) => {
  if (err.response) {
    respHandler(res, err.response.status, err.response.data, err.response.headers)
  } else if (err.request) {
    respHandler(res, err.request.status, err.request.data, err.request.headers)
  } else {
    // Something happened in setting up the request that triggered an Error
    console.log('Error', err.message)
    respHandler(res, '503', 'Something went wrong in the proxy. Contact ' + pjson.author)
  }
  // console.log(err.config)
}

/**
 * Clean up headers for proxy request.
 * @param {object} req Express request object.
 */
const prepareHeaders = (req) => {
  // Loop through headers
  for (header in req.headers) {
    // Do something here if needed.
  }

  // Add headers
  // For example, overwrite content-type.
  // req.headers['Content-Type'] = 'application/json'
}

module.exports = router
