const pool = require('../config/db');

const getNotes = async (req, res) => {
  const { userId } = req.query; 
  
  try {
    const result = await pool.query(
      'SELECT * FROM notes WHERE user_id = $1 ORDER BY created_at DESC', 
      [userId]
    );
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const createNote = async (req, res) => {
  const { title, content, color, userId } = req.body;
  
  try {
    const result = await pool.query(
      'INSERT INTO notes (title, content, color, user_id) VALUES ($1, $2, $3, $4) RETURNING *',
      [title, content, color, userId]
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