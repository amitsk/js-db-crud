import pool from '../config/db.js';

class User {
  static async findAll() {
    const result = await pool.query('SELECT * FROM users');
    return result.rows;
  }

  static async findById(id) {
    const result = await pool.query('SELECT * FROM users WHERE id = $1', [id]);
    return result.rows[0];
  }

  static async create(data) {
    const { name, email } = data;
    const result = await pool.query('INSERT INTO users (name, email) VALUES ($1, $2) RETURNING id', [name, email]);
    return result.rows[0].id;
  }

  static async update(id, data) {
    const { name, email } = data;
    await pool.query('UPDATE users SET name = $1, email = $2 WHERE id = $3', [name, email, id]);
  }

  static async delete(id) {
    await pool.query('DELETE FROM users WHERE id = $1', [id]);
  }
}

export default User;