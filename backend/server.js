require('dotenv').config(); // Load environment variables from .env file
const express = require('express');
const cors = require('cors');
const shopRoutes = require('./routes/shopRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.use('/api/shops', shopRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
