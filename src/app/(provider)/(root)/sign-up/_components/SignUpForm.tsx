'use client';
import React, { useState } from 'react';
import { PiEye, PiEyeSlash } from 'react-icons/pi';

interface SignupFormProps {
  title: string;
  label: string;
  type: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
}

const SignupForm: React.FC<SignupFormProps> = ({
  title,
  label,
  type,
  name,
  value,
  onChange,
  error
}) => {
  const [showPassword, setShowPassword] = useState(false);

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="relative">
      <label className="block text-label-normal text-xl mb-5 mt-[40px] ml-[32px] text-left">
        {title}
      </label>
      <div className="px-4 py-3 gap-2 w-[375px]">
        <label className="block text-label-alternative mb-2 px-[16px]">
          {label}
        </label>
        <div className="relative items-center">
          <input
            type={
              type === 'password' ? (showPassword ? 'text' : 'password') : type
            }
            name={name}
            value={value}
            onChange={onChange}
            className={`w-[322px] h-[52px] bg-normal flex pl-[16px] pr-[12px] pt-[12px] pb-[12px] m-[8px] border rounded-xl focus:outline-none text-primary-20 ${
              error ? 'border-red-500' : 'border-primary-strong'
            }`}
          />
          {type === 'password' && (
            <span
              className="absolute inset-y-0 right-3 flex items-center cursor-pointer"
              onClick={handleShowPassword}
            >
              {showPassword ? (
                <PiEyeSlash className="text-[#545454] text-2xl" />
              ) : (
                <PiEye className="text-[#545454] text-2xl" />
              )}
            </span>
          )}
        </div>
        {error && <p className="text-red-500 text-sm px-4">{error}</p>}
      </div>
    </div>
  );
};

export default SignupForm;
