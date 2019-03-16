import map from 'apr-map'
import repo from './repository'
import { Sample } from '../../models'

async function create(body) {
  const sample = await repo.createSample(body)
  return await Sample.detailInfo(sample.toJSON())
}

async function listSamples(req) {
  const { page = 0 } = req.query
  const samples = await repo.listSamples(page, req.user.business)
  return await map.series(samples, async (sample) => {
    return await Sample.briefInfo(sample)
  })
}

async function updateSample(sample, body) {
  Object.assign(sample, body)
  await sample.save()
  return await Sample.detailInfo(sample.toJSON())
}

async function destroy(ids) {
  return await map.series(ids, async (id) => {
    return await repo.destroy(id)
  })
}

export default {
  create,
  destroy,
  listSamples,
  updateSample
}
