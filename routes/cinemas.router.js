const Router = require('express')
const router = Router.Router()

const { checkRole } = require('../utils/check.ts')

const cinemasController = require('../controllers/cinemas.controller')

router.get('/', cinemasController.getCinemas)
router.get('/:id', cinemasController.getCinema)
router.post('/', (req, res, next) => checkRole(req, res, next, ['admin']), cinemasController.createCinema)
router.delete('/:id', (req, res, next) => checkRole(req, res, next, ['admin']), cinemasController.deleteCinema)
router.get('/favorite', cinemasController.getFavoriteMoviesList)
router.patch('/favorite', cinemasController.addMoviesToFavorite)

module.exports = router
