import { mongoose, Schema } from '../../utils/mongoose'
import statics from './static'
import methods from './method'

const UserSchema = new Schema({
  name: String,
  email: {
    type: String,
    unique: true
  },
  hashed_password: String,
  salt: String,
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: Date
}, {
  versionKey: false
})

UserSchema.index({ email: 1 })

UserSchema.virtual('password').set(function (password) {
  this._password = password
  this.salt = this.makeSalt()
  this.hashed_password = this.hashPassword(password)
}).get(function () {
  return this._password
})

UserSchema.statics = statics

UserSchema.methods = methods

/**
 * Presave hook
 */
UserSchema.pre('save', function (next) {
  // Set search string
  this.updatedAt = new Date()

  next()
})

// Export
export default mongoose.model('User', UserSchema)
