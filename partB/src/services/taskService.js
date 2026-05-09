const taskRepository = require('../repositories/taskRepository');

class ValidationError extends Error {
  constructor(message) {
    super(message);
    this.name = 'ValidationError';
  }
}

class NotFoundError extends Error {
  constructor(message) {
    super(message);
    this.name = 'NotFoundError';
  }
}

const taskService = {
  createTask(data) {
    if (!data.title || data.title.trim() === '') {
      throw new ValidationError('Title is required');
    }
    if (data.priority && !['low', 'medium', 'high'].includes(data.priority)) {
      throw new ValidationError('Invalid priority');
    }
    if (data.status && !['todo', 'in_progress', 'done'].includes(data.status)) {
      throw new ValidationError('Invalid status');
    }
    return taskRepository.create(data);
  },

  getAllTasks() {
    return taskRepository.findAll();
  },

  getTaskById(id) {
    const task = taskRepository.findById(id);
    if (!task) {
      throw new NotFoundError(`Task ${id} not found`);
    }
    return task;
  },

  updateTask(id, updates) {
    this.getTaskById(id); // Throws if not found
    if (updates.priority && !['low', 'medium', 'high'].includes(updates.priority)) {
      throw new ValidationError('Invalid priority');
    }
    if (updates.status && !['todo', 'in_progress', 'done'].includes(updates.status)) {
      throw new ValidationError('Invalid status');
    }
    return taskRepository.update(id, updates);
  },

  deleteTask(id) {
    this.getTaskById(id); // Throws if not found
    return taskRepository.delete(id);
  }
};

module.exports = { taskService, ValidationError, NotFoundError };