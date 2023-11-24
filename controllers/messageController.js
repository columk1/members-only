const Message = require('../models/message')
// const User = require('../models/user')

const asyncHandler = require('express-async-handler')
const { body, validationResult } = require('express-validator')

exports.index = asyncHandler(async (req, res) => {
  const allMessages = await Message.find({}).populate('author').exec()
  res.render('message_index', { title: 'Messages', messages: allMessages })
})
