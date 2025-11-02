import pool from '../config/db.js';

class Product {
  static async findAll() {
    const result = await pool.query('SELECT * FROM products');
    return result.rows;
  }

  static async findById(id) {
    const result = await pool.query('SELECT * FROM products WHERE id = $1', [id]);
    return result.rows[0];
  }

  static async create(data) {
    const { name, price, description } = data;
    const result = await pool.query('INSERT INTO products (name, price, description) VALUES ($1, $2, $3) RETURNING id', [name, price, description]);
    return result.rows[0].id;
  }

  static async update(id, data) {
    const { name, price, description } = data;
    await pool.query('UPDATE products SET name = $1, price = $2, description = $3 WHERE id = $4', [name, price, description, id]);
  }

  static async delete(id) {
    await pool.query('DELETE FROM products WHERE id = $1', [id]);
  }
}

export default Product;