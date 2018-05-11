/* eslint object-shorthand: [0] */

import crypto from 'crypto'
import { mongoose, Schema } from '../../utils/mongoose'
import { format } from '../../utils'
import statics from './static'

const UserSchema = new Schema({
  name: String,
  email: String,
  phone: String,
  crm: {
    role: String,
    city: String
  }
}, {
  versionKey: false,
  collection: 'users'
})

// Index
UserSchema.index({ 'crm.role': 1 }).index({ 'crm.city': 1 })

/**
 * Virtual
 */
UserSchema.virtual('password').set(function (password) {
  this._password = password
  this.salt = this.makeSalt()
  this.hashed_password = this.hashPassword(password)
}).get(function () {
  return this._password
})

/**
 * Methods
 */
UserSchema.methods = {
  /**
   * Authenticate - check if the passwords are the same
   *
   * @param {String} plainText
   */
  authenticate: function (plainText) {
    return this.hashPassword(plainText) === this.get('hashed_password')
  },

  /**
   * Make salt
   *
   * @return {String}
   */
  makeSalt: function () {
    return crypto.randomBytes(16).toString('base64')
  },

  /**
   * Hash password
   *
   * @param {String} password
   */
  hashPassword: function (password) {
    if (!password || !this.get('salt')) return ''
    const salt = Buffer.from(this.get('salt'), 'base64')
    return crypto.pbkdf2Sync(password, salt, 10000, 64, 'sha1').toString('base64')
  }
}

/**
 * Static functions
 *
 */
UserSchema.statics = statics

/**
 * Presave hook
 */
UserSchema.pre('save', function (next) {
  // Set search string
  this.searchString = format.searchString(this.name)

  next()
})

// Export
export default mongoose.model('User', UserSchema)
