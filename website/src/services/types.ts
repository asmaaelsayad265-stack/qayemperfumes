export type ApiError = {
  message: string;
  status?: number;
  details?: any;
};

export type PaginatedResponse<T> = {
  data: T[];
  meta?: {
    current_page?: number;
    last_page?: number;
    per_page?: number;
    total?: number;
  };
};

export type User = {
  id: number;
  name: string;
  email: string;
  avatar?: string | null;
};

export type AuthResponse = {
  access_token: string;
  token_type?: string;
  expires_in?: number;
  user?: User;
};

export type Product = {
  id: number;
  name: string;
  slug?: string;
  description?: string | null;
  price?: number;
  sale_price?: number | null;
  images?: string[];
  category_id?: number | null;
};

export type Category = {
  id: number;
  name: string;
  slug?: string;
  description?: string | null;
};
