const pool = require('../config/db');
const bcrypt = require('bcryptjs');

// REGISTER
const register = async (req, res) => {
  const { fullName, username, email, password } = req.body;
  try {
    const userExists = await pool.query(
      'SELECT * FROM users WHERE email = $1 OR username = $2',
      [email, username]
    );
    if (userExists.rows.length > 0) {
      return res.status(400).json({ error: 'Email atau Username sudah terdaftar!' });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = await pool.query(
      'INSERT INTO users (full_name, username, email, password) VALUES ($1, $2, $3, $4) RETURNING id, full_name, username, email',
      [fullName, username, email, hashedPassword]
    );

    res.status(201).json(newUser.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// LOGIN
const login = async (req, res) => {
  const { identifier, password } = req.body;
  try {
    const user = await pool.query(
      'SELECT * FROM users WHERE email = $1 OR username = $1',
      [identifier]
    );

    if (user.rows.length === 0) {
      return res.status(400).json({ error: 'User tidak ditemukan!' });
    }

    const validPassword = await bcrypt.compare(password, user.rows[0].password);
    if (!validPassword) {
      return res.status(400).json({ error: 'Password salah!' });
    }

    res.json({
      id: user.rows[0].id,
      fullName: user.rows[0].full_name,
      username: user.rows[0].username,
      email: user.rows[0].email
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = { register, login };