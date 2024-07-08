const { Router } = require('express')
const ProductController = require('../controllers/ProductsController')


const productRoutes = new Router()
const productController = new ProductController()


productRoutes.post('/', productController.createProduct.bind(productController))
productRoutes.get('/', productController.showProducts.bind(productController))
productRoutes.delete('/:id', productController.deletarProduct.bind(productController))
productRoutes.get('/detail/:id', productController.showProductDetail.bind(productController))

module.exports = productRoutes

