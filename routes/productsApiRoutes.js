const express = require('express')
const productsApiController = require('../controllers/productsApiController')
const productsApiRouter = express.Router();

// Rutas de API de productos

productsApiRouter.get('/:id?',productsApiController.getProducts)
productsApiRouter.post('/',productsApiController.createProduct);

module.exports = productsApiRouter;
