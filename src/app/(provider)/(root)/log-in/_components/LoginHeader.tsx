import React from 'react';
import { GoArrowLeft } from 'react-icons/go';

export default function LoginHeader() {
  return (
    <div className="mb-4">
      <GoArrowLeft className="mb-4 text-2xl cursor-pointer" />
      <h3 className="text-{20px} font-bold mb-6 text-left text-label-strong">
        반갑습니다! 향그리움입니다:)
      </h3>
    </div>
  );
}
