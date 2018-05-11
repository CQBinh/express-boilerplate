import { response } from '../../utils'
import { UserModel } from '../../model'

const me = async (req, res) => {
  const { user } = req
  const data = await UserModel.briefInfoById(user._id)
  res.jsonp(response(true, { user: data }))
}

export default {
  me
}
