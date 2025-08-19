import { useEffect, useMemo, useState } from 'react';
import { api } from '../services/api';

export function useTasks() {
  const [all, setAll] = useState([]);
  const [loading, setLoading] = useState(false);

  async function fetch(params) {
    setLoading(true);
    try {
      const data = await api.list(params);
      setAll(data);
    } finally { setLoading(false); }
  }

  useEffect(() => { fetch(); }, []);

  const stats = useMemo(() => ({
    total: all.length,
    pending: all.filter(t => t.status === 'pending').length,
    completed: all.filter(t => t.status === 'completed').length,
  }), [all]);

  async function addTask(payload) {
    const created = await api.create(payload);
    setAll(prev => [created, ...prev]);
    return created;
  }

  async function updateTask(id, updates) {
    const updated = await api.update(id, updates);
    setAll(prev => prev.map(t => t.id === id ? updated : t));
    return updated;
  }

  async function toggleTaskStatus(id) {
    const t = all.find(x => x.id === id);
    if (!t) return;
    const next = t.status === 'completed' ? 'pending' : 'completed';
    const updated = await api.setStatus(id, next);
    setAll(prev => prev.map(x => x.id === id ? updated : x));
    return updated;
  }

  async function removeTask(id) {
    await api.remove(id);
    setAll(prev => prev.filter(t => t.id !== id));
  }

  return { all, loading, stats, fetch, addTask, updateTask, toggleTaskStatus, removeTask };
}
