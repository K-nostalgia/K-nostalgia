import DefaultAppLayout from '@/components/common/DefaultAppLayout';
import { PropsWithChildren } from 'react';

function SignUpLayout({ children }: PropsWithChildren) {
  return (
    <DefaultAppLayout
      showHeader={true}
      showSearch={false}
      showCart={false}
      showNavigation={false}
      showChat={false}
    >
      {children}
    </DefaultAppLayout>
  );
}

export default SignUpLayout;
