const Message = require('../models/message')
// const User = require('../models/user')

const asyncHandler = require('express-async-handler')
const { body, validationResult } = require('express-validator')

exports.index = asyncHandler(async (req, res) => {
  const allMessages = await Message.find({}).populate('author').exec()
  res.render('message_index', { title: 'Messages', messages: allMessages, libs: ['message_index'] })
})

exports.message_create_post = [
  // Validate and sanitize fields
  body('title', 'Title must not be empty.').trim().isLength({ min: 1 }).escape(),
  body('text', 'Text must not be empty.').trim().isLength({ min: 1 }).escape(),
]
