import { http } from './http';

export interface UserLoginRequest {
  email: string;
  password: string;
}

export interface UserInfo {
  id: number;
  name: string;
  email: string;
  customer_id?: number;
  status: boolean;
  is_admin: boolean;
  created_date: string;
  updated_date: string;
  created_by?: string;
  updated_by?: string;
}

export const loginUser = async (data: UserLoginRequest) => {
  const res = await http.post<UserInfo>('/users/login', data);
  return res.data;
};

export const createUser = async (data: Partial<UserInfo>) => {
  const res = await http.post<UserInfo>('/users', data);
  return res.data;
};

export const getUsers = async (skip = 0, limit = 100) => {
  const res = await http.get<UserInfo[]>(`/users?skip=${skip}&limit=${limit}`);
  return res.data;
};

export const getUser = async (userId: number) => {
  const res = await http.get<UserInfo>(`/users/${userId}`);
  return res.data;
};

export const updateUser = async (userId: number, data: Partial<UserInfo>) => {
  const res = await http.put<UserInfo>(`/users/${userId}`, data);
  return res.data;
};

export const deleteUser = async (userId: number) => {
  await http.delete(`/users/${userId}`);
};