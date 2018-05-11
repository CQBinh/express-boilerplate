import { commonLocale } from '../locales'

/**
 * Define response data to client
 *
 * @param  {Boolean}  success true or false
 * @param  {Object}   data response data
 * @param  {Object}   message response message
 * @param  {Number}   statusCode response status code
 */
export const response = (success = true, data = {}, message = '', statusCode = 200) => {
  message = message || (success ? commonLocale.successfully : commonLocale.serverError)

  return {
    success,
    data,
    statusCode,
    message
  }
}

/**
 * Return response if validation params error
 *
 * @param  {Object}   res response object
 * @param  {Object}   error error object
 */
export const responseValidation = (res, error) => {
  let msg = commonLocale.validateParamsFailed

  if (error && error.details) {
    msg = error.details[0].message
  }

  return res.status(400).jsonp({
    success: false,
    data: {},
    statusCode: 400,
    message: msg
  })
}
