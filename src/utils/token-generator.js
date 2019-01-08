import { sign } from 'jsonwebtoken'
import config from '../configs'

function generate(data, option = { expiresIn: '7d' }) {
  return sign(data, config.secret, option)
}

export default {
  generate
}
