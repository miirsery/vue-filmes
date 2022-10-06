const Router = require('express')
const router = Router.Router()

const cinemasController = require('../controllers/cinemas.controller')

router
    .post('/', cinemasController.createCinema)
    .get('/', cinemasController.getCinemas)
    .delete('/:id', cinemasController.deleteCinema)

module.exports = router
