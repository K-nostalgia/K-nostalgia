import DefaultAppLayout from '@/components/common/DefaultAppLayout';
import { PropsWithChildren } from 'react';

function checkPaymentLayout({ children }: PropsWithChildren) {
  return (
    <DefaultAppLayout
      showNavigation={false}
      showHeader={true}
      showSearch={false}
      showCart={false}
      headerTitle="주문 완료"
    >
      {children}
    </DefaultAppLayout>
  );
}

export default checkPaymentLayout;
