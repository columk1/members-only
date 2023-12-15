const express = require('express')
const router = express.Router()
const { signup, login, join } = require('../utils/auth')

/* GET home page. */
router.get('/', (req, res) => {
  // res.render('index', { title: 'App Title' })
  res.redirect('/messages')
})

router.get('/register', (req, res) => {
  res.render('signup', { title: 'Sign Up', libs: ['signup'] })
})

router.post('/register', signup)

router.get('/login', async (req, res) => {
  res.render('login', { title: 'Login', errors: req.session.messages })
  req.session.messages = undefined
  req.session.save((err) => {
    if (err) {
      throw err
    }
  })
})

router.post('/login', login)

router.get('/logout', (req, res, next) => {
  req.logout((err) => (err ? next(err) : res.redirect('/')))
})

router.post('/join', join)

module.exports = router
