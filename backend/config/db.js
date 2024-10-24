const { Pool } = require('pg');

const pool = new Pool({
    connectionString: process.env.DATABASE_URL, // Use your Railway PostgreSQL URL
});

module.exports = pool;
