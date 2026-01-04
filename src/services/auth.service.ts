import { api } from '../lib/api';

export interface LoginRequest {
  email: string;
  password: string;
}

export interface SignupRequest {
  email: string;
  password: string;
}

export interface AuthResponse {
  token: string;
  expiresAt: string;
}

// Centralized token management
const TOKEN_KEY = 'token';

export function setToken(token: string): void {
  localStorage.setItem(TOKEN_KEY, token);
}

export function getToken(): string | null {
  return localStorage.getItem(TOKEN_KEY);
}

export function removeToken(): void {
  localStorage.removeItem(TOKEN_KEY);
}

export async function login(data: LoginRequest): Promise<AuthResponse> {
  const res = await api.post<AuthResponse>('/auth/login', data);
  setToken(res.data.token);
  return res.data;
}

export async function signup(data: SignupRequest): Promise<AuthResponse> {
  const res = await api.post<AuthResponse>('/auth/signup', data);
  setToken(res.data.token);
  return res.data;
}

export function logout(): void {
  removeToken();
}
