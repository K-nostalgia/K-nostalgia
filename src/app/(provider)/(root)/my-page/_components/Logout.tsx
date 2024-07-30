'use client';
import { useUser } from '@/hooks/useUser';
import api from '@/service/service';
import { useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import React from 'react';
import { IoIosLogOut } from 'react-icons/io';

const Logout = () => {
  const { data: user, isLoading, error } = useUser();
  const queryClient = useQueryClient();
  const router = useRouter();

  const handleClickLogOut = async () => {
    try {
      await api.auth.logOut();
      // 캐시 무효화
      queryClient.invalidateQueries();
      console.log('로그아웃 완료');
      router.push('/log-in');
    } catch (err) {
      console.log('로그아웃 에러');
    }
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div> Error </div>;

  return (
    <div className="p-4">
      <div className="flex items-center py-[3px] mb-[72px]">
        <IoIosLogOut className="mr-[8px] text-label-normal text-[20px]" />
        <div onClick={handleClickLogOut}>로그아웃</div>
      </div>
    </div>
  );
};

export default Logout;
