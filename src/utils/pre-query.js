import responseBuilder from './response-builder'
import format from './format'
import validation from './validation'
import { notFoundLocale } from '../locales'
import { User } from '../models'

function query(req, res, next, _id, Model, message) {
  if (!validation.isObjectId(_id)) {
    return res.status(404).jsonp(responseBuilder.build(false, {}, { message }))
  }

  Model.findOne({ _id }, (error, doc) => {
    if (error || !doc) {
      res.status(404).jsonp(responseBuilder.build(false, {}, { message }))
    } else {
      req[`${format.lowerCaseFirstLetter(Model.modelName)}Data`] = doc
      next()
    }
  })
}

const user = (req, res, next, _id) => {
  query(req, res, next, _id, User, notFoundLocale.user)
}

export default {
  user
}
