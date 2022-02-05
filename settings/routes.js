'use strict'

module.exports = (app) => {
    const productController = require('./../Controller/productController')

    app.route('/products').get(productController.getProducts)
    app.route('/product').get(productController.getProduct)
    app.route('/orders/add').post(productController.addOrder)
    app.route('/products/count').get(productController.getProductsCount)
    app.route('/products/search').get(productController.getSearchedProducts)
}