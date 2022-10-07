const Router = require('express')
const router = Router.Router()

const sessionsController = require('../controllers/sessions.controller')

router
    .post('/', sessionsController.createSession)
    .get('/', sessionsController.getSessions)

module.exports = router
