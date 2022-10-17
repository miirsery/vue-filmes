const Router = require('express')
const router = Router.Router()

const employeesController = require('../controllers/employees.controller')

router.get('/', employeesController.getEmployees)

module.exports = router
