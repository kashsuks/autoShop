const express = require('express');
const pool = require('./services/dbService');  // Import the dbService (PostgreSQL connection)

const app = express();
const PORT = process.env.PORT || 3000;

// Example route to check database connection
app.get('/dbtest', (req, res) => {
  pool.query('SELECT NOW()', (err, result) => {
    if (err) {
      res.status(500).json({ error: err.stack });
    } else {
      res.status(200).json({ message: 'Database connected', data: result.rows });
    }
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
