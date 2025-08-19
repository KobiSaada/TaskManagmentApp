import { AppBar, Box, Container, IconButton, Toolbar, Typography } from '@mui/material';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import ThemeToggle from '../components/ThemeToggle';

export default function MainLayout({ title="Task Manager", onAdd, children, themeMode, onToggleTheme }) {
  return (
    <Box sx={{ minHeight: '100vh' }}>
      <AppBar position="sticky" elevation={0} color="transparent" sx={{ backdropFilter: 'blur(8px)', borderBottom: 1, borderColor: 'divider' }}>
        <Toolbar>
          <Typography variant="h6" sx={{ fontWeight: 800, letterSpacing: 0.3 }}>Task Dashboard</Typography>
          <Box sx={{ flexGrow: 1 }} />
          <ThemeToggle mode={themeMode} onToggle={onToggleTheme} />
          <IconButton color="primary" onClick={onAdd} sx={{ ml: 1 }} aria-label="add task">
            <AddCircleIcon fontSize="large" />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Container maxWidth="lg" sx={{ py: 3 }}>
        <Typography variant="h4" sx={{ fontWeight: 800, mb: 2 }}>{title}</Typography>
        {children}
      </Container>
    </Box>
  );
}
