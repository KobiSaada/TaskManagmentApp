import { useEffect, useState } from 'react';
import {
  Button, Dialog, DialogActions, DialogContent, DialogTitle,
  Grid, MenuItem, TextField
} from '@mui/material';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';

export default function TaskFormDialog({ open, onClose, onSubmit, initial }) {
  const [title, setTitle] = useState('');
  const [description, setDesc] = useState('');
  const [priority, setPriority] = useState('medium');
  const [status, setStatus] = useState('pending'); // backend expects 'pending' | 'completed'
  const [dueDate, setDueDate] = useState(null);

  useEffect(() => {
    if (initial) {
      setTitle(initial.title || '');
      setDesc(initial.description || '');
      setPriority(initial.priority || 'medium');
      setStatus(initial.status || 'pending');
      setDueDate(initial.dueDate ? new Date(initial.dueDate) : null);
    } else {
      setTitle(''); setDesc(''); setPriority('medium'); setStatus('pending'); setDueDate(null);
    }
  }, [initial, open]);

  const handleSubmit = () => {
    if (!title.trim()) return;
    onSubmit?.({
      title: title.trim(),
      description: description.trim() || undefined,
      priority,
      status,
      dueDate: dueDate ? dueDate.toISOString() : undefined,
    });
  };

  return (
    <Dialog open={open} onClose={()=>onClose?.()}>
      <DialogTitle>{initial ? 'Edit Task' : 'Add Task'}</DialogTitle>
      <DialogContent sx={{ pt: 2 }}>
        <Grid container spacing={2} sx={{ mt: 0 }}>
          <Grid item xs={12}>
            <TextField label="Title" fullWidth value={title} onChange={(e)=>setTitle(e.target.value)} autoFocus/>
          </Grid>
          <Grid item xs={12}>
            <TextField label="Description" fullWidth multiline minRows={3} value={description} onChange={(e)=>setDesc(e.target.value)} />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField select label="Priority" fullWidth value={priority} onChange={(e)=>setPriority(e.target.value)}>
              <MenuItem value="low">Low</MenuItem>
              <MenuItem value="medium">Medium</MenuItem>
              <MenuItem value="high">High</MenuItem>
            </TextField>
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField select label="Status" fullWidth value={status} onChange={(e)=>setStatus(e.target.value)}>
              <MenuItem value="pending">Pending</MenuItem>
              <MenuItem value="completed">Completed</MenuItem>
            </TextField>
          </Grid>
          <Grid item xs={12} md={6}>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DatePicker
                label="Due date"
                value={dueDate}
                onChange={(value)=>setDueDate(value)}
                slotProps={{ textField: { fullWidth: true } }}
              />
            </LocalizationProvider>
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={()=>onClose?.()}>Cancel</Button>
        <Button variant="contained" onClick={handleSubmit}>{initial ? 'Update' : 'Create'}</Button>
      </DialogActions>
    </Dialog>
  );
}
