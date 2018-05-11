import { sign } from 'jsonwebtoken'
import config from '../configs'

/**
 * @param  {Object} data: payload data
 *
 */
export default (data) => {
  // Sending the payload inside the token, expire in 1 year
  return sign(data, config.secret, { expiresIn: '1y' })
}
