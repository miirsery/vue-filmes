const Router = require('express')
const router = Router.Router()

const hallsController = require('../controllers/halls.controller')

router
  .post('/', hallsController.createHall)
  .get('/', hallsController.getHalls)
  .get('/:id', hallsController.getHall)
  .delete('/:id', hallsController.deleteHall)

module.exports = router
