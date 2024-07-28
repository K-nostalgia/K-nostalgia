'use client';

import { useUser } from '@/hooks/useUser';
import { useRouter } from 'next/navigation';
import { GoSearch } from 'react-icons/go';
import { PiShoppingCartSimple } from 'react-icons/pi';
import TitleLogo from '../icons/TitleLogo';
import { GoArrowLeft } from 'react-icons/go';

type HeaderProps = {
  headerTitle?: string;
  showBackButton?: boolean;
  showLogo?: boolean;
  showSearch?: boolean;
  showCart?: boolean;
};

const Header = ({
  headerTitle,
  showBackButton = true,
  showLogo = false,
  showSearch = true,
  showCart = true
}: HeaderProps) => {
  const router = useRouter();

  // 뒤로가기 = true, showLogo = false 뒤로가기 보여주고 (기본 상태) / 뒤로가기가 false + showLogo True면 로고 보여주고 / 둘 다 false 하면 아무것도 안 보여주기
  const showBackLogoIcon = () => {

    if (showBackButton && !showLogo) {
      return (
        <div
          onClick={() => router.back()}
          className="flex cursor-pointer items-center"
        >
          <GoArrowLeft className="w-7 h-7" />
        </div>
      );
    } else if (!showBackButton && showLogo) {
      return (
        <div onClick={() => router.push('/')} className="cursor-pointer">
          <TitleLogo />
        </div>
      );
    } else if (!showBackButton && !showLogo) {
      return <div className="invisible w-7 h-7" />;
    }
  };

  // 검색, 카트 있다 = 기본 / 검색만 있음 / 검색, 카트 둘 다 없음 = false
  const showSearchCartIcon = () => {
    if (showSearch && showCart) {
      return (
        <div className="flex p-1 gap-1">
          <GoSearch className="w-7 h-7" />
          <PiShoppingCartSimple
            onClick={() => router.push('/cart')}
            className="cursor-pointer w-7 h-7"
          />
        </div>
      );
    } else if (showSearch && !showCart) {
      return (
        <div className="flex p-1 gap-1">
          <GoSearch className="w-7 h-7" />
        </div>
      );
    } else if (!showSearch && !showCart) {
      return <div className="invisible w-7 h-7" />;
    }
  };

  return (
    //TODO mic md:hidden, 빈 div justify-between 유지
    <div className="fixed top-0 left-0 right-0 z-50 flex justify-between py-2 px-3 bg-normal md:hidden">
      {showBackLogoIcon()}
      <div className="flex items-center ml-6">{headerTitle}</div>
      {showSearchCartIcon()}
    </div>
  );
};

export default Header;
