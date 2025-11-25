export interface ApiResponse<T = any> {
  data: T;
  message?: string;
  success?: boolean;
}

export interface ImageExtractionResponse {
  image: string;
  imageList?: string[]; // List of all images from the URL
  url?: string;
}

export interface ThemeMode {
  mode: 'light' | 'dark' | 'system';
}

