'use client';
import Loading from '@/components/common/Loading';
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
      router.push('/log-in-front');
    } catch (err) {
      console.log('로그아웃 에러');
    }
  };

  if (isLoading) return <Loading />;
  if (error) return <div> Error </div>;

  return (
    <div className="p-4 cursor-pointer">
      <div className="flex items-center py-[3px] mb-[98px]">
        <IoIosLogOut className="mr-[8px] text-label-normal text-[20px]" />
        <div onClick={handleClickLogOut}>로그아웃</div>
      </div>
    </div>
  );
};

export default Logout;
