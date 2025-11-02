import pool from '../config/db.js';

class Order {
  static async findAll() {
    const result = await pool.query('SELECT * FROM orders');
    return result.rows;
  }

  static async findById(id) {
    const result = await pool.query('SELECT * FROM orders WHERE id = $1', [id]);
    return result.rows[0];
  }

  static async create(data) {
    const { user_id, product_id, quantity } = data;
    const result = await pool.query('INSERT INTO orders (user_id, product_id, quantity) VALUES ($1, $2, $3) RETURNING id', [user_id, product_id, quantity]);
    return result.rows[0].id;
  }

  static async update(id, data) {
    const { user_id, product_id, quantity } = data;
    await pool.query('UPDATE orders SET user_id = $1, product_id = $2, quantity = $3 WHERE id = $4', [user_id, product_id, quantity, id]);
  }

  static async delete(id) {
    await pool.query('DELETE FROM orders WHERE id = $1', [id]);
  }
}

export default Order;