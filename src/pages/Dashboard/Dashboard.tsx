import React, { useState, useCallback } from 'react';
import {
  Box,
  Container,
  TextField,
  Typography,
  Card,
  CardContent,
  CircularProgress,
  Alert,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import axiosInstance from '../../data/axios';
import { API_ENDPOINTS } from '../../constants';
import { ImageExtractionResponse } from '../../types';

const StyledContainer = styled(Container)(({ theme }) => ({
  padding: theme.spacing(4),
  minHeight: '70vh',
}));

const StyledTextField = styled(TextField)(() => ({
  '& .MuiOutlinedInput-root': {
    borderRadius: 16,
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    '&:hover': {
      transform: 'scale(1.01)',
    },
    '&.Mui-focused': {
      transform: 'scale(1.02)',
    },
  },
}));

const ImageContainer = styled(Box)(({ theme }) => ({
  width: '500px',
  height: '500px',
  margin: theme.spacing(4, 'auto'),
  borderRadius: 16,
  overflow: 'hidden',
  boxShadow: theme.palette.mode === 'dark'
    ? '0 8px 32px rgba(0, 0, 0, 0.4)'
    : '0 8px 32px rgba(0, 0, 0, 0.1)',
  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
  '&:hover': {
    transform: 'scale(1.02)',
    boxShadow: theme.palette.mode === 'dark'
      ? '0 12px 40px rgba(0, 0, 0, 0.5)'
      : '0 12px 40px rgba(0, 0, 0, 0.15)',
  },
}));

const StyledImage = styled('img')({
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  display: 'block',
});

const Dashboard: React.FC = () => {
  const [url, setUrl] = useState('');
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const extractImages = useCallback(async (inputUrl: string) => {
    if (!inputUrl.trim()) {
      setError('Please enter a valid URL');
      return;
    }

    setLoading(true);
    setError(null);
    setImageUrl(null);

    try {
      // inputUrl is already encoded, so use it directly
      const response = await axiosInstance.get<ImageExtractionResponse>(
        `${API_ENDPOINTS.EXTRACT_IMAGES}?url=${inputUrl}`
      );
      console.log(response);
      if (response.data) {
        setImageUrl(response.data.image);
      } else {
        setError('No images found for this URL');
      }
    } catch (err: any) {
      // Error is already handled by axios interceptor (toast)
      setError(err.response?.data?.message || 'Failed to extract images');
    } finally {
      setLoading(false);
    }
  }, []);

  const handleUrlChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    let inputValue = event.target.value;
    
    // If the input value looks like it might be encoded, try to decode it first
    // This allows editing of already-encoded URLs
    if (inputValue.includes('%')) {
      try {
        const decoded = decodeURIComponent(inputValue);
        // If decoding succeeds, use the decoded version for re-encoding
        inputValue = decoded;
      } catch (e) {
        // If decoding fails (malformed encoding), treat as raw input
        // This happens when user edits in the middle of an encoded string
      }
    }
    
    // Encode the URL and store it in state (for display in input field)
    const encodedUrl = encodeURIComponent(inputValue);
    setUrl(encodedUrl);
    
    // Auto-trigger API call when URL is pasted (pass encoded URL)
    if (inputValue.trim()) {
      extractImages(encodedUrl);
    }
  };

  return (
    <StyledContainer maxWidth="md">
      <Box sx={{ mb: 4, textAlign: 'center' }}>
        <Typography
          variant="h4"
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
          }}
        >
          Image Extractor
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Paste a URL to extract images
        </Typography>
      </Box>

      <Card
        sx={{
          mb: 4,
          borderRadius: 3,
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          '&:hover': {
            transform: 'translateY(-4px)',
            boxShadow: (theme) =>
              theme.palette.mode === 'dark'
                ? '0 8px 24px rgba(0, 0, 0, 0.3)'
                : '0 8px 24px rgba(0, 0, 0, 0.12)',
          },
        }}
      >
        <CardContent>
          <StyledTextField
            fullWidth
            label="Enter URL"
            placeholder="https://example.com"
            value={url}
            onChange={handleUrlChange}
            variant="outlined"
            disabled={loading}
            sx={{ mb: 2 }}
          />
          {loading && (
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
              <CircularProgress />
            </Box>
          )}
          {error && !loading && (
            <Alert severity="error" sx={{ mt: 2, borderRadius: 2 }}>
              {error}
            </Alert>
          )}
        </CardContent>
      </Card>

      {imageUrl && !loading && (
        <ImageContainer>
          <StyledImage src={imageUrl} alt="Extracted" />
        </ImageContainer>
      )}
    </StyledContainer>
  );
};

export default Dashboard;

