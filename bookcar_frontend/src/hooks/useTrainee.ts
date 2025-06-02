import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useAtom } from 'jotai';
import { traineeAtom } from '../atoms/trainee';
import { loginTrainee, TraineeLoginRequest, TraineeInfo } from '../api/traineeApi';

export function useTrainee() {
  const queryClient = useQueryClient();
  const [trainee, setTrainee] = useAtom(traineeAtom);

  const mutation = useMutation<TraineeInfo, any, TraineeLoginRequest>({
    mutationFn: loginTrainee,
    onSuccess: (data) => {
      setTrainee(data);
      localStorage.setItem('trainee', JSON.stringify(data));
      queryClient.invalidateQueries({ queryKey: ['trainee'] });
    },
    onError: (error) => {
      // bạn có thể xử lý lỗi chung ở đây nếu muốn
    },
  });

  const logout = () => {
    setTrainee(null);
    localStorage.removeItem('trainee');
    queryClient.removeQueries({ queryKey: ['trainee'] });
  };

  return {
    trainee,
    login: mutation.mutateAsync,
    logout,
    loading: mutation.isPending,
    error: mutation.error?.response?.data?.detail || null,
  };
}
