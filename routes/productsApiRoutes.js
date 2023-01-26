const express = require('express')
const productsApiController = require('../controllers/productsApiController')
const productsApiRouter = express.Router();

productsApiRouter.get('/:id?',productsApiController.getProducts)
productsApiRouter.post('/',productsApiController.createProduct);
productsApiRouter.put('/:id', productsApiController.updateProduct)
productsApiRouter.delete('/:id', productsApiController.deleteProduct)

module.exports = productsApiRouter;
