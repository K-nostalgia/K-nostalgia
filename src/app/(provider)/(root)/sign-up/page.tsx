import React from 'react';
import SignUpContainer from './_components/SignUpContainer';
import DesktopSignUpLayout from './_components/DesktopSignUpLayout';
import Image from 'next/image';
import TitleLogo from '@/components/icons/TitleLogo';

const SignUpPage = () => {
  return (
    <div className="flex w-full items-center justify-center">
      {/* 모바일 */}
      <div className="w-full md:hidden">
        <SignUpContainer />
      </div>

      {/* 데스크탑*/}
      <div className="hidden md:flex w-full min-h-screen bg-primary-20 py-8">
        <div className="bg-normal border rounded-[20px] overflow-hidden w-[1280px] mx-auto flex">
          <div className="flex flex-col items-center justify-center w-[556px]">
            <Image
              src="/image/Tigernew.png"
              alt="호랑이 아이콘"
              width={200}
              height={150}
              className="w-[191px] h-[148px] mb-10"
            />
            <p className="text-2xl text-primary-10">
              향그리움에 오신 걸 환영합니다 :)
            </p>
          </div>

          <div className="w-[692px] h-[830px] flex flex-col">
            <div className="flex flex-row items-center justify-center pt-[90px] pb-4">
              <TitleLogo />
              <p className="text-2xl ml-2 mt-2 text-primary-10">
                의 가족이 될 준비 되셨나요?
              </p>
            </div>
            <DesktopSignUpLayout />
          </div>
        </div>
      </div>
    </div>
  );
};
export default SignUpPage;
