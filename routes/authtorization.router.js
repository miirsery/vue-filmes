const Router = require('express')
const router = Router.Router()
const authController = require('../controllers/auth.controller')
const initialPassport = require('../passport-config')
const passport = require('passport')
const jwt = require('jsonwebtoken')

const { getUserById, getUserByEmail } = require('../repositories/users.reposotory.js')
const moment = require('moment')

initialPassport(
  passport,
  async (email) => await getUserByEmail(email),
  async (id) => await getUserById(id)
)

const getToken = (user) => {
  return jwt.sign(
    {
      login: user.login,
      role: user.role,
      iss: 'secretKey',
      sub: user.id,
      iat: new Date().getTime(),
      exp: new Date().setDate(new Date().getDate() + 1),
    },
    'secretKey'
  )
}

router
  .post(
    '/get-token',
    authController.checkNotAuthenticated,
    passport.authenticate('get-token', {
      successRedirect: '/api/v1/auth/token',
      failureRedirect: '/api/v1/auth/login/failure',
      failureFlash: true,
    })
  )
  .get('/login/failure', function (res, req) {
    return req.sendStatus(500).setHeader('Content-Type', 'application/json').json({
      status: 'Fail',
      message: 'Fail while auth',
    })
  })
  .get('/token', async function (res, req) {
    const user = await res.user
    const token = getToken(user)

    return req.status(200).setHeader('Content-Type', 'application/json').json({ token })
  })
  .post('/login', passport.authenticate('jwt', { session: false }), (req, res, next) => {
    return res.status(200).setHeader('Content-Type', 'application/json').json({
      message: 'Успешный вход',
    })
  })
  .get('/self', passport.authenticate('jwt', { session: false }), async (req, res, next) => {
    const user = await req.user

    const changedRegisterDate = moment(user.register_date).format('DD-MM-YYYY;HH:MM:SS')
    const changedBirthdate = moment(user.birthdate).format('DD-MM-YYYY')

    delete user.register_date
    delete user.birthdate
    delete user.password

    return res
      .status(200)
      .setHeader('Content-Type', 'application/json')
      .json(Object.assign(user, { register_date: changedRegisterDate, birthdate: changedBirthdate }))
  })

module.exports = router
