import DefaultAppLayout from '@/components/common/DefaultAppLayout';
import { PropsWithChildren } from 'react';

function checkPaymentLayout({ children }: PropsWithChildren) {
  return (
    <DefaultAppLayout
      showNavigation={true}
      showHeader={true}
      showSearch={false}
    >
      {children}
    </DefaultAppLayout>
  );
}

export default checkPaymentLayout;
