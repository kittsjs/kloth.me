/**
 * Checks if a URL is an Amazon URL
 * @param url - The URL to check
 * @returns true if the URL contains 'amazon.in' or 'amazon.com'
 */
export const isAmazonUrl = (url: string): boolean => {
  if (!url || typeof url !== 'string') {
    return false;
  }
  return url.includes('amazon.in') || url.includes('amazon.com');
};

/**
 * Processes Amazon image URLs by replacing the size parameter
 * @param url - The Amazon image URL to process
 * @returns The processed URL with 'SX569' as the size parameter
 */
export const processAmazonImageUrl = (url: string): string => {
  if (!url || typeof url !== 'string') {
    return url;
  }

  try {
    
    return url.replace(url.slice(url.indexOf('_')+1, url.lastIndexOf('_')), 'SX569');

  } catch (error) {
    // If processing fails, return the original URL
    console.error('Error processing Amazon image URL:', error);
    return url;
  }
};

/**
 * Processes an array of Amazon image URLs
 * @param urls - Array of image URLs to process
 * @returns Array of processed URLs
 */
export const processAmazonImageUrls = (urls: string[]): string[] => {
  if (!Array.isArray(urls)) {
    return [];
  }
  
  return urls.map(url => processAmazonImageUrl(url));
};

/**
 * Checks if a URL is a Flipkart URL
 * @param url - The URL to check
 * @returns true if the URL contains 'flipkart.com'
 */
export const isFlipkartUrl = (url: string): boolean => {
  if (!url || typeof url !== 'string') {
    return false;
  }
  return url.includes('flipkart.com');
};

/**
 * Processes Flipkart image URLs by replacing the size parameter
 * @param url - The Flipkart image URL to process
 * @returns The processed URL with '/832/832/' instead of '/128/128/'
 */
export const processFlipkartImageUrl = (url: string): string => {
  if (!url || typeof url !== 'string') {
    return url;
  }

  try {
    // Replace /128/128/ with /832/832/
    return url.replace('/128/128/', '/832/832/');
  } catch (error) {
    // If processing fails, return the original URL
    console.error('Error processing Flipkart image URL:', error);
    return url;
  }
};

/**
 * Processes an array of Flipkart image URLs
 * @param urls - Array of image URLs to process
 * @returns Array of processed URLs
 */
export const processFlipkartImageUrls = (urls: string[]): string[] => {
  if (!Array.isArray(urls)) {
    return [];
  }
  
  return urls.map(url => processFlipkartImageUrl(url));
};

