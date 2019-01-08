import Joi from 'joi'
import config from '../../configs'

async function validateLogin() {
  return {
    body: Joi.object().keys({
      email: Joi.string().required().label('email'),
      password: Joi.string().required().regex(config.strict.password).label('password')
    })
  }
}

export default {
  validateLogin
}
