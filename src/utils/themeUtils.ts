export const getSystemThemePreference = (): 'light' | 'dark' => {
  if (typeof window !== 'undefined' && window.matchMedia) {
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }
  return 'light';
};

export const getStoredThemeMode = (): 'light' | 'dark' | 'system' => {
  if (typeof window !== 'undefined') {
    const stored = localStorage.getItem('themeMode');
    if (stored === 'light' || stored === 'dark' || stored === 'system') {
      return stored;
    }
  }
  return 'system';
};

export const setStoredThemeMode = (mode: 'light' | 'dark' | 'system'): void => {
  if (typeof window !== 'undefined') {
    localStorage.setItem('themeMode', mode);
  }
};

