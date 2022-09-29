const db = require('../db')
const bcrypt = require('bcryptjs')
const passport = require('passport')
const { format } = require("date-fns");

function checkAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return next()
    }

    res.redirect('/api/login')
}

function checkNotAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        res.redirect('/api')
    }

    next()
}

class AuthController {
    async register(req, res) {
        try {
            const { name, email, password, login } = req.body
            const hashedPassword = await bcrypt.hash(password, 10)
            const registrationDate = format(new Date(), 'dd-mm-yyyy')

            await db
                .query('INSERT INTO person (name, email, login, register_date, password) VALUES ($1, $2, $3, $4, $5) RETURNING *',
                [name, email, login, registrationDate, hashedPassword])

            return res
                .status(200)
                .setHeader('Content-Type', 'application/json')
                .json({
                    message: `Пользователь ${name} успешно добавлен`
                })

        } catch (error) {
            console.log(error)

            res
                .status(500)
                .json({
                    message: 'Что-то пошло не так :)'
                })
        }
    }

    async login(req, res) {
        try {
            passport.authenticate('local', {
                successRedirect: '/',
                failureRedirect: '/api/login',
                failureFlash: true
            })

            return res
                .status(200)
                .setHeader('Content-Type', 'application/json')
                .json({
                    message: 'Успешный вход'
                })
        } catch (error) {
            console.log(error)

            res
                .status(500)
                .json({
                    message: 'Что-то пошло не так :)'
                })
        }
    }
}

module.exports = new AuthController()
module.exports.checkAuthenticated = checkAuthenticated
module.exports.checkNotAuthenticated = checkNotAuthenticated
