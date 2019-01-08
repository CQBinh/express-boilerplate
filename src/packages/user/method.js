import crypto from 'crypto'
import { pick } from 'lodash'

function authenticate(plainText) {
  return this.hashPassword(plainText) === this.hashed_password
}

function makeSalt() {
  return crypto.randomBytes(16).toString('base64')
}

function hashPassword(password) {
  if (!password || !this.salt) return ''
  const salt = Buffer.from(this.salt, 'base64')
  return crypto.pbkdf2Sync(password, salt, 10000, 64, 'sha1').toString('base64')
}

function newPassword(password) {
  this.hashed_password = this.hashPassword(password)
}

function genTokenData() {
  return pick(this, ['_id', 'roles', 'email'])
}
export default {
  authenticate,
  genTokenData,
  hashPassword,
  makeSalt,
  newPassword
}
