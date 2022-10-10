const Router = require('express')
const router = Router.Router()

const cinemasController = require('../controllers/cinemas.controller')

router.post('/', cinemasController.createCinema)
router.get('/', cinemasController.getCinemas)
router.delete('/:id', cinemasController.deleteCinema)

module.exports = router
