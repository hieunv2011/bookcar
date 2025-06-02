import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useAtom } from 'jotai';
import { userAtom } from '../atoms/user'; 
import { loginUser, UserLoginRequest, UserInfo } from '../api/userApi';

export function useUser() {
  const queryClient = useQueryClient();
  const [user, setUser] = useAtom(userAtom);

  const mutation = useMutation<UserInfo, any, UserLoginRequest>({
    mutationFn: loginUser,
    onSuccess: (data) => {
      setUser(data);
      localStorage.setItem('user', JSON.stringify(data));
      queryClient.invalidateQueries({ queryKey: ['user'] });
    },
    onError: (error: any) => {
      // xử lý lỗi chung nếu cần
    },
  });

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
    queryClient.removeQueries({ queryKey: ['user'] });
  };

  return {
    user,
    login: mutation.mutateAsync,
    logout,
    loading: mutation.isPending,
    error: mutation.error?.response?.data?.detail || null,
  };
}
