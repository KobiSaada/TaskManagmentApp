const { z } = require('zod');

const Priority = z.enum(['low','medium','high']);
const Status   = z.enum(['pending','completed']);

const TaskCreate = z.object({
  title: z.string().min(1),
  description: z.string().optional(),
  priority: Priority,
  status: Status.default('pending'),
  dueDate: z.string().optional(),
  tags: z.array(z.string()).optional(),
});

const TaskUpdate = z.object({
  title: z.string().min(1).optional(),
  description: z.string().optional(),
  priority: Priority.optional(),
  status: Status.optional(),
  dueDate: z.string().optional(),
  tags: z.array(z.string()).optional(),
});

const TaskSearchQuery = z.object({
  q: z.string().min(1).optional(),
  status: Status.optional(),
  priority: Priority.optional(),
});

const IdParams = z.object({ id: z.string().min(1) });
const StatusOnlyBody = z.object({ status: Status });

module.exports = {
  Priority, Status,
  TaskCreate, TaskUpdate,
  TaskSearchQuery, IdParams, StatusOnlyBody
};
