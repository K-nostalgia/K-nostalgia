import DefaultAppLayout from '@/components/common/DefaultAppLayout';
import { PropsWithChildren } from 'react';

function CartLayout({ children }: PropsWithChildren) {
  return (
    <DefaultAppLayout
      showHeader={true}
      showNavigation={false}
      showChat={false}
      showSeach={false}
      showCart={false}
      headerTitle="장바구니"
    >
      {children}
    </DefaultAppLayout>
  );
}

export default CartLayout;
