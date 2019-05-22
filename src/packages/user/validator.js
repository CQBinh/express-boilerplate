import Joi from 'joi'
import config from '../../configs'

export default {
  validateRegister: {
    body: {
      email: Joi.string().required().regex(config.regex.email).label('email'),
      password: Joi.string().required().regex(config.regex.password).label('password'),
    }
  }
}
