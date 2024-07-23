import DefaultAppLayout from '@/components/common/DefaultAppLayout';
import { PropsWithChildren } from 'react';

function LocalFoodLayout({ children }: PropsWithChildren) {
  return (
    <DefaultAppLayout showHeader={true} showNavigation={true} headerTitle="특산물">
      {children}
    </DefaultAppLayout>
  );
}

export default LocalFoodLayout;
