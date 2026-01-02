import { api } from '../lib/api';

export interface LoginRequest {
  email: string;
  password: string;
}

export interface AuthResponse {
  token: string;
  expiresAt: string;
}

export async function login(data: LoginRequest): Promise<AuthResponse> {
  const res = await api.post<AuthResponse>('/auth/login', data);
  return res.data;
}

export function logout() {
  localStorage.removeItem('token');
}
