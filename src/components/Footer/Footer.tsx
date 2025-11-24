import React from 'react';
import { Box, Typography, Container } from '@mui/material';
import { styled } from '@mui/material/styles';

const StyledFooter = styled(Box)(({ theme }) => ({
  background: theme.palette.mode === 'dark'
    ? 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)'
    : 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)',
  padding: theme.spacing(3, 0),
  marginTop: 'auto',
  borderTop: `1px solid ${theme.palette.divider}`,
  transition: 'all 0.3s ease',
}));

const Footer: React.FC = () => {
  return (
    <StyledFooter component="footer">
      <Container maxWidth="lg">
        <Typography
          variant="body2"
          color="text.secondary"
          align="center"
          sx={{
            transition: 'all 0.3s ease',
            '&:hover': {
              color: 'primary.main',
            },
          }}
        >
          © {new Date().getFullYear()} Kloth.me. All rights reserved.
        </Typography>
      </Container>
    </StyledFooter>
  );
};

export default Footer;

