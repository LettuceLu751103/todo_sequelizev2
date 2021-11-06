const express = require('express')
const router = express.Router()
const { authenticator } = require('../middleware/auth')

const home = require('./modules/home')
const Users = require('./modules/users')
const Todos = require('./modules/todos')

console.log(authenticator)
router.use('/users/', Users)
router.use('/todos/', authenticator, Todos)
router.use('/', authenticator, home)

module.exports = router