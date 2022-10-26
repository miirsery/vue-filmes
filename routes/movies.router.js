const Router = require('express')
const multer = require('multer')
const path = require('path')
const router = Router.Router()
const movieController = require('../controllers/movies.controller')

let pathToFile = ''

// TODO: Смена картинки у фильма. Сделать удаление картинки у фильма
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'media/images')
  },
  filename: (req, file, cb) => {
    const filename = file.originalname.split('.').slice(0, -1).join('.')
    const formattedFilename = `${filename}-${Date.now()}${path.extname(file.originalname)}`

    pathToFile = path.resolve('./') + 'media/images/' + formattedFilename

    cb(null, formattedFilename)
  },
})

const upload = multer({ storage })

router.get('/', movieController.getMovies)
router.get('/:id', movieController.getMovie)
router.post('/', upload.any(), (req, res) => movieController.addMovie(req, res, pathToFile))
router.patch('/', upload.any(), (req, res) => movieController.updateMovie(req, res, pathToFile))

module.exports = router
