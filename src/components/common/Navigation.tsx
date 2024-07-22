'use client';

import { GoPerson } from 'react-icons/go';
import { GoPersonFill } from 'react-icons/go';
import { CiHome } from 'react-icons/ci';
import { BsGrid1X2 } from 'react-icons/bs';
import { BsGrid1X2Fill } from 'react-icons/bs';
import { IconType } from 'react-icons/lib';
import { usePathname, useRouter } from 'next/navigation';

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
    icon: CiHome,
    activeIcon: CiHome
  },
  { label: '전통 시장', path: '/market', icon: CiHome, activeIcon: CiHome },
  {
    label: '특산물',
    path: '/local-food',
    icon: BsGrid1X2,
    activeIcon: BsGrid1X2Fill
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
    <div className="flex border-t-2 justify-between pt-[0.38rem] px-5 pb-[2.125rem] mt-auto md:hidden">
      {naviList.map((item, index) => (
        <div
          key={index}
          className={`flex flex-col items-center cursor-pointer ${
            pathname === item.path
              ? 'text-primary-brownbrown-color'
              : 'text-black'
          }`}
          onClick={() => handleNavigationClick(item.path)}
        >
          {pathname === item.path ? <item.activeIcon /> : <item.icon />}
          {item.label}
        </div>
      ))}
    </div>
  );
};

export default Navigation;
