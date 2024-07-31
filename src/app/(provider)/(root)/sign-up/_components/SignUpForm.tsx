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
    <div className="relative mb-6">
      <label className="block text-label-normal text-20px text-border mb-6 text-left">
        {title}
      </label>
      <label className="block text-label-normal text-sm font-bold mb-2">
        {label}
      </label>
      <div className="relative">
        <input
          type={
            type === 'password' ? (showPassword ? 'text' : 'password') : type
          }
          name={name}
          value={value}
          onChange={onChange}
          placeholder={title}
          className={`w-full px-3 py-2 border rounded-xl shadow-sm focus:outline-none ${
            error ? 'border-red-500' : 'border-primary-strong'
          }`}
        />
        {type === 'password' && (
          <span
            className="absolute inset-y-0 right-3 flex items-center cursor-pointer"
            onClick={handleShowPassword}
          >
            {showPassword ? (
              <PiEyeSlash className="text-[#545454] text-[24px]" />
            ) : (
              <PiEye className="text-[#545454] text-[24px]" />
            )}
          </span>
        )}
      </div>
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );
};

export default SignupForm;
