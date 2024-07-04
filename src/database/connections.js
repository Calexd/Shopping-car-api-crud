const { Pool } = require('pg');

class Database {
    constructor() {
        this.database = new Pool({
            host: "localhost",
            port: 5432,
            user: "postgres",
            password: "postgre",
            database: "M2S06"         
        })
    }
    query(text, params) {
        return this.pool.query(text, params)
    }
}

module.exports = Database;