'use client';

import { useGetPaymentHistoryWithSupabase } from '@/hooks/payment/useGetPaymentHistory';
import api from '@/service/service';
import { Tables } from '@/types/supabase';
import { useQuery } from '@tanstack/react-query';

const PayHistoryList = () => {
  const { data: users } = useQuery<Tables<'users'>, Error, Tables<'users'>>({
    queryKey: ['users'],
    queryFn: () => api.auth.getUser()
  });

  const userId = users?.id;

  const { payHistoryList } = useGetPaymentHistoryWithSupabase(userId);
  console.log(payHistoryList);

  return <div>payHistory</div>;
};

export default PayHistoryList;
