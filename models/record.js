const mongoose = require('mongoose')
const Schema = mongoose.Schema

const recordSchema = new Schema({
  name: {
    type: String,
    require: true
  },
  category: {
    type: String,
    require: true
  },
  amount: {
    type: Number,
    require: true
  },
  merchant: {
    type: String,
    lowercase: true,
    trim: true
  },
  date: {
    type: String,
    default: Date.now
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    index: true,
    required: true
  }
})

module.exports = mongoose.model('Record', recordSchema)
