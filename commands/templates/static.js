import lodash from 'lodash'

async function briefSampleInfo(sample) {
  sample = lodash.pick(sample, ['_id', 'name'])
  return sample
}

export default {
  briefSampleInfo
}
