const express = require('express')
const providersApiRouter = express.Router()
const providerApiController = require('../controllers/providersApiController')

providersApiRouter.get('/:name?', providerApiController.getProviders)
providersApiRouter.post('/', providerApiController.createProvider)

module.exports = providersApiRouter;
