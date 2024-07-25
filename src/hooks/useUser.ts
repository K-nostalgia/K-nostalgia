import { useQuery } from '@tanstack/react-query';
import api from '@/service/service';

export function useUser() {
  return useQuery({
    queryKey: ['users'],
    queryFn: () => api.auth.getUser()
  });
}
