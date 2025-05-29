import { useAtom } from 'jotai';
import { useState } from 'react';
import React from 'react';
import { traineeAtom } from '../atoms/trainee';
import { loginTrainee, TraineeLoginRequest } from '../api/traineeApi';

export function useTrainee() {
  const [trainee, setTrainee] = useAtom(traineeAtom);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const login = async (data: TraineeLoginRequest) => {
    setLoading(true);
    setError(null);
    try {
      const info = await loginTrainee(data);
      setTrainee(info);
      localStorage.setItem('trainee', JSON.stringify(info)); // Lưu vào localStorage
      setLoading(false);
      return info;
    } catch (err: any) {
      setError(err?.response?.data?.detail || 'Đăng nhập thất bại');
      setLoading(false);
      return null;
    }
  };

  // Load lại từ localStorage khi app khởi động
  React.useEffect(() => {
    if (!trainee) {
      const saved = localStorage.getItem('trainee');
      if (saved) setTrainee(JSON.parse(saved));
    }
  }, []);

  const logout = () => {
    setTrainee(null);
    localStorage.removeItem('trainee'); // Xoá khỏi localStorage khi logout
  };

  return { trainee, login, logout, loading, error };
}