import React, { useState } from 'react';

type ButtonProps = {
  children: React.ReactNode;
  onClick: () => void;
  isActive: boolean;
};

const FilterButton = ({ children, onClick, isActive }: ButtonProps) => {
  return (
    <button
      onClick={onClick}
      className={`py-1.5 px-4 rounded-full border text-sm ${
        isActive
          ? 'bg-primary-strong text-white border-primary-strong'
          : 'border-[#1F1E1E] text-[#1F1E1E]'
      }`}
    >
      {children}
    </button>
  );
};

export default FilterButton;
