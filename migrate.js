// const { Pool } = require('pg')
// const pool = new Pool({
//     user: "socialUser",
//     password: "socialPassword",
//     host: "localhost",
//     port: 5432,
//     database: "social_db"
// })
//
// module.exports = {
//     async query(text, params) {
//         const start = Date.now()
//         const res = await pool.query(text, params)
//         const duration = Date.now() - start
//         console.log('executed query', { text, duration, rows: res.rowCount })
//         return res
//     },
//     async getClient() {
//         const client = await pool.connect()
//         const query = client.query
//         const release = client.release
//         // set a timeout of 5 seconds, after which we will log this client's last query
//         const timeout = setTimeout(() => {
//             console.error('A client has been checked out for more than 5 seconds!')
//             console.error(`The last executed query on this client was: ${client.lastQuery}`)
//         }, 5000)
//         // monkey patch the query method to keep track of the last query executed
//         client.query = (...args) => {
//             client.lastQuery = args
//             return query.apply(client, args)
//         }
//         client.release = () => {
//             // clear our timeout
//             clearTimeout(timeout)
//             // set the methods back to their old un-monkey-patched version
//             client.query = query
//             client.release = release
//             return release.apply(client)
//         }
//         return client
//     }
// }
//
//
// async function getOutstandingMigrations(migrations = []) {
//     const files = await promisify(fs.readdir)(__dirname);
//     const sql = await Promise.all(
//         files
//             .filter((file) => file.split(".")[1] === "sql")
//             .filter((file) => !migrations.includes(file))
//             .map(async (file) => ({
//                 file,
//                 query: await promisify(fs.readFile)(`${__dirname}/${file}`, {
//                     encoding: "utf-8",
//                 }),
//             }))
//     );
//
//     return sql;
// }
//
//
// async function migrate() {
//     const client = await getClient();
//     try {
//         // Start transaction
//         await client.query("BEGIN");
//
//         // Run each migration sequentially in a transaction
//         for (let migration of outstandingMigrations) {
//             // Run the migration
//             await client.query(migration.query.toString());
//             // Keep track of the migration
//             await client.query("INSERT INTO migrations (file) VALUES ($1)", [
//                 migration.file,
//             ]);
//         }
//
//         // All good, we can commit the transaction
//         await client.query("COMMIT");
//     } catch (err) {
//         // Oops, something went wrong, rollback!
//         await client.query("ROLLBACK");
//     } finally {
//         // Don't forget to release the client!
//         client.release();
//     }
// }


