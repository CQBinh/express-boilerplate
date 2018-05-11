import photo from './photo'

/**
 * Avatar
 *
 */
const avatar = () => {
  return photo.avatar()
}

/**
 * User
 *
 */
const user = () => {
  return {
    _id: '',
    avatar: avatar(),
    name: 'Anonymous'
  }
}

export default {
  user,
  avatar
}
