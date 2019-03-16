import { mongoose, Schema } from '../../utils/mongoose'
import statics from './static'
import hooks from './hook'

const SampleSchema = new Schema({
  business: {
    type: Schema.ObjectId,
    ref: 'Business',
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: Date
}, {
  versionKey: false
})

// SampleSchema.index()

SampleSchema.statics = statics

SampleSchema.pre('save', function (next) {
  hooks.preSaveHook(this, next)
})

SampleSchema.post('save', (doc) => {
  // hooks.postSaveHook(doc)
})

export default mongoose.model('Sample', SampleSchema)
