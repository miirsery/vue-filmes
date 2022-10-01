const Router = require('express')
const router = Router.Router()
const userController = require('../controllers/user.controller')
const authController = require("../controllers/auth.controller");

// router.get('/self', authController.checkAuthenticated, userController.getSelf)
