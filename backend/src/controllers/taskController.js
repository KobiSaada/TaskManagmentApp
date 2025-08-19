const { TaskService } = require('../services/taskService');

const TaskController = {
  list(req, res) {
    const { q, status, priority } = req.query;
    const data = TaskService.list({ q, status, priority });
    res.json(data);
  },

  get(req, res) {
    const task = TaskService.getOrThrow(req.params.id);
    res.json(task);
  },

  create(req, res) {
    const t = TaskService.create(req.body);
    res.status(201).json(t);
  },

  update(req, res) {
    const t = TaskService.update(req.params.id, req.body);
    res.json(t);
  },

  setStatus(req, res) {
    const t = TaskService.setStatus(req.params.id, req.body.status);
    res.json(t);
  },

  remove(req, res) {
    TaskService.remove(req.params.id);
    res.status(204).end();
  }
};

module.exports = { TaskController };
