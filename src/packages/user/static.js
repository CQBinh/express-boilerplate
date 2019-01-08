import lodash from 'lodash'

async function commonUserData(user) {
  return lodash.pick(user, ['_id', 'name', 'email', 'roles'])
}

export default {
  commonUserData
}
