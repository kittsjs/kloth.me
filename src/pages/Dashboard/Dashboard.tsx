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
  Button,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  FormLabel,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { extractImages as extractImagesAPI } from '../../data/imageExtraction';
import { 
  isAmazonUrl, 
  processAmazonImageUrls,
  isFlipkartUrl,
  processFlipkartImageUrls 
} from '../../utils/imageUtils';

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
  width: '100%',
  maxWidth: '500px',
  aspectRatio: '1 / 1',
  margin: theme.spacing(4, 'auto'),
  borderRadius: 16,
  overflow: 'hidden',
  boxShadow: theme.palette.mode === 'dark'
    ? '0 8px 32px rgba(0, 0, 0, 0.4)'
    : '0 8px 32px rgba(0, 0, 0, 0.1)',
  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
  [theme.breakpoints.down('sm')]: {
    maxWidth: '100%',
    margin: theme.spacing(2, 1),
  },
  [theme.breakpoints.between('sm', 'md')]: {
    maxWidth: '400px',
  },
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

const ImagesScrollContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  gap: theme.spacing(2),
  overflowX: 'auto',
  padding: theme.spacing(2),
  '&::-webkit-scrollbar': {
    height: 8,
  },
  '&::-webkit-scrollbar-track': {
    background: theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)',
    borderRadius: 4,
  },
  '&::-webkit-scrollbar-thumb': {
    background: theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.3)' : 'rgba(0, 0, 0, 0.3)',
    borderRadius: 4,
    '&:hover': {
      background: theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.5)' : 'rgba(0, 0, 0, 0.5)',
    },
  },
}));

const ScrollableImage = styled('img')(({ theme }) => ({
  minWidth: '200px',
  width: '200px',
  height: '200px',
  objectFit: 'cover',
  borderRadius: 12,
  cursor: 'pointer',
  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
  boxShadow: theme.palette.mode === 'dark'
    ? '0 4px 16px rgba(0, 0, 0, 0.3)'
    : '0 4px 16px rgba(0, 0, 0, 0.1)',
  '&:hover': {
    transform: 'scale(1.05)',
    boxShadow: theme.palette.mode === 'dark'
      ? '0 8px 24px rgba(0, 0, 0, 0.4)'
      : '0 8px 24px rgba(0, 0, 0, 0.15)',
  },
}));

const StyledButton = styled(Button)(({ theme }) => ({
  borderRadius: 12,
  textTransform: 'none',
  padding: theme.spacing(1.5, 3),
  fontWeight: 600,
  background: theme.palette.mode === 'dark'
    ? 'linear-gradient(135deg, #818cf8 0%, #ec4899 100%)'
    : 'linear-gradient(135deg, #6366f1 0%, #ec4899 100%)',
  color: '#ffffff',
  '&:hover': {
    background: theme.palette.mode === 'dark'
      ? 'linear-gradient(135deg, #a5b4fc 0%, #f472b6 100%)'
      : 'linear-gradient(135deg, #818cf8 0%, #f472b6 100%)',
    transform: 'translateY(-2px)',
    boxShadow: '0 8px 20px rgba(99, 102, 241, 0.4)',
  },
  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
}));

const StyledTextarea = styled(TextField)(() => ({
  '& .MuiOutlinedInput-root': {
    borderRadius: 12,
  },
}));

