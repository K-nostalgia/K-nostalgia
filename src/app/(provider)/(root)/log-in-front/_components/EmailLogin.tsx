'use client';
import { useRouter } from 'next/navigation';
import React from 'react';
import { BsEnvelope } from 'react-icons/bs';

const EmailLogin = () => {
  const router = useRouter();
  const handleEmailMove = () => {
    router.push('/sign-up');
  };
  return (
    <div className="flex items-center justify-center mt-3">
      <div
        onClick={handleEmailMove}
        className="flex items-center justify-center w-[323px] h-[48px] px-[88px] py-[12px] border border-[#A87939] rounded-[12px]"
      >
        <BsEnvelope className="text-[20px] mr-[6px] text-[#A87939] " />
        <p className="text-[#A87939] text-center text-nowrap">
          {' '}
          이메일로 시작하기{' '}
        </p>
      </div>
    </div>
  );
};

export default EmailLogin;
