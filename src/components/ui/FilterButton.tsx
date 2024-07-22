import React, { useState } from 'react';

type ButtonProps = {
  children: React.ReactNode;
};

const FilterButton = ({ children }: ButtonProps) => {
  const [isActive, setIsActive] = useState(false);

  const toggleActive = () => {
    setIsActive((prev) => !prev);
  };
  return (
    <button
      onClick={toggleActive}
      className={`py-1.5 px-4 rounded-full border text-sm ${
        isActive
          ? 'bg-primary-brown-color text-white border-primary-brown-color'
          : 'border-[#1F1E1E] text-[#1F1E1E]'
      }`}
    >
      {children}
    </button>
  );
};

export default FilterButton;
