const Pool = require('pg').Pool

//migrations
// require('sql-migrations').migrate({
//     // configuration here. See the Configuration section
// });

const pool = new Pool({
    user: "socialUser",
    password: "socialPassword",
    host: "localhost",
    port: 5432,
    database: "social_db"
})

module.exports = pool

