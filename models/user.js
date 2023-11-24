const mongoose = require('mongoose')

const Schema = mongoose.Schema

const UserSchema = new Schema({
  first_name: { type: String, required: [true, 'First name is required'], maxLength: 100 },
  last_name: { type: String, required: [true, 'Last name is required'], maxLength: 100 },
  email: {
    type: String,
    required: [true, 'Email is required'],
    minLength: 3,
    maxLength: 100,
    trim: true,
    unique: true,
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
    minLength: 1,
    maxLength: 100,
  },
  membership_status: {
    type: String,
    enum: ['active', 'inactive', 'admin'],
    default: 'inactive',
    required: true,
  },
})

// Virtual for author's full name (no arrow function as we need the this)
UserSchema.virtual('name').get(function () {
  return this.first_name && this.family_name ? `${this.first_name} ${this.family_name}` : ''
})

module.exports = mongoose.model('User', UserSchema)
