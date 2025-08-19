import { createTheme } from '@mui/material/styles';

export function getTheme(mode = 'light') {
  return createTheme({
    palette: {
      mode,
      primary: { main: '#10b981' },   // emerald
      secondary:{ main: '#06b6d4' },  // cyan
      success: { main: '#22c55e' },
      warning: { main: '#f59e0b' },
      error:   { main: '#ef4444' },
      background: mode === 'light' ? { default: '#f6f8fa', paper: '#fff' } : {},
    },
    shape: { borderRadius: 12 },
    typography: { fontFamily: '"Inter", system-ui, -apple-system, "Segoe UI", Roboto, Arial' },
    components: {
      MuiButton: { styleOverrides: { root: { textTransform: 'none', borderRadius: 10 } } },
      MuiPaper:  { styleOverrides: { root: { borderRadius: 14 } } },
      MuiCard:   { styleOverrides: { root: { borderRadius: 16 } } },
    },
  });
}
