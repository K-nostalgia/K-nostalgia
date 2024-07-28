'use client';

import DefaultAppLayout from '@/components/common/DefaultAppLayout';
// import DefaultWebLayout from '@/components/common/DefaultWebLayout';
import { usePathname } from 'next/navigation';
import { PropsWithChildren, useEffect, useState } from 'react';

const titles: { [key: string]: string } = {
  '/local-food': '특산물',
  '/cart': '장바구니',
  '/complete-payment': '주문 완료'
};

// const standardWidth = 375;
// let debounce: any = 0;

function Layout({ children }: PropsWithChildren) {
  // TODO 조건부 TODO use client 쓰는 방법밖에 없는지 한 번 더 생각해보기
  const pathName: string = usePathname();
  // const [isMobile, setMobile] = useState<boolean>(false);
  const [title, setTitle] = useState<string>('');
  const [showNavigation, setShowNavigation] = useState<boolean>(false);
  const [showBackButton, setShowBackButton] = useState<boolean>(true);
  const [showHeader, setShowHeader] = useState<boolean>(false);
  const [showTopButton, setShowTopButton] = useState<boolean>(false);
  const [showLogo, setShowLogo] = useState<boolean>(false);
  const [showSearch, setShowSearch] = useState<boolean>(true);
  const [showCart, setShowCart] = useState<boolean>(true);

  // useEffect(() => {
  //     const currentWidth = window.innerWidth;
  //     setMobile(currentWidth <= 375);

  //     window.addEventListener('resize', () => {
  //       if (debounce) {
  //         clearTimeout(debounce);
  //         debounce = null;
  //       }

  //       console.log('???');
  //       debounce = setTimeout(() => {
  //         console.log('aaa');
  // setMobile(window.innerWidth <= 375);
  //       }, 300);
  //     });
  // }, []);

  useEffect(() => {
    setTitle(titles[pathName] ? titles[pathName] : '');

    const isLocalFoodDetail = pathName.startsWith('/local-food/');
    const showNavigationPath = ['/', '/check-payment'];
    const showBackButtonPath = ['/cart', '/complete-payment'];
    const showHeaderPath = [
      '/',
      '/cart',
      '/local-food',
      '/check-payment',
      '/complete-payment'
    ];
    const showLogoPath = ['/'];
    const hideSearchPath = ['/check-payment', '/complete-payment'];

    console.log(pathName);
    console.log(showBackButtonPath.includes(pathName));

    setShowNavigation(showNavigationPath.includes(pathName));
    setShowHeader(showHeaderPath.includes(pathName));
    setShowBackButton(
      isLocalFoodDetail || showBackButtonPath.includes(pathName)
    );
    setShowLogo(showLogoPath.includes(pathName));
    setShowSearch(!hideSearchPath.includes(pathName));
    setShowCart(pathName !== '/cart');
  }, [pathName]);

  return (
    <>
      {/* {isMobile ? ( */}
      <DefaultAppLayout
        showHeader={showHeader}
        showNavigation={showNavigation}
        showBackButton={showBackButton}
        showTopButton={showTopButton}
        showLogo={showLogo}
        showCart={showCart}
        showSearch={showSearch}
        headerTitle={title}
      >
        {children}
      </DefaultAppLayout>
      {/* ) : (
         <DefaultWebLayout
          showHeader={showHeader}
          showNavigation={showNavigation}
          showBackButton={showBackButton}
          showTopButton={showTopButton}
          showLogo={showLogo}
          showCart={showCart}
          showSearch={showSearch}
          headerTitle={title}
        >
          {children}
        </DefaultWebLayout>
      )} */}
    </>
  );
}

export default Layout;
