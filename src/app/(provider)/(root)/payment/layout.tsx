'use client';

import useDeviceSize from '@/hooks/useDeviceSize';
import { PropsWithChildren } from 'react';
import Profile from '../my-page/_components/Profile';

function MyPageLayout({ children }: PropsWithChildren) {
  const { isDesktop } = useDeviceSize();
  return (
    <div
      className={`min-h-screen max-w-[1280px] mx-auto md:px-4 ${
        isDesktop ? 'flex' : ''
      }`}
    >
      {isDesktop && (
        <aside className="w-1/2 md:mr-6">
          <div className="max-w-[503px] md:mt-20 md:max-h-[422px] md:p-10 md:bg-primary-70 md:rounded-xl">
            <Profile />
          </div>
        </aside>
      )}
      <main className={`${isDesktop ? 'w-2/3' : 'w-full'}`}>{children}</main>
    </div>
  );
}

// export default MyPageLayout;

// 'use client';

// import useDeviceSize from '@/hooks/useDeviceSize';
// import { PropsWithChildren } from 'react';
// import Profile from './_components/Profile';
// import RecentMarket from './_components/RecentMarket';

// function MyPageLayout({ children }: PropsWithChildren) {
//   const { isDesktop } = useDeviceSize();
//   return (
//     <div
//       className={`min-h-screen max-w-[1280px] mx-auto md:px-4 ${
//         isDesktop ? 'flex' : ''
//       }`}
//     >
//       {isDesktop && (
//         <aside className="w-1/2 md:mr-10">
//           <div className="w-[503px] md:mt-20 md:max-h-[422px] md:p-10 md:bg-primary-70 md:rounded-xl">
//             <Profile />
//           </div>
//           <div className=" md:max-w-[503px] md:mt-20 md:md:max-h-[422px] md:p-10 md:bg-primary-70 md:rounded-xl">
//             <RecentMarket />
//           </div>
//         </aside>
//       )}
//       <main className={`${isDesktop ? 'w-2/3 ' : 'w-full'}`}>{children}</main>
//     </div>
//   );
// }

export default MyPageLayout;
