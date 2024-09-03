'use client';

import { IconType } from 'react-icons/lib';
import { usePathname, useRouter } from 'next/navigation';
import KNostalgiaIcon2 from '../icons/KNostalgiaIcon2';
import KNostalgiaIcon3 from '../icons/KNostalgiaIcon3';
import { TraditionalMarketIcon } from '../icons/TraditionalMarketIcon';
import { LocalFoodIcon } from '../icons/LocalFoodIcon';
import { MyProfile1 } from '../icons/MyProfile1';
import { MyProfile2 } from '../icons/MyProfile2';

type NaviList = {
  label: string;
  path: string;
  icon: IconType;
  activeIcon: IconType;
};

const naviList: NaviList[] = [
  {
    label: '홈',
    path: '/',
    icon: KNostalgiaIcon3,
    activeIcon: KNostalgiaIcon2 as IconType
  },
  {
    label: '전통 시장',
    path: '/market',
    icon: TraditionalMarketIcon,
    activeIcon: TraditionalMarketIcon
  },
  {
    label: '특산물',
    path: '/local-food',
    icon: LocalFoodIcon,
    activeIcon: LocalFoodIcon
  },
  {
    label: '내 프로필',
    path: '/my-page',
    icon: MyProfile1,
    activeIcon: MyProfile2
  }
];

const Navigation = () => {
  const router = useRouter();
  const pathname = usePathname();

  const handleNavigationClick = (path: string) => {
    router.push(`${path}`);
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 flex border-t-2 justify-between pt-3 px-5 pb-6 mt-auto bg-normal ">
      {naviList.map((item, index) => (
        <div
          key={index}
          className={`flex flex-col items-center cursor-pointer gap-1 w-[80px] h-[48px] px-2 ${
            pathname === item.path ? 'text-primary-strong' : 'text-black'
          }`}
          onClick={() => handleNavigationClick(item.path)}
        >
          {pathname === item.path ? <item.activeIcon /> : <item.icon />}
          <div className="text-[12px] text-nowrap flex items-center justify-center">
            {item.label}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Navigation;
