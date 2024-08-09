'use client';
import React, { useState } from 'react';
import { PiEye, PiEyeSlash } from 'react-icons/pi';

interface SignupFormProps {
  title: string;
  label: string;
  placeholder: string;
  type: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
  successMessage?: string;
  onEmailCheckDuplicate?: () => void;
  onNicknameCheckDuplicate?: () => void;
}

const SignupForm: React.FC<SignupFormProps> = ({
  title,
  label,
  placeholder,
  type,
  name,
  value,
  onChange,
  error,
  successMessage,
  onEmailCheckDuplicate,
  onNicknameCheckDuplicate
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
            placeholder={placeholder}
            className={`w-[322px] h-[52px] bg-normal flex pl-[16px] pr-[12px] pt-[12px] pb-[12px] m-[8px] border rounded-xl focus:outline-none text-primary-20 ${
              error ? 'border-red-500' : 'border-primary-strong'
            }`}
          />
          {type === 'password' && (
            <span
              className="absolute inset-y-0 right-5 flex items-center cursor-pointer"
              onClick={handleShowPassword}
            >
              {showPassword ? (
                <PiEyeSlash className="text-[#545454] text-xl" />
              ) : (
                <PiEye className="text-[#545454] text-xl" />
              )}
            </span>
          )}
          {(name === 'email' || name === 'nickname') && (
            <button
              type="button"
              className="absolute right-5 top-[50%] -translate-y-1/2 bg-primary-strong text-white px-2 py-1 rounded"
              onClick={
                name === 'email'
                  ? onEmailCheckDuplicate
                  : onNicknameCheckDuplicate
              }
            >
              중복 확인
            </button>
          )}
        </div>
        {error && <p className="text-red-500 text-sm px-4">{error}</p>}
        {successMessage && (
          <p className="text-green-500 text-sm px-4">{successMessage}</p>
        )}
      </div>
    </div>
  );
};

export default SignupForm;
