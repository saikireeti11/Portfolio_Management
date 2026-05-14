require('dotenv').config({ quiet: true });
const app = require('./app');
const pool = require('./config/Db');

const PORT = process.env.PORT || 5000;

const start = async () => {
  try {
    // Test DB connection
    await pool.query('SELECT 1');
    console.log('Database connection verified');

    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  } catch (err) {
    console.error('Failed to start server:', err.message);
    process.exit(1);
  }
};

start();
