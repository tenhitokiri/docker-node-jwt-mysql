const host = process.env.MYSQL_SERVER
const user = process.env.MYSQL_USER
const password = process.env.MYSQL_PW
const database = process.env.MYSQL_DB
const port = process.env.MYSQL_PORT

module.exports = {
    database: {
        host,
        user,
        password,
        database,
        port
    }
};