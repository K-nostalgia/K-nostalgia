import React from 'react';
import Image from 'next/image';
import LoginForm from './LoginForm';
import TitleLogo from '@/components/icons/TitleLogo';

const DesktopLoginLayout = () => {
  return (
    <div className="hidden xs:flex bg-primary-20 items-center justify-center">
      <div className="bg-normal h-[952px] border mt-16 mb-16 rounded-[20px] overflow-hidden max-w-6xl flex w-full">
        <div className="w-1/2 bg-normal p-8 flex flex-col justify-center items-center">
          <Image
            src="/image/Banner.png"
            alt="Login illustration"
            width={556}
            height={888}
            className="w-[556px] h-[888px]"
          />
        </div>

        <div className="w-1/2 p-12 flex flex-col justify-center">
          <Image
            src="/image/TitleLogo.png"
            alt="title logo"
            priority
            width={353}
            height={100}
            className="w-[353px] h-[98px] mb-12 mx-auto"
          />
          <LoginForm />
        </div>
      </div>
    </div>
  );
};

export default DesktopLoginLayout;
