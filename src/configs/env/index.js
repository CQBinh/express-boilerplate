import amazon from './cross-env/amazon'
import client from './cross-env/client'
import file from './cross-env/file'
import limit from './cross-env/limit'
import stricts from './cross-env/stricts'
import validation from './cross-env/validation'

const app = {
  env: {
    production: 'production',
    development: 'development',
    test: 'test'
  },

  conventions: {
    number: 0,
    array: [],
    string: '',
    object: null
  },

  regex: {
    objectId: /^[0-9a-fA-F]{24}$/,
    phone: /^\+?1?(\d{10,12}$)/,
    email: /\S+@\S+\.\S+/,
    password: /^[a-f0-9]{32}$/
  },

  format: {
    date: 'DD/MM/YYYY, HH:mm'
  },

  refreshTokenLife: '30d'
}

export default Object.assign(app, amazon, client, file, limit, validation, stricts)
