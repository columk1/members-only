const asyncHandler = require('express-async-handler')
const { body, validationResult } = require('express-validator')
const bcrypt = require('bcryptjs')
const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const User = require('../models/user')

const ACTIVE_SECRET = 'beans'
const ADMIN_SECRET = 'legumes'

const getMembershipStatus = (secret) =>
  secret === ADMIN_SECRET ? 'admin' : secret === ACTIVE_SECRET ? 'active' : null

exports.signup = [
  body('firstName').trim().isLength({ min: 1 }).escape(),
  body('lastName').trim().isLength({ min: 1 }).escape(),
  body('email').trim().isEmail().escape(),
  body('password').trim().isLength({ min: 8 }).escape(),

  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req)
    const { firstName, lastName, email, password } = req.body

    if (!errors.isEmpty()) {
      const err = new Error(errors[0])
      err.status = 400
      return next(err)
    } else {
      // Data from form is valid, check if a user with the same email address exists
      const userExists = await User.findOne({ email: email })
      if (userExists) {
        res.render('signup', {
          title: 'Sign Up',
          firstName: firstName,
          lastName: lastName,
          email: email,
          password: password,
          emailError: 'An account with this email address already exists',
          libs: ['signup'],
        })
        // const err = new Error('User already exists')
        // err.status = 400
        // return next(err)
      } else {
        const encryptedPassword = await bcrypt.hash(password, 10)

        // Create new user
        const user = await User.create({
          first_name: firstName,
          last_name: lastName,
          email: email,
          password: encryptedPassword,
        })
        console.log({ user })
        res.redirect('/login')
      }
    }
  }),
]

exports.login = [
  body('email').trim().isEmail().escape(),
  body('password').trim().isLength({ min: 8 }).escape(),

  passport.authenticate('local', {
    failureMessage: true,
    successRedirect: '/',
    failureRedirect: '/login',
  }),
]

exports.join = [
  body('secret').trim().escape(),
  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req)
    const { secret } = req.body
    let newStatus = getMembershipStatus(secret)
    if (!newStatus) errors.push('Invalid secret')

    if (!errors.isEmpty()) {
      const err = new Error(errors[0])
      err.status = 400
      return next(err)
    } else {
      const updatedUser = await User.findByIdAndUpdate(req.user._id, {
        membership_status: newStatus,
      })
      res.redirect('/messages')
    }
  }),
]
