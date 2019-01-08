import validate from 'express-validation'

import user from '../packages/user/validator'
import session from '../packages/session/validator'

function parse(object) {
  const data = {}
  for (const key of Object.keys(object)) {
    data[key] = validate(object[key])
  }
  return data
}

export default {
  session: parse(session),
  user: parse(user)
}
