import mongoose from 'mongoose'

mongoose.Promise = global.Promise
const { ObjectId } = mongoose.Types
const { Schema } = mongoose

// Export
export { mongoose, ObjectId, Schema }
