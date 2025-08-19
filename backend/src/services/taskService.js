const { TaskRepo } = require('../repositories/taskRepo');

const TaskService = {
  init() { TaskRepo.seed(); },

  list(filter) { return TaskRepo.list(filter); },

  getOrThrow(id) {
    const t = TaskRepo.get(id);
    if (!t) {
      const err = new Error('Task not found');
      err.status = 404;
      throw err;
    }
    return t;
  },

  create(data) { return TaskRepo.create(data); },

  update(id, patch) {
    const t = TaskRepo.update(id, patch);
    if (!t) {
      const err = new Error('Task not found');
      err.status = 404;
      throw err;
    }
    return t;
  },

  setStatus(id, status) { return this.update(id, { status }); },

  remove(id) {
    const ok = TaskRepo.remove(id);
    if (!ok) {
      const err = new Error('Task not found');
      err.status = 404;
      throw err;
    }
  }
};

module.exports = { TaskService };
