import lodash from 'lodash'
import { getError, response, to } from '../../utils'
import { Sample } from '../../models'
import service from './service'
import sampleConfig from './config'

const ALLOWED_ATTRIBUTE = ['']

async function create(req, res) {
  const body = lodash.pick(req.body, ALLOWED_ATTRIBUTE)
  const [error, sample] = await to(service.create(body))
  if (error) {
    const parsedError = getError.parse(error)
    return res.jsonp(response(false, {}, parsedError.message, parsedError.code))
  }
  res.jsonp(response(true, { sample }))
}

async function index(req, res) {
  const [error, samples] = await to(service.listSamples(req))
  if (error) {
    const parsedError = getError.parse(error)
    return res.jsonp(response(false, {}, parsedError.message, parsedError.code))
  }
  res.jsonp(response(true, {
    data: samples,
    isEnd: samples.length < sampleConfig.limit.index
  }))
}

async function update(req, res) {
  const body = lodash.pick(req.body, ALLOWED_ATTRIBUTE)
  const [error, sample] = await service.updateSample(req.sampleData, body)
  if (error) {
    const parsedError = getError.parse(error)
    return res.jsonp(response(false, {}, parsedError.message, parsedError.code))
  }
  res.jsonp(response(true, { sample }))
}

async function destroy(req, res) {
  const [error] = await to(service.destroy(req.body.ids))
  if (error) {
    const parsedError = getError.parse(error)
    return res.jsonp(response(false, {}, parsedError.message, parsedError.code))
  }
  res.jsonp(response(true))
}

async function show(req, res) {
  const [error, sample] = await to(Sample.briefSampleInfo(req.sampleData.toJSON()))
  if (error) {
    const parsedError = getError.parse(error)
    return res.jsonp(response(false, {}, parsedError.message, parsedError.code))
  }
  res.jsonp(response(true, { sample }))
}

export default {
  create,
  destroy,
  index,
  show,
  update
}

