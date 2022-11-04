const Router = require('express')
const router = Router.Router()

const hallsController = require('../controllers/halls.controller')
const { checkRole } = require('../utils/check.ts')

router
  .get('/schema', hallsController.getSchema)
  .get('/', hallsController.getHalls)
  .get('/:id', hallsController.getHall)
  .post('/', (req, res, next) => checkRole(req, res, next, ['admin']), hallsController.createHall)
  .post('/schema', (req, res, next) => checkRole(req, res, next, ['admin']), hallsController.createSchema)
  .delete('/:id', (req, res, next) => checkRole(req, res, next, ['admin']), hallsController.deleteHall)

module.exports = router
