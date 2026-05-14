const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const pool = require('../config/Db');

const register = async ({ name, email, password }) => {
  // Check if email already exists
  const existing = await pool.query('SELECT user_id FROM users WHERE email = $1', [email]);
  if (existing.rows.length > 0) {
    const err = new Error('Email already registered');
    err.status = 400;
    throw err;
  }

  const hashed = await bcrypt.hash(password, 10);
  const result = await pool.query(
    'INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING user_id, name, email, created_at',
    [name, email, hashed]
  );

  const user = result.rows[0];
  const token = jwt.sign({ user_id: user.user_id, email: user.email }, process.env.JWT_SECRET, {
    expiresIn: '7d',
  });

  return { user, token };
};

const login = async ({ email, password }) => {
  const result = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
  if (result.rows.length === 0) {
    const err = new Error('Invalid email or password');
    err.status = 401;
    throw err;
  }

  const user = result.rows[0];
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    const err = new Error('Invalid email or password');
    err.status = 401;
    throw err;
  }

  const token = jwt.sign({ user_id: user.user_id, email: user.email }, process.env.JWT_SECRET, {
    expiresIn: '7d',
  });

  return {
    user: { user_id: user.user_id, name: user.name, email: user.email },
    token,
  };
};

const getProfile = async (user_id) => {
  const result = await pool.query(
    'SELECT user_id, name, email, created_at FROM users WHERE user_id = $1',
    [user_id]
  );
  if (result.rows.length === 0) {
    const err = new Error('User not found');
    err.status = 404;
    throw err;
  }
  return result.rows[0];
};

module.exports = { register, login, getProfile };
