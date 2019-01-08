import responseBuilder from '../../utils/response-builder'
import service from './service'
import errorUtil from '../../utils/error'

async function create(req, res) {
  const { error, data } = await service.login(req.body).catch((err) => {
    res.jsonp(responseBuilder.build(false, {}, errorUtil.parseError(err)))
  })
  if (error) {
    return res.jsonp(responseBuilder.build(false, {}, errorUtil.parseError(error)))
  }
  res.jsonp(responseBuilder.build(true, { user: data }))
}

export default {
  create
}
