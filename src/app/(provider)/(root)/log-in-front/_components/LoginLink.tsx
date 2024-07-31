'use client';
import { useRouter } from 'next/navigation';
import React from 'react';

const LoginLink = () => {
  const router = useRouter();
  const handleLoginMove = () => {
    router.push('/log-in');
  };
  return (
    <div
      onClick={handleLoginMove}
      className="text-center mt-[122px] text-label-normal p-2 underline text-nowrap"
    >
      로그인해서 입장하기
    </div>
  );
};

export default LoginLink;
