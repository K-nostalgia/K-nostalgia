import { toast } from '@/components/ui/use-toast';
import supabase from '@/utils/supabase/client';
import { useMutation, useQueryClient } from '@tanstack/react-query';

const useDeletePayHistory = () => {
  const queryClient = useQueryClient();

  const deleteMutation = useMutation({
    mutationFn: async (payment_id: string) => {
      const { error } = await supabase
        .from('orderd_list')
        .delete()
        .eq('payment_id', payment_id);

      if (error) {
        throw error;
      }
    },
    onMutate: async (deletedPaymentId) => {
      await queryClient.cancelQueries({ queryKey: ['payHistoryList'] });

      const previousPayHistory = queryClient.getQueryData(['payHistoryList']);
      console.log('on mutate');

      queryClient.setQueryData(['payHistoryList'], (old: any[] | undefined) => {
        return old
          ? old.filter((item) => item.payment_id !== deletedPaymentId)
          : [];
      });

      return { previousPayHistory };
    },
    onError: (err, _, context: any) => {
      queryClient.setQueryData(['payHistoryList'], context.previousPayHistory);
      toast({
        variant: 'destructive',
        description: '삭제 실패했습니다. 새로고침 후 다시 시도해주세요.'
      });
    },
    onSuccess: () => {
      console.log('on success');
      toast({
        description: '내역 삭제 완료.'
      });
    },
    onSettled: () => {
      console.log('on settled');
      queryClient.invalidateQueries({ queryKey: ['payHistoryList'] });
    }
  });
  return deleteMutation;
};

export default useDeletePayHistory;
