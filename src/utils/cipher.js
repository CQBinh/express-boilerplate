import config from '../configs'

function isMd5Hash(value) {
  return config.regex.password.test(value.toLowerCase())
}

export default {
  isMd5Hash
}
