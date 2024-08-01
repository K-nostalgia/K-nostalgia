import React from 'react';
import { GoArrowLeft } from 'react-icons/go';

const LoginHeader = () => {
  return (
    <div>
      <GoArrowLeft className="mb-12 text-2xl cursor-pointer" />
      <h3 className="text-xl font-semibold mb-6 text-left text-primary-10">
        반갑습니다! 향그리움입니다 :)
      </h3>
    </div>
  );
};

export default LoginHeader;
