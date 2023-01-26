const express = require('express')
const providersApiRouter = express.Router()
const providersApiController = require('../controllers/providersApiController')

providersApiRouter.get('/:name?', providersApiController.getProviders)
providersApiRouter.post('/', providersApiController.createProvider)
providersApiRouter.put('/:name', providersApiController.updateProvider)
providersApiRouter.delete('/:name', providersApiController.deleteProvider)

module.exports = providersApiRouter;
