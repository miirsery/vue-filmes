const Router = require('express')
const multer = require("multer");
const path = require("path");
const router = Router.Router()
const movieController = require('../controllers/movies.controller')
let pathToFile = ''

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'media')
    },
    filename: (req, file, cb) => {
        const filename = file.originalname.split('.').slice(0, -1).join('.')
        const formattedFilename = `${filename}-${Date.now()}${path.extname(file.originalname)}`

        pathToFile = path.resolve('./')+'media/' + formattedFilename

        cb(null, formattedFilename)
    }
})

const upload = multer({ storage })

router.post('/', upload.any(), (req, res) => movieController.addMovie(req, res, pathToFile))
router.get('/', movieController.getMovies)
router.get('/:id', movieController.getMovie)
router.patch('/', movieController.updateMovie)

module.exports = router
