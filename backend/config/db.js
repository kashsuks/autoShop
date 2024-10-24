const { Pool } = require('pg');

const pool = new Pool({
    connectionString: process.env.DATABASE_URL, // This will pull the connection string from .env
});

module.exports = pool;
