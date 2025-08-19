import { useState } from 'react';
import { Box, Button, MenuItem, Stack, TextField } from '@mui/material';

export default function FiltersBar({ onChange }) {
  const [q, setQ] = useState('');
  const [status, setStatus] = useState('all');
  const [priority, setPriority] = useState('all');

  function apply() {
    const params = {};
    if (q.trim()) params.q = q.trim();
    if (status !== 'all') params.status = status;           // 'pending' | 'completed'
    if (priority !== 'all') params.priority = priority;     // 'low' | 'medium' | 'high'
    onChange?.(params);
  }

  function reset() {
    setQ(''); setStatus('all'); setPriority('all');
    onChange?.({});
  }

  return (
    <Box component="form" onSubmit={(e)=>{e.preventDefault();apply();}}>
      <Stack direction={{ xs:'column', md:'row' }} spacing={2}>
        <TextField label="Search" value={q} onChange={(e)=>setQ(e.target.value)} fullWidth />
        <TextField select label="Status" value={status} onChange={(e)=>setStatus(e.target.value)} sx={{ minWidth: 160 }}>
          <MenuItem value="all">All</MenuItem>
          <MenuItem value="pending">Pending</MenuItem>
          <MenuItem value="completed">Completed</MenuItem>
        </TextField>
        <TextField select label="Priority" value={priority} onChange={(e)=>setPriority(e.target.value)} sx={{ minWidth: 160 }}>
          <MenuItem value="all">All</MenuItem>
          <MenuItem value="low">Low</MenuItem>
          <MenuItem value="medium">Medium</MenuItem>
          <MenuItem value="high">High</MenuItem>
        </TextField>
        <Stack direction="row" spacing={1}>
          <Button type="submit" variant="contained">Apply</Button>
          <Button onClick={reset} variant="outlined">Reset</Button>
        </Stack>
      </Stack>
    </Box>
  );
}
