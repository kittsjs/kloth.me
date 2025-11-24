import React from 'react';
import { Box, Button, Container, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import GoogleIcon from '@mui/icons-material/Google';
import { styled } from '@mui/material/styles';
import { ROUTES } from '../../constants';

const StyledContainer = styled(Container)(({ theme }) => ({
  minHeight: '80vh',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  gap: theme.spacing(4),
}));

const StyledButton = styled(Button)(({ theme }) => ({
  padding: theme.spacing(1.5, 4),
  fontSize: '1.1rem',
  borderRadius: 16,
  textTransform: 'none',
  background: theme.palette.mode === 'dark'
    ? 'linear-gradient(135deg, #818cf8 0%, #ec4899 100%)'
    : 'linear-gradient(135deg, #6366f1 0%, #ec4899 100%)',
  color: '#ffffff',
  boxShadow: '0 4px 15px rgba(99, 102, 241, 0.4)',
  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
  '&:hover': {
    transform: 'translateY(-4px) scale(1.02)',
    boxShadow: '0 8px 25px rgba(99, 102, 241, 0.6)',
    background: theme.palette.mode === 'dark'
      ? 'linear-gradient(135deg, #a5b4fc 0%, #f472b6 100%)'
      : 'linear-gradient(135deg, #818cf8 0%, #f472b6 100%)',
  },
  '&:active': {
    transform: 'translateY(-2px) scale(1.01)',
  },
}));

const Landing: React.FC = () => {
  const navigate = useNavigate();

  const handleGmailSignIn = () => {
    // Navigate to dashboard on Gmail sign in click
    navigate(ROUTES.DASHBOARD);
  };

  return (
    <StyledContainer>
      <Box
        sx={{
          textAlign: 'center',
          animation: 'fadeIn 0.6s ease-in',
          '@keyframes fadeIn': {
            from: {
              opacity: 0,
              transform: 'translateY(20px)',
            },
            to: {
              opacity: 1,
              transform: 'translateY(0)',
            },
          },
        }}
      >
        <Typography
          variant="h2"
          component="h1"
          gutterBottom
          sx={{
            background: (theme) =>
              theme.palette.mode === 'dark'
                ? 'linear-gradient(135deg, #818cf8 0%, #ec4899 100%)'
                : 'linear-gradient(135deg, #6366f1 0%, #ec4899 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            fontWeight: 700,
            mb: 2,
          }}
        >
          Welcome to Kloth.me
        </Typography>
        <Typography variant="h6" color="text.secondary" sx={{ mb: 4 }}>
          Extract images from any URL with ease
        </Typography>
      </Box>
      <StyledButton
        variant="contained"
        startIcon={<GoogleIcon />}
        onClick={handleGmailSignIn}
        size="large"
      >
        Sign in with Gmail
      </StyledButton>
    </StyledContainer>
  );
};

export default Landing;

