export interface ApiResponse<T = any> {
  data: T;
  message?: string;
  success?: boolean;
}

export interface ImageExtractionResponse {
  image: string;
  images?: string[]; // Optional for backward compatibility
  url?: string;
}

export interface ThemeMode {
  mode: 'light' | 'dark' | 'system';
}

