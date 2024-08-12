'use client';
import { useUser } from '@/hooks/useUser';
import supabase from '@/utils/supabase/client';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { GoHeart, GoHeartFill } from 'react-icons/go';
import Swal from 'sweetalert2';

interface likeProps {
  marketId: number;
  userId: string;
}

export const LikeButton = ({ marketId, userId }: likeProps) => {
  const queryClient = useQueryClient();
  const { data: userData } = useUser();
  const router = useRouter();

  const {
    data: likeData,
    isPending,
    error
  } = useQuery({
    queryKey: ['likes', marketId, userId],
    queryFn: async () => {
      //현재 사용자 좋아요 상태
      const { data } = await supabase
        .from('likes')
        .select('*')
        .eq('market_id', marketId)
        .eq('user_id', userId);

      return data;
    }
  });

  const mutation = useMutation({
    mutationFn: async () => {
      if (!likeData?.length) {
        await supabase
          .from('likes')
          .insert([{ market_id: marketId, user_id: userId }]);
        return true;
      } else {
        await supabase
          .from('likes')
          .delete()
          .eq('market_id', marketId)
          .eq('user_id', userId);
        return false;
      }
    },
    onMutate: async () => {
      await queryClient.cancelQueries({
        queryKey: ['likes', marketId, userId]
      });

      const previousLikes = queryClient.getQueryData([
        'likes',
        marketId,
        userId
      ]);

      queryClient.setQueryData(['likes', marketId, userId], (oldData: any) => {
        return oldData?.length
          ? []
          : [{ market_id: marketId, user_id: userId }];
      });

      return { previousLikes };
    },
    onError: (err, variables, context) => {
      queryClient.setQueryData(
        ['likes', marketId, userId],
        context?.previousLikes
      );
    },
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: ['likes', marketId, userId]
      });
    }
  });

  const handleLikeToggle = () => {
    if (!userData) {
      Swal.fire({
        title: '로그인 후 이용해주세요',
        text: '로그인 페이지로 이동할까요?',
        showCancelButton: true,
        cancelButtonColor: '#f2f2f2',
        confirmButtonColor: '#9C6D2E',
        cancelButtonText: '취소하기',
        confirmButtonText: '이동하기',
        customClass: {
          title: 'text-xl mt-10',
          popup: 'rounded-[16px]',
          actions: 'flex gap-3 mt-8',
          confirmButton: 'text-white py-3 px-4 rounded-[12px] w-[138px] m-0',
          cancelButton:
            'text-status-negative py-3 px-4 rounded-[12px] w-[138px] m-0'
        }
      }).then((result) => {
        if (result.isConfirmed) {
          router.push('/log-in');
        }
      });
      return;
    }
    mutation.mutate();
  };

  if (isPending) return <button disabled>로딩</button>;
  if (error) return <button disabled>오류</button>;

  return (
    <button onClick={handleLikeToggle}>
      {likeData && likeData.length > 0 ? (
        <GoHeartFill
          style={{ color: '#DB3B3B' }}
          className="w-[22px] h-[22px] transition-transform duration-300 ease-in-out hover:scale-110"
        />
      ) : (
        <GoHeart
          style={{ color: '#F6F5F3' }}
          className="w-[22px] h-[22px] transition-transform duration-300 ease-in-out hover:scale-110"
        />
      )}
    </button>
  );
};
