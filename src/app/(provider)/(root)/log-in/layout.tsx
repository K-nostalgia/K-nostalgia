import DefaultAppLayout from '@/components/common/DefaultAppLayout';
import { PropsWithChildren } from 'react';

function LoginLayout({ children }: PropsWithChildren) {
  return (
    <DefaultAppLayout
      showHeader={true}
      showSearch={false}
      showCart={false}
      showNavigation={false}
    >
      {children}
    </DefaultAppLayout>
  );
}

export default LoginLayout;
