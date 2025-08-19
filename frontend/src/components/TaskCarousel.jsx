// src/components/TaskCarousel.jsx
import { useMemo, useRef } from 'react';
import {
  Box, Card, CardContent, CardHeader, Chip, IconButton, Stack, Typography, Tooltip, Button
} from '@mui/material';
import {
  ChevronLeft, ChevronRight, CheckCircle, RadioButtonUnchecked, Edit, Delete, CalendarMonth
} from '@mui/icons-material';

function PriorityChip({ p }) {
  const color = p === 'high' ? 'error' : p === 'medium' ? 'warning' : 'success';
  const label = p[0].toUpperCase() + p.slice(1);
  return <Chip size="small" color={color} label={label} />;
}

function StatusChip({ s }) {
  const color = s === 'completed' ? 'success' : 'default';
  const label = s === 'completed' ? 'Completed' : 'Pending';
  return <Chip size="small" color={color} label={label} variant={s === 'pending' ? 'outlined' : 'filled'} />;
}

export default function TaskCarousel({
  tasks = [],
  onToggleStatus,
  onDelete,
  onEdit
}) {
  const scrollerRef = useRef(null);

  const itemWidth = useMemo(() => {
    if (typeof window === 'undefined') return 360;
    const w = window.innerWidth;
    if (w >= 1280) return 420;
    if (w >= 900) return 380;
    return Math.min(360, w - 64);
  }, []);

  const scrollBy = (dir = 1) => {
    const el = scrollerRef.current;
    if (!el) return;
    const delta = itemWidth + 16;
    el.scrollBy({ left: dir * delta, behavior: 'smooth' });
  };

  return (
    <Box position="relative">
      <Box
        ref={scrollerRef}
        sx={{
          display: 'grid',
          gridAutoFlow: 'column',
          gridAutoColumns: `${itemWidth}px`,
          gap: 2,
          overflowX: 'auto',
          scrollSnapType: 'x mandatory',
          px: 1,
          py: 1,
          '& > *': { scrollSnapAlign: 'start' },
          scrollbarWidth: 'thin',
        }}
      >
        {tasks.map((t) => {
          const isCompleted = t.status === 'completed';
          const isOverdue = t.dueDate && new Date(t.dueDate) < new Date() && !isCompleted;

          return (
            <Card key={t.id} sx={{
              borderRadius: 3,
              boxShadow: 3,
              minHeight: 220,
              transition: 'transform .2s',
              '&:hover': { transform: 'translateY(-4px)', boxShadow: 6 },
              ...(isOverdue ? { outline: '2px solid', outlineColor: 'error.main' } : {})
            }}>
              <CardHeader
                title={
                  <Stack direction="row" alignItems="center" spacing={1} flexWrap="wrap">
                    <Typography variant="h6" sx={{ textDecoration: isCompleted ? 'line-through' : 'none' }}>
                      {t.title}
                    </Typography>
                    <PriorityChip p={t.priority} />
                    <StatusChip s={t.status} />
                  </Stack>
                }
                sx={{ pb: 0.5 }}
              />
              <CardContent sx={{ pt: 1.5 }}>
                {t.description && (
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 1.5, whiteSpace: 'pre-wrap' }}>
                    {t.description}
                  </Typography>
                )}

                <Stack direction="row" spacing={2} alignItems="center" sx={{ mb: 2 }}>
                  {t.dueDate && (
                    <Stack direction="row" spacing={1} alignItems="center">
                      <CalendarMonth fontSize="small" color={isOverdue ? 'error' : 'action'} />
                      <Typography variant="caption" color={isOverdue ? 'error.main' : 'text.secondary'}>
                        {new Date(t.dueDate).toLocaleDateString()}
                      </Typography>
                    </Stack>
                  )}
                  <Typography variant="caption" color="text.secondary">
                    Created: {new Date(t.createdAt).toLocaleDateString()}
                  </Typography>
                </Stack>

                <Stack direction="row" spacing={1.5}>
                  <Tooltip title={isCompleted ? 'Mark as pending' : 'Mark as completed'}>
                    <Button
                      size="small"
                      variant={isCompleted ? 'outlined' : 'contained'}
                      color={isCompleted ? 'warning' : 'success'}
                      startIcon={isCompleted ? <RadioButtonUnchecked /> : <CheckCircle />}
                      onClick={() => onToggleStatus(t.id)}
                    >
                      {isCompleted ? 'Pending' : 'Complete'}
                    </Button>
                  </Tooltip>

                  <Tooltip title="Edit">
                    <IconButton color="primary" onClick={() => onEdit && onEdit(t)}>
                      <Edit />
                    </IconButton>
                  </Tooltip>

                  <Tooltip title="Delete">
                    <IconButton color="error" onClick={() => onDelete(t.id)}>
                      <Delete />
                    </IconButton>
                  </Tooltip>
                </Stack>
              </CardContent>
            </Card>
          );
        })}
      </Box>

      <Stack
        direction="row"
        justifyContent="space-between"
        sx={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}
        alignItems="center"
      >
        <Box sx={{ pointerEvents: 'auto' }}>
          <IconButton onClick={() => scrollBy(-1)} size="large" sx={{ bgcolor: 'background.paper', boxShadow: 2 }}>
            <ChevronLeft />
          </IconButton>
        </Box>
        <Box sx={{ pointerEvents: 'auto' }}>
          <IconButton onClick={() => scrollBy(1)} size="large" sx={{ bgcolor: 'background.paper', boxShadow: 2 }}>
            <ChevronRight />
          </IconButton>
        </Box>
      </Stack>
    </Box>
  );
}
