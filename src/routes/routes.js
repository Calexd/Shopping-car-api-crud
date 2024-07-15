const { Router } = require('express')

const clientsRoutes = require('./clients.routes')
const usuariosRoutes = require('./users.routes')


const LoginController = require('../controllers/LoginController')


// const productRoutes = require('./product.routes')
// const ordersRoutes = require('../orders')

const routes = new Router()


routes.use('/clients', clientsRoutes)
// routes.use('/products', productRoutes)
// routes.use('/orders', ordersRoutes)


// user Routes:

routes.use('/users', usuariosRoutes)


// login Routes: 

routes.post('/login', LoginController.login)



module.exports = routes