const { Router } = require('express')

const clientsRoutes = require('./clients.routes')
// const productRoutes = require('./product.routes')
// const ordersRoutes = require('../orders')

const routes = new Router()


routes.use('/clients', clientsRoutes)
// routes.use('/products', productRoutes)
// routes.use('/orders', ordersRoutes)



module.exports = routes