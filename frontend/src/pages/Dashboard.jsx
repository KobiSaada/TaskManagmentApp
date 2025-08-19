// src/pages/Dashboard.jsx
import { useMemo, useState } from 'react';
import {
  Alert, Box, Container, Fab, Snackbar, Stack, ToggleButton, ToggleButtonGroup, Typography
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

import FiltersBar from '../components/FiltersBar';
import TaskStatsCards from '../components/TaskStatsCards';
import TaskTable from '../components/TaskTable';
import TaskCarousel from '../components/TaskCarousel';
import TaskFormDialog from '../components/TaskFormDialog';
import ConfirmDialog from '../components/ConfirmDialog';
import { useTasks } from '../hooks/useTasks';

export default function Dashboard() {
  const { all, stats, fetch, addTask, updateTask, toggleTaskStatus, removeTask } = useTasks();
  const [view, setView] = useState('table'); // 'table' | 'carousel'
  const [openForm, setOpenForm] = useState(false);
  const [editing, setEditing] = useState(null);
  const [confirm, setConfirm] = useState(null);
  const [snack, setSnack] = useState(null);

  const rows = useMemo(() => all, [all]);

  const openCreate = () => { setEditing(null); setOpenForm(true); };
  const openEdit   = (t) => { setEditing(t); setOpenForm(true); };

  const onSubmit = async (data) => {
    try {
      if (editing) {
        await updateTask(editing.id, data);
        setSnack({ msg: `Task "${data.title}" updated`, sev: 'success' });
      } else {
        await addTask(data); // data: { title, priority, status, description?, dueDate? }
        setSnack({ msg: `Task "${data.title}" created`, sev: 'success' });
      }
      setOpenForm(false);
    } catch (e) {
      setSnack({ msg: e.message || 'Operation failed', sev: 'error' });
    }
  };

  const onToggle = async (t) => {
    try {
      // ה־hook שלך יכול להיות toggleTaskStatus(id) או toggleTaskStatus(id, next)
      // נבחר לחישוב next מקומי, ואז לקרוא לפונקציה שלך:
      const next = t.status === 'completed' ? 'pending' : 'completed';
      await toggleTaskStatus(t.id, next);
      setSnack({ msg: `Task "${t.title}" marked as ${next}`, sev: 'info' });
    } catch (e) {
      setSnack({ msg: e.message || 'Operation failed', sev: 'error' });
    }
  };

  const onDelete = (t) => setConfirm({ id: t.id, title: t.title });

  const doDelete = async () => {
    try {
      await removeTask(confirm.id);
      setSnack({ msg: `Task "${confirm.title}" deleted`, sev: 'warning' });
    } catch (e) {
      setSnack({ msg: e.message || 'Delete failed', sev: 'error' });
    } finally {
      setConfirm(null);
    }
  };

  return (
    <Container maxWidth="lg" sx={{ py: 3 }}>
      <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ mb: 2 }}>
        <Typography variant="h4" fontWeight={700}>Tasks</Typography>
        <ToggleButtonGroup
          size="small"
          value={view}
          exclusive
          onChange={(_, v) => v && setView(v)}
        >
          <ToggleButton value="table">Table</ToggleButton>
          <ToggleButton value="carousel">Carousel</ToggleButton>
        </ToggleButtonGroup>
      </Stack>

      <FiltersBar onChange={(p)=>{ fetch(p); }} />

      <Box sx={{ my: 2 }}>
        <TaskStatsCards total={stats.total} pending={stats.pending} completed={stats.completed} />
      </Box>

      {view === 'table' ? (
        <TaskTable
          rows={rows}
          onToggleStatus={(row) => onToggle(row)}
          onEdit={openEdit}
          onDelete={(row) => setConfirm({ id: row.id, title: row.title })}
        />
      ) : (
        <TaskCarousel
          tasks={rows}
          onToggleStatus={(id) => {
            const t = rows.find(x => x.id === id);
            if (!t) return;
            onToggle(t);
          }}
          onEdit={(row) => openEdit(row)}
          onDelete={(id) => {
            const t = rows.find(x => x.id === id);
            if (t) setConfirm({ id: t.id, title: t.title });
          }}
        />
      )}

      <TaskFormDialog
        open={openForm}
        onClose={()=>setOpenForm(false)}
        onSubmit={onSubmit}
        initial={editing}
      />

      <ConfirmDialog
        open={Boolean(confirm)}
        title="Delete task?"
        text={confirm ? `Are you sure you want to delete "${confirm.title}"?` : ''}
        onClose={()=>setConfirm(null)}
        onConfirm={doDelete}
      />

      <Fab color="primary" onClick={openCreate} sx={{ position: 'fixed', right: 24, bottom: 24 }}>
        <AddIcon />
      </Fab>

      <Snackbar open={Boolean(snack)} autoHideDuration={2500} onClose={()=>setSnack(null)}>
        {snack && <Alert severity={snack.sev} variant="filled" onClose={()=>setSnack(null)}>{snack.msg}</Alert>}
      </Snackbar>
    </Container>
  );
}
