'use client';
import api from '@/service/service';
import { useRouter } from 'next/navigation';
import React from 'react';

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
    <div>
      {' '}
      <button onClick={handleDeleteUser}> 회원 탈퇴 </button>
    </div>
  );
};

export default CancelUser;
