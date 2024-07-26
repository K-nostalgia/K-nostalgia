'use client';

import supabase from '@/utils/supabase/client';
import { useMutation, useQueryClient } from '@tanstack/react-query';

interface CountButtonProps {
  product_id: string;
  counts: number;
}

export const CountButton: React.FC<CountButtonProps> = ({
  product_id,
  counts
}) => {
  const queryClient = useQueryClient();

  const updateCountInDatabase = async (newCount: number) => {
    const { error } = await supabase
      .from('cart')
      .update({
        count: newCount
      })
      .eq('product_id', product_id);

    if (error) {
      console.log({ error });
      alert('수량이 업데이트되지 않았습니다.');
      throw new Error('수량 업데이트 실패');
    }
  };

  const addCountMutation = useMutation({
    mutationFn: async () => {
      const newCount = counts + 1;
      await updateCountInDatabase(newCount);
      return newCount;
    },
    onMutate: async () => {
      await queryClient.cancelQueries({
        queryKey: ['cart']
      }); // 기존 쿼리 취소

      const previousCart = queryClient.getQueryData(['cart']); // 기존 데이터 저장

      // optimistic update
      queryClient.setQueryData(['cart'], (oldData: any) => {
        return oldData.map((item: any) =>
          item.product_id === product_id ? { ...item, count: counts + 1 } : item
        );
      });

      return { previousCart }; // 롤백을 위한 이전 데이터 반환
    },
    onError: (err, variables, context) => {
      queryClient.setQueryData(['cart'], context?.previousCart);
    },
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: ['cart']
      }); // 쿼리 무효화
    }
  });

  const subCountMutation = useMutation({
    mutationFn: async () => {
      if (counts > 1) {
        const newCount = counts - 1;
        await updateCountInDatabase(newCount);
        return newCount;
      }
    },
    onMutate: async () => {
      await queryClient.cancelQueries({
        queryKey: ['cart']
      }); // 기존 쿼리 취소

      const previousCart = queryClient.getQueryData(['cart']); // 기존 데이터 저장

      // optimistic update
      queryClient.setQueryData(['cart'], (oldData: any) => {
        return oldData.map((item: any) =>
          item.product_id === product_id ? { ...item, count: counts - 1 } : item
        );
      });

      return { previousCart }; // 롤백을 위한 이전 데이터 반환
    },
    onError: (err, variables, context) => {
      queryClient.setQueryData(['cart'], context?.previousCart);
    },
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: ['cart']
      }); // 쿼리 무효화
    }
  });

  return (
    <div className="flex gap-x-2 items-center">
      <button onClick={() => subCountMutation.mutate()} className="rounded-sm">
        -
      </button>
      <span>{counts}</span>
      <button onClick={() => addCountMutation.mutate()} className="rounded-sm">
        +
      </button>
    </div>
  );
};
