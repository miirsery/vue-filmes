const Router = require('express')
const router = Router.Router()
const initialPassport = require('../../passport-config')
const passport = require('passport')
const jwt = require('jsonwebtoken')

const moment = require('moment')

const { getUserById, getUserByEmail } = require('../../repositories/users.reposotory.js')
const { getAllByUserId } = require('../../repositories/tickets.repository.js')
const { getMovieByTicket } = require('../../repositories/movies.repository')

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
    (req, res, next) => {
      return next()
    },
    passport.authenticate('get-token', {
      successRedirect: '/api/v1/main/auth/token',
      failureRedirect: '/api/v1/main/auth/login/failure',
      failureFlash: true,
    })
  )
  .get('/login/failure', (res, req) => {
    return req.status(500).setHeader('Content-Type', 'application/json').json({
      status: 'Fail',
      message: 'fail while auth',
    })
  })
  .get('/token', async function (res, req) {
    const user = await res.user

    const token = await getToken(user)

    return req.status(200).setHeader('Content-Type', 'application/json').json({ token })
  })
  .get('/login', passport.authenticate('jwt', { session: false }), (req, res, next) => {
    return res.status(200).setHeader('Content-Type', 'application/json').json({
      message: 'Успешный вход',
    })
  })
  .get('/self', passport.authenticate('jwt', { session: false }), async (req, res, next) => {
    const user = await req.user

    const tickets = await getAllByUserId(user.id).then((r) => r.rows)

    const newTickets = []

    const changedRegisterDate = moment(user.register_date).format('DD-MM-YYYY;HH:MM:SS')
    const changedBirthdate = moment(user.birthdate).format('DD-MM-YYYY')

    for (const ticket of tickets) {
      const changedBuyDate = moment(ticket.buy_date).format('DD-MM-YYYY;HH:MM:SS')

      delete ticket.buy_date

      const movie = await getMovieByTicket(ticket.session_id).then((r) => r.rows[0])

      newTickets.push(Object.assign(ticket, { buy_date: changedBuyDate, movie }))
    }

    const info = {
      register_date: changedRegisterDate,
      birthdate: changedBirthdate,
      tickets: newTickets,
    }

    delete user.register_date
    delete user.birthdate
    delete user.password

    return res.status(200).setHeader('Content-Type', 'application/json').json(Object.assign(user, info))
  })

module.exports = router
