import {
  Box, Chip, IconButton, Paper, Table, TableBody, TableCell,
  TableContainer, TableHead, TableRow, Tooltip
} from '@mui/material';
import DoneIcon from '@mui/icons-material/Done';
import ReplayIcon from '@mui/icons-material/Replay';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { fmtDate } from '../utils/format';

const priorityColor = (p) => p === 'high' ? 'error' : p === 'medium' ? 'warning' : 'success';

export default function TaskTable({ rows, onToggleStatus, onEdit, onDelete }) {
  return (
    <TableContainer component={Paper} elevation={3}>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell width="38%">Title / Description</TableCell>
            <TableCell>Priority</TableCell>
            <TableCell>Status</TableCell>
            <TableCell>Due</TableCell>
            <TableCell>Created</TableCell>
            <TableCell align="right">Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((t) => {
            const completed = t.status === 'completed';
            return (
              <TableRow key={t.id} hover>
                <TableCell>
                  <Box sx={{ fontWeight: 600, textDecoration: completed ? 'line-through' : 'none' }}>{t.title}</Box>
                  {t.description && <Box sx={{ color: 'text.secondary', fontSize: 13, mt: 0.5, textDecoration: completed ? 'line-through' : 'none' }}>{t.description}</Box>}
                </TableCell>
                <TableCell>
                  <Chip size="small" label={t.priority} color={priorityColor(t.priority)} />
                </TableCell>
                <TableCell>
                  <Chip size="small" label={completed ? 'Completed' : 'Pending'} color={completed ? 'success' : 'warning'} variant={completed ? 'filled' : 'outlined'} />
                </TableCell>
                <TableCell>{fmtDate(t.dueDate)}</TableCell>
                <TableCell>{fmtDate(t.createdAt)}</TableCell>
                <TableCell align="right">
                  <Tooltip title={completed ? 'Mark as pending' : 'Mark as completed'}>
                    <IconButton size="small" onClick={()=>onToggleStatus?.(t)}>
                      {completed ? <ReplayIcon /> : <DoneIcon />}
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Edit">
                    <IconButton size="small" onClick={()=>onEdit?.(t)}><EditIcon /></IconButton>
                  </Tooltip>
                  <Tooltip title="Delete">
                    <IconButton size="small" color="error" onClick={()=>onDelete?.(t)}><DeleteIcon /></IconButton>
                  </Tooltip>
                </TableCell>
              </TableRow>
            );
          })}
          {rows.length === 0 && (
            <TableRow>
              <TableCell colSpan={6} align="center" sx={{ py: 6, color: 'text.secondary' }}>
                No tasks yet — add your first task!
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
