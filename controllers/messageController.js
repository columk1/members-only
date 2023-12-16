const Message = require('../models/message')
// const User = require('../models/user')

const asyncHandler = require('express-async-handler')
const { body, validationResult } = require('express-validator')

exports.index = asyncHandler(async (req, res) => {
  const LIMIT = 5
  const page = +req.query.page || 1
  const msgCount = await Message.countDocuments({})
  const allMessages = await Message.find({})
    .skip((page - 1) * LIMIT)
    .limit(LIMIT)
    .populate('author')
    .exec()
  const errors = req.session.errors
  res.render('message_index', {
    title: 'Messages',
    messages: allMessages,
    currentPage: page,
    // prettier-ignore
    hasNextPage: (LIMIT * page) < msgCount,
    hasPreviousPage: page > 1,
    nextPage: page + 1,
    previousPage: page - 1,
    lastPage: Math.ceil(msgCount / LIMIT),
    errors: errors,
    libs: ['message_index'],
  })
  // Clear the errors array from the session after the page has been rendered
  req.session.errors = undefined
  req.session.save((err) => {
    if (err) {
      throw err
    }
  })
})

exports.message_create_post = [
  // Validate and sanitize fields
  body('title', 'Title must not be empty.').trim().isLength({ min: 1 }).escape(),
  body('text', 'Text must not be empty.').trim().isLength({ min: 1 }).escape(),

  asyncHandler(async (req, res) => {
    const errors = validationResult(req)

    const message = new Message({
      title: req.body.title,
      text: req.body.text,
      author: req.user._id,
    })

    if (!errors.isEmpty()) {
      req.session.errors = errors.array()
      res.redirect('/messages')
      return
    } else {
      // Data from form is valid
      await message.save()
      res.redirect('/')
    }
  }),
]

exports.message_delete_post = asyncHandler(async (req, res) => {
  if (req.user.membership_status !== 'admin') res.status(401)
  const deletedMsg = await Message.findByIdAndDelete(req.params.id)
  // The error condition below isn't reached. If the Id isn't found the server throws a 404 error
  if (!deletedMsg) {
    req.session.errors = ['Invalid Id']
    res.redirect('/messages')
  } else {
    res.status(200).json({ data: deletedMsg })
  }
})
