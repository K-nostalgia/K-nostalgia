import Link from 'next/link';
import Image from 'next/image';
import React from 'react';
import KNostalgiaIcon2 from '../icons/KNostalgiaIcon2';

const Footer = () => {
  return (
    <div className="h-[180px] bg-normal border-t border-[#C8C8C8]">
      <div className="max-w-screen-xl mx-auto flex justify-between items-center mt-12">
        <div className="cursor-pointer">
          <Link href="https://github.com/Chasyuss/K-nostalgia" className="flex">
            <Image
              src="/image/GitHub.png"
              alt="깃허브"
              width={36}
              height={36}
              className="h-9 w-9 p-1"
            />
            <div className="text-base font-medium leading-[25.6px] flex items-center justify-center ml-2">
              A05_gitHub
            </div>
          </Link>
        </div>
        <div className="w-[73px] h-[80px]">
          <KNostalgiaIcon2 width={73} height={80} />
        </div>
        <div className="text-base font-medium leading-[25.6px]">
          ⓒ 5JOSAMA. All rights reserved
        </div>
      </div>
    </div>
  );
};

export default Footer;
