const { Router } = require('express')
const ClientsController = require('../controllers/ClientController')

const clientsRoutes = new Router()


const clientsController = new ClientsController()

clientsRoutes.post('/', clientsController.createClient.bind(clientsController))
clientsRoutes.get('/', clientsController.listClients.bind(clientsController))
clientsRoutes.delete('/delete-client/:id', clientsController.deleteClients.bind(clientsController))
clientsRoutes.put('/update-client/:id', clientsController.updateClient.bind(clientsController))

module.exports = clientsRoutes