import { useQuery } from '@tanstack/react-query';

interface Props {
  paymentId: string | null;
}
export const useGetPaymentHistory = ({ paymentId }: Props) => {
  const { data: payHistory, isPending: payHistoryIsPending } = useQuery({
    queryKey: ['payHistory', paymentId],
    queryFn: async () => {
      if (!paymentId) {
        throw new Error('Payment ID is required');
      }
      const response = await fetch(
        `/api/payment/transaction?paymentId=${paymentId}`
      );
      return response.json();
    }
  });
  return { payHistory, payHistoryIsPending };
};

export const useGetPaymentHistoryWithSupabase = (
  userId: string | undefined
) => {
  const { data: payHistoryList } = useQuery({
    queryKey: ['payHistoryList'],
    queryFn: async () => {
      if (!userId) {
        throw new Error('user ID is required');
      }
      const response = await fetch(
        `/api/payment/pay-supabase?user_id=${userId}`
      );
      return response.json();
    }
  });
  return { payHistoryList };
};

export default useGetPaymentHistory;
