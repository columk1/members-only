const express = require('express')
const router = express.Router()

// Require controller modules
const user_controller = require('../controllers/userController')
const message_controller = require('../controllers/messageController')

/* GET messages */
router.get('/', message_controller.index)
// router.get('/new', message_controller.message_create_get)
// router.post('/new', message_controller.message_create_post)
// router.get('/update/:id', message_controller.message_update_get)
// router.post('/update/:id', message_controller.message_update_post)
// router.get('/delete/:id', message_controller.message_delete_get)
// router.post('/delete/:id', message_controller.message_delete_post)

module.exports = router
