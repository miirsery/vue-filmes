const db = require('../db')
const bcrypt = require('bcryptjs')
const moment = require('moment')

function checkAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return next()
    }

    res.redirect('/api/v1/token')
}

function checkNotAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return res.redirect('/api/v1/token')
    }

    next()
}

class AuthController {
    async register(req, res) {
        try {
            const { name = null, surname = null, patronymic = null, role, email, password, login } = req.body

            if (!password || !login) {
                return res
                    .status(500)
                    .setHeader('Content-Type', 'application/json')
                    .json({
                        message: `Поле ${(!login && 'Логин') || ''} ${(!password && 'Пароль') || ''} обязательно для заполнения`
                    })
            }

            if (password.length < 6) {
                return res
                    .status(500)
                    .setHeader('Content-Type', 'application/json')
                    .json({
                        message: `Пароль должен содеражть больше 6-ти символов`
                    })
            }

            const hashedPassword = await bcrypt.hash(password, 10)
            const registrationDate = moment(new Date()).format('DD-MM-YYYY hh:mm:ss')

            await db
                .query('INSERT INTO users' +
                    ' (name,' +
                    ' surname,' +
                    ' patronymic,' +
                    ' role, email,' +
                    ' password,' +
                    ' login, ' +
                    'register_date' +
                    ') VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *',
                [name, surname, patronymic, role, email, hashedPassword, login, registrationDate])

            return res
                .status(201)
                .setHeader('Content-Type', 'application/json')
                .json({
                    message: `Пользователь ${name} успешно добавлен`
                })

        } catch (error) {
            // const { email } = req.body
            // const candidate = await db.query('SELECT email FROM users WHERE email=$1', [email]).rows
            //
            // if (candidate && candidate[0]) {
            //     return res
            //         .status(500)
            //         .setHeader('Content-Type', 'application/json')
            //         .json({
            //             message: `Пользователь ${email} уже зарегистрирован`
            //         })
            // }
            return res
                .status(500)
                .setHeader('Content-Type', 'application/json')
                .json({
                    message: error.detail
                })
        }
    }
}

module.exports = new AuthController()
module.exports.checkAuthenticated = checkAuthenticated
module.exports.checkNotAuthenticated = checkNotAuthenticated
