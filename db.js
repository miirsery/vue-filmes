const Pool = require('pg').Pool

const pool = new Pool({
    user: "socialUser",
    password: "socialPassword",
    host: "localhost",
    port: 5432,
    database: "social_db"
})

module.exports = pool

