import { Card, CardContent, Grid, Stack, Typography } from '@mui/material';
import ChecklistIcon from '@mui/icons-material/Checklist';
import PendingActionsIcon from '@mui/icons-material/PendingActions';
import DoneAllIcon from '@mui/icons-material/DoneAll';

function Stat({ icon, label, value, color }) {
  const Icon = icon;
  return (
    <Card elevation={3}>
      <CardContent>
        <Stack direction="row" alignItems="center" spacing={2}>
          <Icon color={color} />
          <div>
            <Typography variant="h5" fontWeight={700}>{value}</Typography>
            <Typography variant="body2" color="text.secondary">{label}</Typography>
          </div>
        </Stack>
      </CardContent>
    </Card>
  );
}

export default function TaskStatsCards({ total, pending, completed }) {
  return (
    <Grid container spacing={2}>
      <Grid item xs={12} md={4}><Stat icon={ChecklistIcon} label="Total Tasks" value={total} color="primary" /></Grid>
      <Grid item xs={12} md={4}><Stat icon={PendingActionsIcon} label="Pending" value={pending} color="warning" /></Grid>
      <Grid item xs={12} md={4}><Stat icon={DoneAllIcon} label="Completed" value={completed} color="success" /></Grid>
    </Grid>
  );
}
