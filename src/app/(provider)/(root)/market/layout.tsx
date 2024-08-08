'use client';

import DefaultAppLayout from '@/components/common/DefaultAppLayout';
import { usePathname } from 'next/navigation';
import { PropsWithChildren } from 'react';

declare global {
  interface Window {
    Kakao: any;
  }
}

function MarketLayout({ children }: PropsWithChildren) {
  const pathMarketName: string = usePathname();
  const showMarketLayout =
    pathMarketName === '/market' || !pathMarketName.startsWith('/market/');

  return (
    <DefaultAppLayout
      showHeader={true}
      showNavigation={showMarketLayout}
      showBackButton={!showMarketLayout}
      headerTitle={showMarketLayout ? '전통시장' : ''}
      showTopButton={true}
    >
      {children}
    </DefaultAppLayout>
  );
}

export default MarketLayout;
