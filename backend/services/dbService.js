const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL || 'postgresql://postgres:QzcrkoqIXXHhxbvOFeeAkiMfvpQMpRVb@postgres.railway.internal:5432/railway',
  ssl: {
    rejectUnauthorized: false
  }
});

// Example query to test the connection
pool.query('SELECT NOW()', (err, res) => {
  if (err) {
    console.error('Error executing query', err.stack);
  } else {
    console.log('Connected to database', res.rows);
  }
});

module.exports = pool;
