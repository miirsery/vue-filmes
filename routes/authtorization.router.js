const Router = require('express')
const router = Router.Router()
const authController = require('../controllers/auth.controller')
const initialPassport = require('../passport-config')
const passport = require('passport')
const db = require("../db");
const jwt = require("jsonwebtoken");

initialPassport(
    passport,
    async (email) => {
        const data = await db.query(`SELECT * FROM users`)
        return data.rows.find(user => user.email === email)
    },
    async (id) => {
        const data = await db.query(`SELECT * FROM users`)
        return data.rows.find(user => user.id === id)
    }
)

genToken = user => {
    return jwt.sign({
        iss: 'secretKey',
        sub: user.id,
        iat: new Date().getTime(),
        exp: new Date().setDate(new Date().getDate() + 1)
    }, 'secretKey');
}

router
    .post('/get-token', authController.checkNotAuthenticated, passport.authenticate('get-token', {
        successRedirect: '/api/v1/token',
        failureRedirect: '/api/v1/login/failure',
        failureFlash: true
    }))
    .get('/login/failure', function (res, req) {
        req.send({
            status: 'Fail',
            message: 'Fail while auth'
        })
    })
    .get('/token', async function (res, req) {
        const user = await res.user
        const token = genToken(user)

        await req
            .status(200)
            .setHeader('Content-Type', 'application/json')
            .json({ token })
    })
    .post('/login',
        authController.checkNotAuthenticated,
        passport.authenticate(
            'jwt',
            { session: false }),
        (req, res, next) => {
            res
                .status(200)
                .setHeader('Content-Type', 'application/json')
                .json({
                    message: 'Успешный вход',
                })
    })
    .get('/self', authController.checkAuthenticated,  passport.authenticate(
        'jwt',
        { session: false }),
        async (req, res, next) => {
        const user = await req.user
        delete user.password
        res
            .status(200)
            .setHeader('Content-Type', 'application/json')
            .json(user)
        }
        )
    .post('/register', authController.register)


module.exports = router
