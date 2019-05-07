import queryBuilder from './query-builder'

async function createUser(body) {
  const query = queryBuilder.foo()
  const users = await User.find(query)


}

export default {
  createUser
}
