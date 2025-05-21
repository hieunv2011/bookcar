import { useAtom } from 'jotai';
import { useState } from 'react';
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
      setLoading(false);
      return info;
    } catch (err: any) {
      setError(err?.response?.data?.detail || 'Đăng nhập thất bại');
      setLoading(false);
      return null;
    }
  };

  const logout = () => setTrainee(null);

  return { trainee, login, logout, loading, error };
}