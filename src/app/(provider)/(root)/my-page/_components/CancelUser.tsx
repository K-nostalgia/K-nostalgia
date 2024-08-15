'use client';
import api from '@/service/service';
import { useRouter } from 'next/navigation';
import React from 'react';
import { BsTrash3 } from 'react-icons/bs';

const CancelUser = () => {
  const router = useRouter();
  const handleDeleteUser = async () => {
    try {
      const response = await api.auth.deleteUser();
      console.log('탈퇴 성공');
      router.push('/log-in');
    } catch (error) {
      console.error('탈퇴 에러');
    }
  };
  return (
    <div className="p-4">
      <div className="flex items-center py-[3px]">
        <BsTrash3 className="mr-[8px] text-label-normal text-[20px]" />
        <div onClick={handleDeleteUser}> 회원탈퇴 </div>
      </div>
    </div>
  );
};

export default CancelUser;
