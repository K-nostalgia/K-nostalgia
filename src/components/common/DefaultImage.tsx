import Image from 'next/image';
import React from 'react';

interface textProps {
  text: string;
}

export const DefaultImage = ({ text }: textProps) => {
  return (
    <div className="flex flex-col justify-center items-center text-center">
      <Image
        src="https://kejbzqdwablccrontqrb.supabase.co/storage/v1/object/public/local-food/Tiger_Sad.png"
        width={100}
        height={92}
        alt={`${text}`}
      />
      <p className="text-label-assistive text-xl mt-4">{text}</p>
    </div>
  );
};
