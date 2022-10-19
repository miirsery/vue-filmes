const Router = require('express')
const router = Router.Router()
const userController = require('../controllers/user.controller')
/**
 * @swagger
 * components:
 *   schemas:
 *     Person:
 *       type: object
 *       required:
 *         - login
 *         - email
 *         - password
 *       properties:
 *         id:
 *           type: number
 *           description: The auto-generated id of the person
 *         name:
 *           type: string
 *           description: The description of the person
 *         surname:
 *           type: string
 *           description: The book title
 *         patronymic:
 *           type: string
 *           description: The book author
 *         role:
 *           type: string
 *           description: The role user
 *       example:
 *         id: 1
 *         name: Some name
 *         surname: Some surname
 *         patronymic: Some patronymic
 *         email: someEmail@gmail.com
 *         login: someLogin123
 *         register_date: 21-12-2022
 *         birthdate: 01-01-2001
 *         avatar: http://localhost:3030/media/some-image.jpg
 */

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: The books managing API
 */

/**
 * @swagger
 * /api/v1/users:
 *   get:
 *     summary: Returns the list of all the users
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: The list of the users
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Person'
 */

router.get('/', userController.getUsers)

/**
 * @swagger
 * /api/v1/users:
 *   get:
 *     summary: Returns the list of all the users
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: The list of the users
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Person'
 */
router.get('table', userController.getUsersTable)

router.post('/discount', userController.setUserDiscount)
router.post('/', userController.registerUser)

router.delete('/:id', userController.deleteUser)

router.patch('/:id', userController.updateUser)

module.exports = router
