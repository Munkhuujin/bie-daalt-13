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

findAll(filters = {}) {
    let query = 'SELECT * FROM tasks WHERE 1=1';
    const params = [];

    if (filters.search) {
      query += ' AND (title LIKE ? OR description LIKE ?)';
      const searchPattern = `%${filters.search}%`;
      params.push(searchPattern, searchPattern);
    }

    if (filters.status) {
      query += ' AND status = ?';
      params.push(filters.status);
    }

    if (filters.priority) {
      query += ' AND priority = ?';
      params.push(filters.priority);
    }

    if (filters.due_before) {
      query += ' AND due_date <= ?';
      params.push(filters.due_before);
    }

    if (filters.due_after) {
      query += ' AND due_date >= ?';
      params.push(filters.due_after);
    }

    const sortBy = filters.sort_by || 'created_at';
    const allowedSorts = ['created_at', 'due_date', 'priority', 'title'];
    const safeSortBy = allowedSorts.includes(sortBy) ? sortBy : 'created_at';
    
    const sortOrder = filters.sort_order === 'asc' ? 'ASC' : 'DESC';
    query += ` ORDER BY ${safeSortBy} ${sortOrder}`;

    return db.prepare(query).all(...params);
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