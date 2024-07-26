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

export default useGetPaymentHistory;
