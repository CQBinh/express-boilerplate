import Joi from 'joi'
import logger from '../logger'
import { responseValidation } from './response'

/**
 * Validate body data from client
 */
export default (req, res, next, schema) => {
  const data = ['get', 'delete'].includes(req.method.toLowerCase()) ? req.query : req.body
  const { error } = Joi.validate(data, schema)
  if (error) {
    // Send log to loggy
    logger.warn({
      data: {
        url: `${req.method.toUpperCase()} ${req.url}`,
        clientData: data,
        message: error && error.details ? error.details[0].message : ''
      }
    })

    // Response
    return responseValidation(res, error)
  }
  next()
}
