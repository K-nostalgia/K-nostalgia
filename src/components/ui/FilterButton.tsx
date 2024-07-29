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
      className={`py-1.5 px-4 rounded-[4px] text-sm ${
        isActive
          ? 'bg-primary-strong text-white border-primary-strong'
          : 'text-label-strong  bg-[#F3D9B6]'
      }`}
    >
      {children}
    </button>
  );
};

export default FilterButton;
