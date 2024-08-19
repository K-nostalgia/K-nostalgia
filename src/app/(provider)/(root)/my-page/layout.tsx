'use client';

import useDeviceSize from '@/hooks/useDeviceSize';
import { PropsWithChildren } from 'react';
import Profile from './_components/Profile';
import Image from 'next/image';
// import RecentMarket from './_components/RecentMarket';

function MyPageLayout({ children }: PropsWithChildren) {
  const { isDesktop } = useDeviceSize();
  return (
    <div
      className={`min-h-screen max-w-[1280px] mx-auto md:px-4 ${
        isDesktop ? 'flex' : ''
      }`}
    >
      {isDesktop && (
        <aside className="w-1/2 md:mr-6 flex flex-col">
          <div className="w-full max-w-[503px] md:mt-20 md:max-h-[422px] md:p-10 md:bg-primary-70 md:rounded-xl">
            <Profile />
          </div>
          {/* <div className="w-full max-w-[503px] md:mt-20 md:max-h-[422px] md:p-10 md:bg-secondary-70 md:rounded-xl"> */}
          {/* <RecentMarket /> */}
          <Image
            src="/image/ProfileBanner.png"
            alt="divider"
            width={503}
            height={900}
            className="w-[503px] h-[900px] mt-6"
          />
          {/* </div> */}
        </aside>
      )}
      <main className={`${isDesktop ? 'w-2/3 ' : 'w-full'}`}>{children}</main>
    </div>
  );
}

export default MyPageLayout;
