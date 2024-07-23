import React from 'react';

interface FormFieldProps {
  title: string;
  label: string;
  type: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const SignupForm: React.FC<FormFieldProps> = ({
  title,
  label,
  type,
  name,
  value,
  onChange
}) => {
  return (
    <>
      <label className="block text-label-normal text-20px text-border mb-6 text-left">
        {title}
      </label>
      <label className="block text-label-normal text-sm font-bold mb-2">
        {label}
      </label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        className="w-full px-3 py-2 border border-primary-strong rounded-xl focus:outline-none focus:border-primary-strong"
      />
    </>
  );
};

export default SignupForm;
