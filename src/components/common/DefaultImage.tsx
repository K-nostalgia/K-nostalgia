import Image from 'next/image';
import React from 'react';

export const DefaultImage = () => {
  return (
    <div className="flex flex-col justify-center items-center text-center">
      <Image
        src="https://kejbzqdwablccrontqrb.supabase.co/storage/v1/object/public/local-food/Tiger_Sad.png"
        width={100}
        height={92}
        alt="이미지가 없습니다."
      />
      <p className="text-label-assistive text-xl mt-4">이미지가 없습니다</p>
    </div>
  );
};
