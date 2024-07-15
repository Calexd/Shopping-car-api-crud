const { Router} = require('express')
const UserController = require('../controllers/UserController')


const usuariosRoutes = new Router()



usuariosRoutes.post("/", UserController.createAccount)

module.exports = usuariosRoutes