'use client';

import useDeviceSize from '@/hooks/useDeviceSize';
import { PropsWithChildren } from 'react';
import Profile from './_components/Profile';

function MyPageLayout({ children }: PropsWithChildren) {
  const { isDesktop } = useDeviceSize();
  return (
    <div
      className={`md:min-h-screen max-w-[1280px] mx-auto md:px-4 ${
        isDesktop ? 'flex' : ''
      }`}
    >
      {isDesktop && (
        <aside className="w-1/3 md:mr-10">
          <div className=" md:max-w-[503px] md:mt-10 md:md:max-h-[422px] md:p-10 md:bg-primary-70 md:rounded-xl">
            <Profile />
          </div>
        </aside>
      )}
      <main className={`${isDesktop ? 'w-2/3' : 'w-full'}`}>{children}</main>
    </div>
  );
}

export default MyPageLayout;
