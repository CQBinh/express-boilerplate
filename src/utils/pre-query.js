import { response } from './response'
import format from './format'
import validation from './validation'
import { notFoundLocale } from '../locales'
import { UserModel } from '../model'

function query(req, res, next, _id, Model, message) {
  if (!validation.isObjectId(_id)) {
    return res.status(404).jsonp(response(false, {}, message, 404))
  }

  // Find
  Model.findOne({ _id }, (error, doc) => {
    if (error || !doc) {
      res.status(404).jsonp(response(false, {}, message, 404))
    } else {
      req[`${format.lowerCaseFirstLetter(Model.modelName)}Data`] = doc
      next()
    }
  })
}

const user = (req, res, next, _id) => {
  query(req, res, next, _id, UserModel, notFoundLocale.user)
}

// Export
export default {
  user
}
