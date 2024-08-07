import api from '@/service/service';
import React from 'react';
import { FcGoogle } from 'react-icons/fc';

const GoogleLogin = () => {
  const handleClickGoogleLogin = async () => {
    try {
      const socialuser = await api.auth.socialLogin('google');
      console.log('구글 로그인 성공', socialuser);
    } catch (error) {
      console.error('구글 로그인 실패', error);
      alert('구글 로그인 실패');
    }
  };
  return (
    <div className="flex items-center justify-center mt-3">
      <div
        onClick={handleClickGoogleLogin}
        className="flex items-center justify-center w-[320px] h-[48px] pl-[88px] pr-[102px] py-[12px] bg-[#FFFFFF] border-[#FEDF32] rounded-[12px] cursor-pointer"
      >
        <FcGoogle className="text-[24px] mr-2" />
        <p className="text-label-strong text-center text-nowrap cursor-pointer">
          {' '}
          구글로 시작하기{' '}
        </p>
      </div>
    </div>
  );
};

export default GoogleLogin;
