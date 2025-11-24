import React from 'react';
import { AppBar, Toolbar, Typography, Box } from '@mui/material';
import { styled } from '@mui/material/styles';
import ThemeSwitcher from '../ThemeSwitcher/ThemeSwitcher';

const StyledAppBar = styled(AppBar)(({ theme }) => ({
  background: theme.palette.mode === 'dark' 
    ? 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)'
    : 'linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)',
  backdropFilter: 'blur(10px)',
  transition: 'all 0.3s ease',
}));

const StyledTypography = styled(Typography)(({ theme }) => ({
  background: theme.palette.mode === 'dark'
    ? 'linear-gradient(135deg, #818cf8 0%, #ec4899 100%)'
    : 'linear-gradient(135deg, #6366f1 0%, #ec4899 100%)',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  backgroundClip: 'text',
  fontWeight: 700,
  fontSize: '1.5rem',
  letterSpacing: '0.5px',
  transition: 'all 0.3s ease',
  '&:hover': {
    transform: 'scale(1.05)',
  },
}));

const Header: React.FC = () => {
  return (
    <StyledAppBar position="static" elevation={0}>
      <Toolbar>
        <Box sx={{ flexGrow: 1, display: 'flex', alignItems: 'center' }}>
          <StyledTypography variant="h6">
            Kloth.me
          </StyledTypography>
        </Box>
        <ThemeSwitcher />
      </Toolbar>
    </StyledAppBar>
  );
};

export default Header;

