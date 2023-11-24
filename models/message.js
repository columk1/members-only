const { DateTime } = require('luxon')
const mongoose = require('mongoose')

const Schema = mongoose.Schema

const MessageSchema = new Schema({
  title: { type: String, required: [true, 'Title is required'], unique: true, maxLength: 100 },
  timestamp: { type: Date },
  text: { type: String, required: [true, 'Message text is required'], maxLength: 100 },
  author: { type: Schema.Types.ObjectId, ref: 'User', required: [true, 'Author is required'] },
})

MessageSchema.virtual('formatted_date').get(function () {
  return this.timestamp ? DateTime.fromJSDate(this.timestamp).toLocaleString(DateTime.DATE_MED) : ''
})

module.exports = mongoose.model('Message', MessageSchema)
