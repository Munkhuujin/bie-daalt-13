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
  try {
    const filters = {
      search: req.query.search,
      status: req.query.status,
      priority: req.query.priority,
      due_before: req.query.due_before,
      due_after: req.query.due_after,
      sort_by: req.query.sort_by,
      sort_order: req.query.sort_order
    };
    const tasks = taskService.getAllTasks(filters);
    res.json(tasks);
  } catch (err) {
    if (err instanceof ValidationError) {
      return res.status(400).json({ error: err.message });
    }
    res.status(500).json({ error: 'Internal server error' });
  }
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