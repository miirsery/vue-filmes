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
    //...
}

module.exports = new AuthController()
module.exports.checkAuthenticated = checkAuthenticated
module.exports.checkNotAuthenticated = checkNotAuthenticated
