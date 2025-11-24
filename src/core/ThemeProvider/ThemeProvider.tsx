import React, { createContext, useContext, useEffect, useState, useMemo } from 'react';
import { ThemeProvider as MUIThemeProvider, CssBaseline } from '@mui/material';
import { lightTheme, darkTheme } from '../../Theme';
import { getSystemThemePreference, getStoredThemeMode, setStoredThemeMode } from '../../Utils/themeUtils';

type ThemeMode = 'light' | 'dark' | 'system';

interface ThemeContextType {
  mode: ThemeMode;
  setMode: (mode: ThemeMode) => void;
  actualMode: 'light' | 'dark';
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const useThemeMode = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useThemeMode must be used within ThemeProvider');
  }
  return context;
};

interface ThemeProviderProps {
  children: React.ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const [mode, setModeState] = useState<ThemeMode>(getStoredThemeMode);
  const [systemPreference, setSystemPreference] = useState<'light' | 'dark'>(getSystemThemePreference);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = (e: MediaQueryListEvent) => {
      setSystemPreference(e.matches ? 'dark' : 'light');
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  const actualMode = useMemo(() => {
    return mode === 'system' ? systemPreference : mode;
  }, [mode, systemPreference]);

  const setMode = (newMode: ThemeMode) => {
    setModeState(newMode);
    setStoredThemeMode(newMode);
  };

  const theme = useMemo(() => {
    return actualMode === 'dark' ? darkTheme : lightTheme;
  }, [actualMode]);

  const value = useMemo(
    () => ({
      mode,
      setMode,
      actualMode,
    }),
    [mode, actualMode]
  );

  return (
    <ThemeContext.Provider value={value}>
      <MUIThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </MUIThemeProvider>
    </ThemeContext.Provider>
  );
};

