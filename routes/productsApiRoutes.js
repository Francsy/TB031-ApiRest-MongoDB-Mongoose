const express = require('express')
const productsApiController = require('../controllers/productsApiController')
const productsApiRouter = express.Router();

productsApiRouter.get('/:id?',productsApiController.getProducts)
productsApiRouter.post('/',productsApiController.createProduct);

module.exports = productsApiRouter;
