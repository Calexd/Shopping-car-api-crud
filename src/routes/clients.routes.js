const { Router } = require('express')
const ClientsController = require('../controllers/ClientController')

const clientsRoutes = new Router()

const clientController = new ClientsController()


clientsRoutes.post('/', clientController.createClient)
// clientsRoutes.get('/', ClientsController.listClients)
clientsRoutes.delete('/delete-client/:id', clientController.deleteClients)
// clientsRoutes.put('/update-client/:id', ClientsController.updateClient)

module.exports = clientsRoutes 