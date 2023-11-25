const express = require('express')
const router = express.Router()
const { signup } = require('../utils/auth')

/* GET home page. */
router.get('/', (req, res) => {
  // res.render('index', { title: 'App Title' })
  res.redirect('/messages')
})

router.get('/register', (req, res) => {
  res.render('signup', { title: 'Sign Up', libs: ['signup'] })
})

router.post('/register', signup)

router.get('/login', (req, res) => {
  res.render('login', { title: 'Login' })
})

module.exports = router
