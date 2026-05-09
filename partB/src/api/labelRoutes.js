const express = require('express');
const { labelService, ValidationError, NotFoundError } = require('../services/labelService');

const router = express.Router();

router.post('/', (req, res) => {
  try {
    const label = labelService.createLabel(req.body);
    res.status(201).json(label);
  } catch (err) {
    if (err instanceof ValidationError) return res.status(400).json({ error: err.message });
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.get('/', (req, res) => {
  res.json(labelService.getAllLabels());
});

router.get('/:id', (req, res) => {
  try {
    res.json(labelService.getLabelById(parseInt(req.params.id)));
  } catch (err) {
    if (err instanceof NotFoundError) return res.status(404).json({ error: err.message });
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.delete('/:id', (req, res) => {
  try {
    labelService.deleteLabel(parseInt(req.params.id));
    res.status(204).send();
  } catch (err) {
    if (err instanceof NotFoundError) return res.status(404).json({ error: err.message });
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Task-label associations
router.post('/tasks/:taskId/labels/:labelId', (req, res) => {
  try {
    const labels = labelService.attachLabel(
      parseInt(req.params.taskId),
      parseInt(req.params.labelId)
    );
    res.status(201).json(labels);
  } catch (err) {
    if (err instanceof NotFoundError) return res.status(404).json({ error: err.message });
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.delete('/tasks/:taskId/labels/:labelId', (req, res) => {
  try {
    labelService.detachLabel(
      parseInt(req.params.taskId),
      parseInt(req.params.labelId)
    );
    res.status(204).send();
  } catch (err) {
    if (err instanceof NotFoundError) return res.status(404).json({ error: err.message });
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.get('/tasks/:taskId/labels', (req, res) => {
  try {
    const labels = labelService.getTaskLabels(parseInt(req.params.taskId));
    res.json(labels);
  } catch (err) {
    if (err instanceof NotFoundError) return res.status(404).json({ error: err.message });
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;