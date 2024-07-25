'use client';
import { useUser } from '@/hooks/useUser';
import api from '@/service/service';
import { useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import React from 'react';

const Mypage = () => {
  const { data: user, isLoading, error } = useUser();
  const queryClient = useQueryClient();
  const router = useRouter();

  const handleClickLogOut = async () => {
    await api.auth.logOut();
    // 캐시 무효화
    queryClient.invalidateQueries();
    router.push('/log-in');
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div> error ~ ^^ </div>;

  return (
    <div>
      <div onClick={handleClickLogOut}>로그아웃</div>
    </div>
  );
};

export default Mypage;
