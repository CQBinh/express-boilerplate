import { Sample } from '../../models'
import { ObjectId } from '../../utils/mongoose'
import sampleConfig from './config'

async function createSample(body) {
  const sample = new Sample(body)
  return await sample.save()
}

async function listSamples(page, business) {
  const limit = sampleConfig.limit.index
  const skip = page * limit
  const query = {
    business
  }
  return await Sample.find(query)
    .sort({ name: 1, createdAt: 1 })
    .skip(skip)
    .limit(limit)
    .exec()
}

async function checkSampleInBusiness(sampleId, businessId) {
  const count = await Sample.count({
    _id: new ObjectId(sampleId),
    business: new ObjectId(businessId)
  })
  return !!count
}

async function checkSamplesInBusiness(ids, businessId) {
  const count = await Sample.count({
    _id: {
      $in: ids
    },
    business: new ObjectId(businessId)
  })
  return count === ids.length
}

async function findOneById(id) {
  return await Sample.findOne({ _id: new ObjectId(id) })
}

async function destroy(id) {
  return await Sample.remove({
    _id: id
  })
}

export default {
  checkSampleInBusiness,
  checkSamplesInBusiness,
  createSample,
  destroy,
  findOneById,
  listSamples
}
