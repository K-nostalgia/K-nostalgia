import Image from 'next/image';
import React from 'react';

const Logo = () => {
  return (
    <div className="mt-[156px]">
      <Image
        src="/image/TitleLogo.png"
        alt="title logo"
        priority
        width={300}
        height={100}
        className="w-[260px] h-[72px] mx-auto"
      />
    </div>
  );
};

export default Logo;
