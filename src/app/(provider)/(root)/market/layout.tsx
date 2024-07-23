import DefaultAppLayout from '@/components/common/DefaultAppLayout';
import { PropsWithChildren } from 'react';

function MarketLayout({ children }: PropsWithChildren) {
  return (
    <DefaultAppLayout showHeader={true} showNavigation={true} headerTitle="전통시장">
      {children}
    </DefaultAppLayout>
  );
}

export default MarketLayout;
