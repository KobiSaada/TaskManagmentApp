const { uuid } = require('../utils/id');
const { sortAndFilter } = require('../utils/sortAndFilter');

const tasks = [];



const TaskRepo = {
  seed() {
    if (tasks.length) return;
    ['high','medium','low'].forEach((p, i) => {
      const now = new Date().toISOString();
      tasks.push({
        id: uuid(),
        title: `Task #${i+1}`,
        description: `Demo ${i+1}`,
        priority: p,
        status: 'pending',
        tags: ['demo'],
        createdAt: now,
        updatedAt: now
      });
    });
  },

  list(query = {}) {
    const { items } = sortAndFilter(tasks, query);
    return items;
  },

  get(id) {
    return tasks.find(t => t.id === id);
  },

  create(data) {
    const now = new Date().toISOString();
    const task = { id: uuid(), createdAt: now, updatedAt: now, ...data };
    tasks.push(task);
    return task;
  },

  update(id, patch) {
    const t = tasks.find(x => x.id === id);
    if (!t) return null;
    Object.assign(t, patch, { updatedAt: new Date().toISOString() });
    return t;
  },

  remove(id) {
    const i = tasks.findIndex(t => t.id === id);
    if (i === -1) return false;
    tasks.splice(i, 1);
    return true;
  }
};

module.exports = { TaskRepo };
