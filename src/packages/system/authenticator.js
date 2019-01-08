import express from 'express'
import { verify } from 'jsonwebtoken'
import { BAD_REQUEST_CODE, UN_AUTHORIZED_CODE } from './authorizator'
import { commonLocale } from '../../locales'
import config from '../../configs'
import responseBuilder from '../../utils/response-builder'
import errorUtil from '../../utils/error'

const router = express.Router()
const numericFields = ['page']
const whiteList = ['/sessions', '/users/register']

router.use((req, res, next) => {
  // Cast all number in query data to number type instead of string
  for (const key in req.query) {
    if (numericFields.indexOf(key) !== -1 && req.query[key] === Number(req.query[key])) {
      req.query[key] = Number(req.query[key])
    }
  }
  if (whiteList.includes(req.baseUrl)) {
    return next()
  }
  const token = req.headers.authorization
  if (token) {
    verify(token.split(' ')[1], config.secret, (error, decoded) => {
      if (error) {
        return res.status(UN_AUTHORIZED_CODE).jsonp(responseBuilder.build(false, {}, errorUtil.parseError(commonLocale.tokenVerifyFailed)))
      }
      if (typeof decoded === 'string') {
        decoded = JSON.parse(decodeURIComponent(decoded))
      }
      req.user = decoded
      next()
    })
  } else {
    return res.status(BAD_REQUEST_CODE).jsonp(responseBuilder.build(false, {}, errorUtil.parseError(commonLocale.noToken)))
  }
})

export default router
