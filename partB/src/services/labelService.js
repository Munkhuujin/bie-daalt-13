const labelRepository = require('../repositories/labelRepository');
const taskRepository = require('../repositories/taskRepository');

class ValidationError extends Error {
  constructor(message) { super(message); this.name = 'ValidationError'; }
}

class NotFoundError extends Error {
  constructor(message) { super(message); this.name = 'NotFoundError'; }
}

const labelService = {
  createLabel(data) {
    if (!data.name || data.name.trim() === '') {
      throw new ValidationError('Label name is required');
    }
    if (labelRepository.findByName(data.name)) {
      throw new ValidationError('Label with this name already exists');
    }
    return labelRepository.create(data);
  },

  getAllLabels() {
    return labelRepository.findAll();
  },

  getLabelById(id) {
    const label = labelRepository.findById(id);
    if (!label) throw new NotFoundError(`Label ${id} not found`);
    return label;
  },

  deleteLabel(id) {
    this.getLabelById(id);
    return labelRepository.delete(id);
  },

  attachLabel(taskId, labelId) {
    if (!taskRepository.findById(taskId)) {
      throw new NotFoundError(`Task ${taskId} not found`);
    }
    this.getLabelById(labelId);
    labelRepository.attachToTask(taskId, labelId);
    return labelRepository.getLabelsForTask(taskId);
  },

  detachLabel(taskId, labelId) {
    if (!taskRepository.findById(taskId)) {
      throw new NotFoundError(`Task ${taskId} not found`);
    }
    return labelRepository.detachFromTask(taskId, labelId);
  },

  getTaskLabels(taskId) {
    if (!taskRepository.findById(taskId)) {
      throw new NotFoundError(`Task ${taskId} not found`);
    }
    return labelRepository.getLabelsForTask(taskId);
  }
};

module.exports = { labelService, ValidationError, NotFoundError };