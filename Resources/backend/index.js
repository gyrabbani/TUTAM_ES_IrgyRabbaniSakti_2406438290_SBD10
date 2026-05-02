const express = require('express');
const cors = require('cors');
require('dotenv').config();
const pool = require('./config/db');

const app = express();
const port = process.env.PORT || 5000;

// middleware
app.use(cors()); // mengizinkan request dari frontend (localhost:3000)
app.use(express.json()); // baca request format JSON

// manggil noteRoutes di routes
const noteRoutes = require('./routes/noteRoutes');
app.use('/api/notes', noteRoutes);

// manggil authRoutes
const authRoutes = require('./routes/authRoutes');
app.use('/api/auth', authRoutes);

// test route sederhana
app.get('/', (req, res) => {
  res.send('Backend Coretan berjalan');
});

app.listen(port, async () => {
  console.log(`Server berjalan di http://localhost:${port}`);
  
  try {
    const client = await pool.connect();
    console.log("Berhasil connect ke database PostgreSQL Neon!");
    client.release();
  } catch (err) {
    console.error("Gagal connect ke database:", err.message);
  }
});

module.exports = app;