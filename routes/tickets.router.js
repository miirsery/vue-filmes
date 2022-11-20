const Router = require('express')
const router = Router.Router()
const ticketController = require('../controllers/tickets.controller')

router.get('/', ticketController.getTickets)
router.post('/', ticketController.addTicket)
router.delete('/', ticketController.deleteTicket)

module.exports = router
