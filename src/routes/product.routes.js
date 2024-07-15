const { Router } = require('express')
const ProductController = require('../controllers/ProductsController')
const validateToken = require('../middlewares/validateToken')


const productRoutes = new Router()


productRoutes.post('/', validateToken, ProductController.createProduct)

// productRoutes.get('/', productController.showProducts.bind(productController))
// productRoutes.delete('/:id', productController.deletarProduct.bind(productController))
// productRoutes.get('/detail/:id', productController.showProductDetail.bind(productController))

module.exports = productRoutes

