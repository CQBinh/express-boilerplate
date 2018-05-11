import config from '../configs'

/**
 * Return default photo
 *
 */
const defaultPhoto = () => {
  return config.S3.host + config.amazon.name.defaultPhoto
}

/**
 * Return default avatar
 *
 */
const defaultAvatar = () => {
  return config.S3.host + config.amazon.name.defaultAvatar
}

/**
 * Return default logo
 *
 */
const defaultLogo = () => {
  return config.S3.host + config.amazon.name.defaultLogo
}

/**
 * Avatar
 *
 * @param  {String} name
 */
const avatar = (name) => {
  return name ? (config.S3.host + config.amazon.prefix.thumbnail + name) : defaultAvatar()
}

/**
 * Photo
 *
 * @param  {String} name
 */
const photo = (name) => {
  return name ? (config.S3.host + config.amazon.prefix.thumbnail + name) : defaultPhoto()
}

/**
 * Cover
 *
 * @param  {String} name
 */
const cover = (name) => {
  return name ? (config.S3.host + config.amazon.prefix.medium + name) : defaultPhoto()
}

/**
 * Logo
 *
 * @param  {String} name
 */
const logo = (name) => {
  return name ? (config.S3.host + config.amazon.prefix.thumbnail + name) : defaultLogo()
}

// Export
export default {
  avatar,
  photo,
  cover,
  logo
}
