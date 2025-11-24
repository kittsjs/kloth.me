import React from 'react';
import { IconButton, Menu, MenuItem, Tooltip } from '@mui/material';
import { Brightness4, Brightness7, SettingsBrightness } from '@mui/icons-material';
import { useThemeMode } from '../../Core/ThemeProvider/ThemeProvider';

const ThemeSwitcher: React.FC = () => {
  const { mode, setMode } = useThemeMode();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleModeChange = (newMode: 'light' | 'dark' | 'system') => {
    setMode(newMode);
    handleClose();
  };

  const getIcon = () => {
    switch (mode) {
      case 'light':
        return <Brightness7 />;
      case 'dark':
        return <Brightness4 />;
      case 'system':
        return <SettingsBrightness />;
      default:
        return <SettingsBrightness />;
    }
  };

  return (
    <>
      <Tooltip title="Theme Settings">
        <IconButton
          onClick={handleClick}
          sx={{
            transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
            '&:hover': {
              transform: 'rotate(15deg) scale(1.1)',
            },
          }}
        >
          {getIcon()}
        </IconButton>
      </Tooltip>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
      >
        <MenuItem
          onClick={() => handleModeChange('light')}
          selected={mode === 'light'}
        >
          <Brightness7 sx={{ mr: 1 }} /> Light
        </MenuItem>
        <MenuItem
          onClick={() => handleModeChange('dark')}
          selected={mode === 'dark'}
        >
          <Brightness4 sx={{ mr: 1 }} /> Dark
        </MenuItem>
        <MenuItem
          onClick={() => handleModeChange('system')}
          selected={mode === 'system'}
        >
          <SettingsBrightness sx={{ mr: 1 }} /> System
        </MenuItem>
      </Menu>
    </>
  );
};

export default ThemeSwitcher;

