import Image from 'next/image';
import React from 'react';

export const DefaultCart = () => {
  return (
    <div className="flex flex-col justify-center items-center text-center absolute translate-x-[-50%] translate-y-[-50%] top-[50%] left-[50%]">
      <Image
        src="https://kejbzqdwablccrontqrb.supabase.co/storage/v1/object/public/local-food/Tiger_Sad.png"
        width={100}
        height={92}
        priority
        alt="장바구니가 비었어요"
      />
      <p className="text-label-assistive text-xl mt-4">장바구니가 비었어요</p>
    </div>
  );
};
