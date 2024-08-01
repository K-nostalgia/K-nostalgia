import Image from 'next/image';
import React from 'react';

interface textProps {
  text: string;
}

export const DefaultImage = ({ text }: textProps) => {
  return (
    <div className="flex flex-col justify-center items-center text-center absolute translate-x-[-50%] translate-y-[-50%] top-[50%] left-[50%]">
      <Image
        src="https://kejbzqdwablccrontqrb.supabase.co/storage/v1/object/public/local-food/Tiger_Sad.png"
        width={100}
        height={92}
        alt={`${text}`}
        style={{ width: 100, height: 92 }}
      />
      <p className="text-label-assistive text-lg mt-4 font-medium">{text}</p>
    </div>
  );
};
