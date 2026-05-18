const db = require('../config/database');

const Category = {

  getAll: async () => {
    const [rows] = await db.query('SELECT id, name FROM category');
    return rows;
  },

  getById: async (id) => {
    const [rows] = await db.query('SELECT id, name FROM category WHERE id = ?', [id]);
    return rows[0];
  },

  create: async (name) => {
    const [result] = await db.query('INSERT INTO category (name) VALUES (?)', [name]);
    return { id: result.insertId, name };
  },

  update: async (id, name) => {
    const [result] = await db.query('UPDATE category SET name = ? WHERE id = ?', [name, id]);
    return result.affectedRows > 0;
  },

  delete: async (id) => {
    const [result] = await db.query('DELETE FROM category WHERE id = ?', [id]);
    return result.affectedRows > 0;
  }
};

module.exports = Category;