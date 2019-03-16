import Joi from 'joi'

export default {
  validateCreateSample: {
    body: {
    }
  },
  validateUpdateSample: {
    body: {
    }
  },
  validateListSamples: {
    query: {
      page: Joi.number().integer().min(0).label('page')
    }
  }
}
