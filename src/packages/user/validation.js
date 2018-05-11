import Joi from 'joi'
import pick from 'lodash/pick'
import config from '../../configs'
import { validationLocale } from '../../locales'
import { validateClientData } from '../../utils'

const STAFF_LOCALE = validationLocale.user.staff
const CITIES = config.client.common.cities.list.map(item => item._id)
const ROLES = config.client.staff.roles.list.map(item => item._id)

const staff = {
  user: Joi.string().regex(config.regex.objectId).required().error(() => {
    return {
      message: STAFF_LOCALE.userInvalid
    }
  }),
  city: Joi.string().valid(CITIES).required().error(() => {
    return {
      message: STAFF_LOCALE.cityInvalid
    }
  }),
  role: Joi.string().valid(ROLES).required().error(() => {
    return {
      message: STAFF_LOCALE.roleInvalid
    }
  }),
  phone: Joi.string().regex(config.regex.phone).required().error(() => {
    return {
      message: STAFF_LOCALE.phoneInvalid
    }
  }),
  email: Joi.string().regex(config.regex.email).required().error(() => {
    return {
      message: STAFF_LOCALE.emailInvalid
    }
  }),
  name: Joi.string().min(config.validation.staff.minNameLength).max(config.validation.staff.maxNameLength).required().error(() => {
    return {
      message: STAFF_LOCALE.nameInvalid
    }
  })
}

const createStaff = (req, res, next) => {
  validateClientData(req, res, next, Joi.object().keys(pick(staff, ['user', 'city', 'role'])))
}

const updateStaff = (req, res, next) => {
  validateClientData(req, res, next, Joi.object().keys(pick(staff, ['city', 'role', 'phone', 'email', 'name'])))
}

export default {
  createStaff,
  updateStaff
}
