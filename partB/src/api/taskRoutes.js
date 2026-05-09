const express = require('express');
const { taskService, ValidationError, NotFoundError } = require('../services/taskService');

const router = express.Router();

router.post('/', (req, res) => {
  try {
    const task = taskService.createTask(req.body);
    res.status(201).json(task);
  } catch (err) {
    if (err instanceof ValidationError) {
      return res.status(400).json({ error: err.message });
    }
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.get('/', (req, res) => {
  const tasks = taskService.getAllTasks();
  res.json(tasks);
});

router.get('/:id', (req, res) => {
  try {
    const task = taskService.getTaskById(parseInt(req.params.id));
    res.json(task);
  } catch (err) {
    if (err instanceof NotFoundError) {
      return res.status(404).json({ error: err.message });
    }
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.put('/:id', (req, res) => {
  try {
    const task = taskService.updateTask(parseInt(req.params.id), req.body);
    res.json(task);
  } catch (err) {
    if (err instanceof NotFoundError) {
      return res.status(404).json({ error: err.message });
    }
    if (err instanceof ValidationError) {
      return res.status(400).json({ error: err.message });
    }
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.delete('/:id', (req, res) => {
  try {
    taskService.deleteTask(parseInt(req.params.id));
    res.status(204).send();
  } catch (err) {
    if (err instanceof NotFoundError) {
      return res.status(404).json({ error: err.message });
    }
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;