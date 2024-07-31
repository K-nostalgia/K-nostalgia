import api from '@/service/service';
import Image from 'next/image';
import React from 'react';

const KaKaoLogin = () => {
  //카카오로그인
  const handleClickKaKaoLogin = async () => {
    try {
      const socialuser = await api.auth.socialLogin('kakao');

      console.log('카카오 로그인 성공', socialuser);
    } catch (error) {
      console.error('카카오 로그인 실패', error);
      alert('카카오 로그인 실패');
    }
  };
  return (
    <div className="flex items-center justify-center mt-8">
      <div
        onClick={handleClickKaKaoLogin}
        className="flex items-center justify-center w-[323px] h-[48px] px-[88px] py-[12px] bg-[#FEDF32] border-[#FEDF32] rounded-[12px]"
      >
        <div>
          <Image
            src="/image/KaKaoIcon.png"
            alt="KaKao Logo"
            width={24}
            height={24}
            className="w-[24px] h-[24px] mr-2"
          />
        </div>
        <p className="text-label-strong text-center text-nowrap">
          {' '}
          카카오로 시작하기{' '}
        </p>
      </div>
    </div>
  );
};

export default KaKaoLogin;
