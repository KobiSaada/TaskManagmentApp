// src/utils/sortAndFilter.js
const priorityValue = (p) => ({ low: 1, medium: 2, high: 3 })[p] || 0;

/**
 * query תומך בשמות:
 * q (טקסט), status ('pending' | 'completed'), priority ('low'|'medium'|'high'),
 * sort ('createdAt'|'priority'|'title'), order ('asc'|'desc')
 * נשמרת תאימות לאחור גם ל-search/filter אם קיימים.
 */
exports.sortAndFilter = (tasks, query = {}) => {
  const {
    q, search,                     // טקסט חיפוש
    status,                        // 'pending' | 'completed'
    priority,                      // 'low' | 'medium' | 'high'
    sort = 'createdAt',
    order = 'desc',
  } = query;

  const text = (q ?? search ?? '').toString().trim().toLowerCase();

  let items = tasks.filter((t) => {
    const byText =
      !text ||
      t.title.toLowerCase().includes(text) ||
      (t.description || '').toLowerCase().includes(text);

    const byStatus = !status || t.status === status;
    const byPriority = !priority || t.priority === priority;

    return byText && byStatus && byPriority;
  });

  items.sort((a, b) => {
    let cmp = 0;
    if (sort === 'createdAt') cmp = new Date(a.createdAt) - new Date(b.createdAt);
    else if (sort === 'priority') cmp = priorityValue(a.priority) - priorityValue(b.priority);
    else if (sort === 'title') cmp = a.title.localeCompare(b.title);
    return order === 'asc' ? cmp : -cmp;
  });

  return { items, total: items.length };
};
