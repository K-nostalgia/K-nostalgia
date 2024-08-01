'use client';

import { GoPerson } from 'react-icons/go';
import { GoPersonFill } from 'react-icons/go';
import { BsGrid1X2 } from 'react-icons/bs';
import { IconType } from 'react-icons/lib';
import { usePathname, useRouter } from 'next/navigation';
import KNostalgiaIcon2 from '../icons/KNostalgiaIcon2';
import KNostalgiaIcon3 from '../icons/KNostalgiaIcon3';
import { BsShopWindow } from 'react-icons/bs';

// TODO mic 모바일용 md: hidden 적용
type NaviList = {
  label: string;
  path: string;
  icon: IconType;
  activeIcon: IconType;
};

// TODO mic 아이콘 바꾸기
const naviList: NaviList[] = [
  {
    label: '홈',
    path: '/',
    icon: KNostalgiaIcon3,
    activeIcon: KNostalgiaIcon2
  },
  {
    label: '전통 시장',
    path: '/market',
    icon: BsShopWindow,
    activeIcon: BsShopWindow
  },
  {
    label: '특산물',
    path: '/local-food',
    icon: BsGrid1X2,
    activeIcon: BsGrid1X2
  },
  {
    label: '내 프로필',
    path: '/my-page',
    icon: GoPerson,
    activeIcon: GoPersonFill
  }
];

const Navigation = () => {
  const router = useRouter();
  const pathname = usePathname();

  const handleNavigationClick = (path: string) => {
    router.push(`${path}`);
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 flex border-t-2 justify-between pt-3 px-5 pb-7 mt-auto bg-normal md:hidden">
      {naviList.map((item, index) => (
        <div
          key={index}
          className={`flex flex-col items-center cursor-pointer gap-1 w-[44px] h-[48px] px-2 ${
            pathname === item.path ? 'text-primary-strong' : 'text-black'
          }`}
          onClick={() => handleNavigationClick(item.path)}
        >
          {pathname === item.path ? (
            <item.activeIcon className="w-[28px] h-[28px]" />
          ) : (
            <item.icon className="w-[28px] h-[28px]" />
          )}
          <div className="text-[12px] text-nowrap flex items-center justify-center">
            {item.label}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Navigation;
