const db = require('../db/database');

const labelRepository = {
  create(label) {
    const stmt = db.prepare(`
      INSERT INTO labels (name, color) VALUES (?, ?)
    `);
    const result = stmt.run(label.name, label.color || '#808080');
    return this.findById(result.lastInsertRowid);
  },

  findAll() {
    return db.prepare('SELECT * FROM labels ORDER BY name').all();
  },

  findById(id) {
    return db.prepare('SELECT * FROM labels WHERE id = ?').get(id);
  },

  findByName(name) {
    return db.prepare('SELECT * FROM labels WHERE name = ?').get(name);
  },

  delete(id) {
    const result = db.prepare('DELETE FROM labels WHERE id = ?').run(id);
    return result.changes > 0;
  },

  // Task-label many-to-many
  attachToTask(taskId, labelId) {
    const stmt = db.prepare(`
      INSERT OR IGNORE INTO task_labels (task_id, label_id) VALUES (?, ?)
    `);
    stmt.run(taskId, labelId);
  },

  detachFromTask(taskId, labelId) {
    const stmt = db.prepare(`
      DELETE FROM task_labels WHERE task_id = ? AND label_id = ?
    `);
    const result = stmt.run(taskId, labelId);
    return result.changes > 0;
  },

  getLabelsForTask(taskId) {
    return db.prepare(`
      SELECT l.* FROM labels l
      INNER JOIN task_labels tl ON tl.label_id = l.id
      WHERE tl.task_id = ?
    `).all(taskId);
  }
};

module.exports = labelRepository;