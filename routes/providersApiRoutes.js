const express = require('express')
const providersApiRouter = express.Router()
const providerApiController = require('../controllers/providersApiController')

providersApiRouter.get('/', providerApiController.getProviders)
providersApiRouter.post('/', providerApiController.createProvider)

module.exports = providersApiRouter;
