const db = require('../db/database');

const taskRepository = {
  create(task) {
    const stmt = db.prepare(`
      INSERT INTO tasks (title, description, status, priority, due_date)
      VALUES (?, ?, ?, ?, ?)
    `);
    const result = stmt.run(
      task.title,
      task.description || null,
      task.status || 'todo',
      task.priority || 'medium',
      task.due_date || null
    );
    return this.findById(result.lastInsertRowid);
  },

  findAll() {
    return db.prepare('SELECT * FROM tasks ORDER BY created_at DESC').all();
  },

  findById(id) {
    return db.prepare('SELECT * FROM tasks WHERE id = ?').get(id);
  },

  update(id, updates) {
    const existing = this.findById(id);
    if (!existing) return null;

    const merged = { ...existing, ...updates };
    const stmt = db.prepare(`
      UPDATE tasks
      SET title = ?, description = ?, status = ?, priority = ?, 
          due_date = ?, updated_at = CURRENT_TIMESTAMP
      WHERE id = ?
    `);
    stmt.run(
      merged.title,
      merged.description,
      merged.status,
      merged.priority,
      merged.due_date,
      id
    );
    return this.findById(id);
  },

  delete(id) {
    const result = db.prepare('DELETE FROM tasks WHERE id = ?').run(id);
    return result.changes > 0;
  }
};

module.exports = taskRepository;