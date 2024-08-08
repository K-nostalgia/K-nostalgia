'use client';
import supabase from '@/utils/supabase/client';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { GoHeart, GoHeartFill } from 'react-icons/go';

interface likeProps {
  marketId: number;
  userId: string;
}

export const LikeButton = ({ marketId, userId }: likeProps) => {
  const queryClient = useQueryClient();

  //TODO 낙관적 업데이트
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
    mutation.mutate();
    console.log('click');
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
