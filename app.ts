'use strict';

if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
}
import { Request, Response } from "express";

const express = require('express'),
    app = express(),
    cors = require('cors'),
    flash = require('express-flash'),
    session = require('express-session'),
    passport = require('passport'),
    bodyParser = require('body-parser'),
    authRouter = require('./routes/authtorization.router'),
    usersRouter = require('./routes/users.router'),
    moviesRouter = require('./routes/movies.router');

app.use(express.static('public'))
app.use('/media', express.static(__dirname + '/media'))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(bodyParser.json())
app.use(cors())
app.use(flash())
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false
}))
app.use(passport.initialize())
app.use(passport.session())

app.set('view engine', 'ejs')

app.use('/api/v1', authRouter)
app.use('/api/v1/users', usersRouter)
app.use('/api/v1/movies', moviesRouter)

app.get('/', (req: any, res: any) => {
    req.send({
        status: 'Ok',
        message: 'Success'
    })
})

const PORT = process.env.PORT || 3030

const start = () => {
    try {
        app.listen(PORT, () => {
            console.log(`server staring on port: ${PORT}`)
        })
    } catch (e) {
        console.log(e)
    }
}

start()
