import { useEffect, useMemo, useState } from 'react';
import { ThemeProvider, CssBaseline } from '@mui/material';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { getTheme } from './theme';
import MainLayout from './layouts/MainLayout';
import Dashboard from './pages/Dashboard';

export default function App() {
  const [mode, setMode] = useState('light');
  useEffect(() => {
    const saved = localStorage.getItem('mui-mode');
    if (saved === 'dark' || saved === 'light') setMode(saved);
  }, []);
  const theme = useMemo(() => getTheme(mode), [mode]);

  const toggleTheme = () => setMode(prev => {
    const next = prev === 'light' ? 'dark' : 'light';
    localStorage.setItem('mui-mode', next);
    return next;
  });

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <MainLayout themeMode={mode} onToggleTheme={toggleTheme}>
          <Routes>
            <Route path="/" element={<Dashboard />} />
          </Routes>
        </MainLayout>
      </BrowserRouter>
    </ThemeProvider>
  );
}
