import React from 'react';
import { GoArrowLeft } from 'react-icons/go';

const LoginHeader = () => {
  return (
    <div>
      <div className="w-[375px] pt-5 px-3 pb-2">
        <div className="p-1">
          <GoArrowLeft className="text-[28px]  cursor-pointer" />
        </div>
      </div>
      <div>
        <p className="text-xl font-semibold text-left text-primary-10 mt-10 ml-8 mb-5">
          반갑습니다! 향그리움입니다 :)
        </p>
      </div>
    </div>
  );
};

export default LoginHeader;
