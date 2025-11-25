import axiosInstance from './axios';
import { API_ENDPOINTS } from '../constants';
import { ImageExtractionResponse } from '../types';

/**
 * Extracts images from a given URL
 * @param url - The URL to extract images from (will be encoded automatically)
 * @returns The full image extraction response with image and imageList
 * @throws Error if extraction fails or no images found
 */
export const extractImages = async (url: string): Promise<ImageExtractionResponse> => {
  if (!url.trim()) {
    throw new Error('Please enter a valid URL');
  }

  // Encode the URL for the API call
  const encodedUrl = encodeURIComponent(url);

  const response = await axiosInstance.get<ImageExtractionResponse>(
    `${API_ENDPOINTS.EXTRACT_IMAGES}?url=${encodedUrl}`
  );

  if (!response.data || !response.data.image) {
    throw new Error('No images found for this URL');
  }

  return response.data;
};