const Dashboard: React.FC = () => {
  const [url, setUrl] = useState('');
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [imagesList, setImagesList] = useState<string[]>([]);
  const [showMoreImages, setShowMoreImages] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [rating, setRating] = useState<number | null>(null);
  const [feedback, setFeedback] = useState('');

  const handleExtractImages = useCallback(async (decodedUrl: string) => {
    if (!decodedUrl.trim()) {
      setError('Please enter a valid URL');
      return;
    }

    setLoading(true);
    setError(null);
    setImageUrl(null);
    setImagesList([]);
    setShowMoreImages(false);

    try {
      // API function will handle encoding internally
      const response = await extractImagesAPI(decodedUrl);
      
      // Set main image as-is (no processing)
      setImageUrl(response.image);
      
      if (response.imageList && response.imageList.length > 0) {
        // Process image list based on the URL type
        let processedImageList = response.imageList;
        
        if (isAmazonUrl(decodedUrl)) {
          processedImageList = processAmazonImageUrls(response.imageList);
        } else if (isFlipkartUrl(decodedUrl)) {
          processedImageList = processFlipkartImageUrls(response.imageList);
        }
        
        console.log(processedImageList);
        setImagesList(processedImageList);
      }
    } catch (err: any) {
      // Error is already handled by axios interceptor (toast)
      // Set local error state for Alert display
      setError(err.message || 'Failed to extract images');
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
    
    // Auto-trigger API call when URL is pasted (pass decoded URL)
    if (inputValue.trim()) {
      handleExtractImages(inputValue);
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
        <>
          <ImageContainer>
            <StyledImage src={imageUrl} alt="Extracted" />
          </ImageContainer>

          {/* Show More Images Section */}
          {imagesList.length > 0 && (
            <Card
              sx={{
                mb: 4,
                borderRadius: 3,
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
              }}
            >
              <CardContent>
                <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
                  <StyledButton
                    variant="contained"
                    onClick={() => setShowMoreImages(!showMoreImages)}
                  >
                    {showMoreImages ? 'Hide Images' : 'Show More Images'}
                  </StyledButton>
                </Box>
                {showMoreImages && (
                  <ImagesScrollContainer>
                    {imagesList.map((image, index) => (
                      <ScrollableImage
                        key={index}
                        src={image}
                        alt={`Extracted ${index + 1}`}
                        onClick={() => setImageUrl(image)}
                      />
                    ))}
                  </ImagesScrollContainer>
                )}
              </CardContent>
            </Card>
          )}

          {/* Feedback Section */}
          <Card
            sx={{
              mb: 4,
              borderRadius: 3,
              transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
            }}
          >
            <CardContent>
              <Typography variant="h6" gutterBottom sx={{ mb: 3 }}>
                Rate the Fitment
              </Typography>
              <FormControl component="fieldset" fullWidth>
                <FormLabel component="legend" sx={{ mb: 2 }}>
                  How accurate is the fitment?
                </FormLabel>
                <RadioGroup
                  value={rating?.toString() || ''}
                  onChange={(e) => setRating(parseInt(e.target.value))}
                  sx={{ mb: 3 }}
                >
                  <FormControlLabel
                    value="1"
                    control={<Radio />}
                    label={
                      <Box sx={{ ml: 1 }}>
                        <Typography variant="body2" fontWeight={600}>
                          1 - The fitment is way too off
                        </Typography>
                      </Box>
                    }
                  />
                  <FormControlLabel
                    value="2"
                    control={<Radio />}
                    label={
                      <Box sx={{ ml: 1 }}>
                        <Typography variant="body2" fontWeight={600}>
                          2 - Not close
                        </Typography>
                      </Box>
                    }
                  />
                  <FormControlLabel
                    value="3"
                    control={<Radio />}
                    label={
                      <Box sx={{ ml: 1 }}>
                        <Typography variant="body2" fontWeight={600}>
                          3 - It's close enough to real fit
                        </Typography>
                      </Box>
                    }
                  />
                  <FormControlLabel
                    value="4"
                    control={<Radio />}
                    label={
                      <Box sx={{ ml: 1 }}>
                        <Typography variant="body2" fontWeight={600}>
                          4 - Very close
                        </Typography>
                      </Box>
                    }
                  />
                  <FormControlLabel
                    value="5"
                    control={<Radio />}
                    label={
                      <Box sx={{ ml: 1 }}>
                        <Typography variant="body2" fontWeight={600}>
                          5 - This was perfect fit!
                        </Typography>
                      </Box>
                    }
                  />
                </RadioGroup>
              </FormControl>
              <StyledTextarea
                fullWidth
                multiline
                rows={4}
                label="Additional Feedback"
                placeholder="Share your thoughts... (max 500 characters)"
                value={feedback}
                onChange={(e) => {
                  if (e.target.value.length <= 500) {
                    setFeedback(e.target.value);
                  }
                }}
                variant="outlined"
                inputProps={{
                  maxLength: 500,
                }}
                helperText={`${feedback.length}/500 characters`}
              />
            </CardContent>
          </Card>
        </>
      )}
    </StyledContainer>
  );
};

export default Dashboard;

