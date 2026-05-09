const taskRepository = require('../repositories/taskRepository');
const dateHelper = require('../utils/dateHelper');

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

  getAllTasks(filters = {}) {
    if (filters.status && !['todo', 'in_progress', 'done'].includes(filters.status)) {
      throw new ValidationError('Invalid status filter');
    }
    if (filters.priority && !['low', 'medium', 'high'].includes(filters.priority)) {
      throw new ValidationError('Invalid priority filter');
    }
    return taskRepository.findAll(filters);
  },

  getTaskById(id) {
    const task = taskRepository.findById(id);
    if (!task) throw new NotFoundError(`Task ${id} not found`);
    return task;
  },

  updateTask(id, updates) {
    this.getTaskById(id);
    if (updates.priority && !['low', 'medium', 'high'].includes(updates.priority)) {
      throw new ValidationError('Invalid priority');
    }
    if (updates.status && !['todo', 'in_progress', 'done'].includes(updates.status)) {
      throw new ValidationError('Invalid status');
    }
    return taskRepository.update(id, updates);
  },

  deleteTask(id) {
    this.getTaskById(id);
    return taskRepository.delete(id);
  },

  getOverdueTasks() {
    const allTasks = taskRepository.findAll();
    return allTasks.filter(t => 
      dateHelper.isOverdue(t.due_date) && t.status !== 'done'
    );
  },

  getTodayTasks() {
    const allTasks = taskRepository.findAll();
    return allTasks.filter(t => dateHelper.isToday(t.due_date));
  },

  getThisWeekTasks() {
    const allTasks = taskRepository.findAll();
    return allTasks.filter(t => dateHelper.isThisWeek(t.due_date));
  }
};

module.exports = { taskService, ValidationError, NotFoundError };