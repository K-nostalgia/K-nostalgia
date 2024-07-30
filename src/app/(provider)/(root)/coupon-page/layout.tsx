import DefaultAppLayout from '@/components/common/DefaultAppLayout';
import { PropsWithChildren } from 'react';

function CouponLayout({ children }: PropsWithChildren) {
  return (
    <DefaultAppLayout
      showHeader={true}
      showNavigation={true}
      headerTitle="할인쿠폰"
    >
      {children}
    </DefaultAppLayout>
  );
}

export default CouponLayout;
