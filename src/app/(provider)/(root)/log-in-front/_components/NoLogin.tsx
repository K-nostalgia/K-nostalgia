import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React from 'react';

const NoLogin = () => {
  const router = useRouter();

  const handleNouserMove = () => {
    router.push('/');
  };
  return (
    <>
      <div className="flex justify-center">
        <Image
          src="/image/ORdivider.png"
          alt="divider"
          width={375}
          height={20}
          className="w-[375px] h-[20px] mt-[40px]"
        />
      </div>
      <div
        onClick={handleNouserMove}
        className="text-center mt-[32px] mb-[56px] p-2 text-label-alternative underline text-nowrap"
      >
        비회원으로 입장하기
      </div>
    </>
  );
};

export default NoLogin;
