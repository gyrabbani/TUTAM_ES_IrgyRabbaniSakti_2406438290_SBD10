const pool = require('../config/db');

// READ: ambil semua notes (diurutkan dari yang terbaru)
const getNotes = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM notes ORDER BY created_at DESC');
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// CREATE: bikin note baru
const createNote = async (req, res) => {
  const { title, content, color } = req.body;
  try {
    const result = await pool.query(
      'INSERT INTO notes (title, content, color) VALUES ($1, $2, $3) RETURNING *',
      [title, content, color]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// UPDATE: edit note yang sudah ada
const updateNote = async (req, res) => {
  const { id } = req.params;
  const { title, content, color } = req.body;
  try {
    const result = await pool.query(
      'UPDATE notes SET title = $1, content = $2, color = $3 WHERE id = $4 RETURNING *',
      [title, content, color, id]
    );
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// DELETE: hapus note
const deleteNote = async (req, res) => {
  const { id } = req.params;
  try {
    await pool.query('DELETE FROM notes WHERE id = $1', [id]);
    res.json({ message: 'Note berhasil dihapus' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = { getNotes, createNote, updateNote, deleteNote };