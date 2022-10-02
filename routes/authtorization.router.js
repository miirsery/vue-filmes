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
        return await db.query(`SELECT * FROM users
                                     WHERE email=$1`, [email])
            .then(r => r.rows[0])
    },
    async (id) => {
        return await db.query(`SELECT * FROM users
                                WHERE id=$1`, [id])
            .then(r => r.rows[0])
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
        return req
            .sendStatus(500)
            .setHeader('Content-Type', 'application/json')
            .json({
                status: 'Fail',
                message: 'Fail while auth'
            })
    })
    .get('/token', async function (res, req) {
        const user = await res.user
        const token = genToken(user)

        return req
            .status(200)
            .setHeader('Content-Type', 'application/json')
            .json({token})
    })
    .post('/login',
        passport.authenticate(
            'jwt',
            { session: false }),
        (req, res, next) => {
            return res
                .status(200)
                .setHeader('Content-Type', 'application/json')
                .json({
                    message: 'Успешный вход',
                })
    })
    .get('/self',  passport.authenticate(
        'jwt',
        { session: false }),
        async (req, res, next) => {
            const user = await req.user

            const registerDate = new Date(user.register_date).toISOString().slice(0, 19).replace('T', ' ');

            delete user.register_date
            delete user.password

            return res
                .status(200)
                .setHeader('Content-Type', 'application/json')
                .json(Object.assign(user, { register_date: registerDate }))
        }
        )
    .post('/register', authController.register)


module.exports = router
