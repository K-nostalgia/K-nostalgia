'use client';
import supabase from '@/utils/supabase/client';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { GoHeart, GoHeartFill } from 'react-icons/go';
import Swal from 'sweetalert2';

interface likeProps {
  marketId: number;
}

export const LikeButton = ({ marketId }: likeProps) => {
  const [isLike, setIsLike] = useState(false);
  const router = useRouter();

  const { data, isPending, error } = useQuery({
    queryKey: ['like', marketId],
    queryFn: async () => {
      const {
        data: { user },
        error: userError
      } = await supabase.auth.getUser();

      if (userError) {
        console.error(userError.message);
      }

      if (!user) {
        return [];
      }

      //현재 사용자 좋아요 상태
      const { data: likeData } = await supabase
        .from('likes')
        .select('*')
        .eq('market_id', marketId)
        .eq('user_id', user.id);

      return likeData;
    }
  });

  //좋아요 상태 초기화
  useEffect(() => {
    if (data && data.length > 0) {
      setIsLike(true);
    } else {
      setIsLike(false);
    }
  }, [data]);

  const handleLikeToggle = async () => {
    const {
      data: { user },
      error: userError
    } = await supabase.auth.getUser();

    if (userError) {
      console.error(userError.message);
      return;
    }

    if (!user) {
      Swal.fire({
        title: '로그인 후 이용해주세요',
        text: '로그인 페이지로 이동할까요?',
        cancelButtonColor: '#E0DDD9',
        confirmButtonColor: '#9C6D2E',
        cancelButtonText: '취소',
        confirmButtonText: '이동',
        customClass: {
          title: 'text-xl mt-10',
          popup: 'rounded-[16px]',
          actions: 'flex gap-3 mt-8',
          confirmButton: 'text-white py-3 px-4 rounded-[12px] w-[138px] m-0',
          cancelButton: 'text-white py-3 px-4 rounded-[12px] w-[138px] m-0'
        }
      }).then((result) => {
        if (result.isConfirmed) {
          router.push('/log-in');
        }
      });
      return;
    }

    if (isLike) {
      // 좋아요 취소
      await supabase
        .from('likes')
        .delete()
        .eq('market_id', marketId)
        .eq('user_id', user.id);
      setIsLike(false);
    } else {
      // 좋아요 추가
      await supabase
        .from('likes')
        .insert([{ market_id: marketId, user_id: user.id }]);
      setIsLike(true);
    }
  };

  if (isPending) return <button disabled>로딩</button>;
  if (error) return <button disabled>오류</button>;

  return (
    <button onClick={handleLikeToggle}>
      {isLike ? (
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
