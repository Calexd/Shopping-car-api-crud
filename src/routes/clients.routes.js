const { Router } = require('express')
const ClientsController = require('../controllers/ClientController')

const clientsRoutes = new Router()


const clientsController = new ClientsController()

clientsRoutes.post('/', clientsController.createClient.bind(clientsController))

module.exports = clientsRoutes