export interface ApiResponse<T = any> {
  data: T;
  message?: string;
  success?: boolean;
}

export interface ImageExtractionResponse {
  images: string[];
  url: string;
}

export interface ThemeMode {
  mode: 'light' | 'dark' | 'system';
}

