import DefaultAppLayout from '@/components/common/DefaultAppLayout';
import { usePathname } from 'next/navigation';
import { PropsWithChildren } from 'react';

function MarketLayout({ children }: PropsWithChildren) {
  const pathMarketName: string = usePathname();
  const showMarketNavigation =
    pathMarketName === '/market' || !pathMarketName.startsWith('/market/');

  return (
    <DefaultAppLayout
      showHeader={true}
      showNavigation={showMarketNavigation}
      headerTitle="전통시장"
    >
      {children}
    </DefaultAppLayout>
  );
}

export default MarketLayout;
