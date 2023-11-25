const express = require('express')
const router = express.Router()

/* GET home page. */
router.get('/', (req, res) => {
  // res.render('index', { title: 'App Title' })
  res.redirect('/messages')
})

router.get('/register', (req, res) => {
  res.render('register', { title: 'Sign Up', libs: ['register'] })
})

router.get('/login', (req, res) => {
  res.render('login', { title: 'Login' })
})

module.exports = router
