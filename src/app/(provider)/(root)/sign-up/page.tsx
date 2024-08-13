import React from 'react';
import SignUpContainer from './_components/SignUpContainer';
import DesktopSignUpLayout from './_components/DesktopSignUpLayout';
import Image from 'next/image';
import TitleLogo from '@/components/icons/TitleLogo';

const SignUpPage = () => {
  return (
    <div className="flex min-h-screen w-full">
      {/* 모바일 */}
      <div className="w-full xs:hidden">
        <SignUpContainer />
      </div>

      {/* 데스크탑*/}
      <div className="hidden xs:flex w-full bg-primary-20 p-8">
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

          {/* <div className="w-1/2 flex flex-col gap-2"> */}
          <div className="w-[692px] h-[952px] flex flex-col">
            <div className="flex flex-row items-center justify-center pt-[100px] pb-4 flex-shrink-0">
              <TitleLogo />
              <p className="text-2xl ml-2 text-primary-10">
                의 가족이 될 준비 되셨나요?
              </p>
            </div>

            <div className="flex-1 overflow-y-auto">
              <DesktopSignUpLayout />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
