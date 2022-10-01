const LocalStrategy = require('passport-local').Strategy
const bcrypt = require('bcryptjs')
const passportJWT = require("passport-jwt");
const JWTStrategy = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt

function initialize(passport, getUserByEmail, getUserById) {
    passport.use('get-token',
        new LocalStrategy(
            {
                usernameField: 'email',
                passwordField: 'password'
            },
            async (email, password, done) => {
        const user = await getUserByEmail(email)

        if (user === null) {
            return done(null, false, { message: 'No user with that email' })
        }

        try {
            if (await bcrypt.compare(password, user.password)) {
                return done(null, user)
            } else {
                return done(null, false, { message: 'Password incorrect' })
            }
        } catch (e) {
            return done(e)
        }
    }))
    passport.use(new JWTStrategy({
            jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
            secretOrKey   : 'secretKey'
        },
        (jwtPayload, done) => {
            try {
                return done(null, getUserById(jwtPayload.sub));
            } catch (error) {
                return done(error)
            }
        }
    ))
    passport.serializeUser((user, done) => done(null, user.id))
    passport.deserializeUser((id, done) => {
        return done(null, getUserById(id))
    })
}

module.exports = initialize
