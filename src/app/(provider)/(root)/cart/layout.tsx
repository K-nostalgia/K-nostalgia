import DefaultAppLayout from '@/components/common/DefaultAppLayout';
import { PropsWithChildren } from 'react';

function CartLayout({ children }: PropsWithChildren) {
  return (
    <DefaultAppLayout showHeader={true} showCart={false} showNavigation={false} headerTitle="장바구니">
      {children}
    </DefaultAppLayout>
  );
}

export default CartLayout;
