const Router = require('express')
const router = Router.Router()
const userController = require('../controllers/user.controller')
const authController = require("../controllers/auth.controller");

router.delete(`/:id`, userController.deleteUser)
router.patch('/:id', userController.updateUser)
module.exports = router
