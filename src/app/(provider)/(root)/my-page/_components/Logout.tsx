'use client';
import Loading from '@/components/common/Loading';
import { useUser } from '@/hooks/useUser';
import api from '@/service/service';
import { useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import React from 'react';
import { IoIosLogOut } from 'react-icons/io';
import Swal from 'sweetalert2';

const Logout = () => {
  const { data: user, isLoading, error } = useUser();
  const queryClient = useQueryClient();
  const router = useRouter();

  const handleClickLogOut = async () => {
    try {
      await api.auth.logOut();
      // 캐시 무효화
      queryClient.invalidateQueries();
      // console.log('로그아웃 완료');
      Swal.fire({
        icon: 'success',
        title: '로그아웃이 완료 되었습니다.',
        html: `
        <div id="swal2-html-container" class="swal2-html-container" style=" padding:0 !important; margin:-1rem; font-size:16px;"> 로그인 페이지로 자동으로 넘어갑니다. </div>
      `
      });
      router.push('/log-in');
    } catch (err) {
      console.log('로그아웃 에러');
    }
  };

  if (isLoading) return <Loading />;
  if (error) return <div> Error </div>;

  return (
    <div className="p-4">
      <div className="flex items-center py-[3px] mb-[98px] cursor-pointer">
        <IoIosLogOut className="mr-[8px] text-label-normal text-[20px]" />
        <div onClick={handleClickLogOut}>로그아웃</div>
      </div>
    </div>
  );
};

export default Logout;
