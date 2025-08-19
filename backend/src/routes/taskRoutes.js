const express = require('express');
const { TaskController } = require('../controllers/taskController');
const { validateBody, validateQuery, validateParams } = require('../middleware/validate');
const { TaskCreate, TaskUpdate, TaskSearchQuery, IdParams, StatusOnlyBody } = require('../models/taskModel');

const router = express.Router();

router.get('/tasks', validateQuery(TaskSearchQuery), TaskController.list);
router.get('/tasks/:id', validateParams(IdParams), TaskController.get);
router.post('/tasks', validateBody(TaskCreate), TaskController.create);
router.put('/tasks/:id', validateParams(IdParams), validateBody(TaskUpdate), TaskController.update);
router.patch('/tasks/:id/status', validateParams(IdParams), validateBody(StatusOnlyBody), TaskController.setStatus);
router.delete('/tasks/:id', validateParams(IdParams), TaskController.remove);

module.exports = router;
