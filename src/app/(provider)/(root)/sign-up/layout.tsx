import DefaultAppLayout from '@/components/common/DefaultAppLayout';
import { PropsWithChildren } from 'react';

function SignUpLayout({ children }: PropsWithChildren) {
  return (
    <DefaultAppLayout
      showHeader={true}
      showSearchCart={false}
      showNavigation={false}
    >
      {children}
    </DefaultAppLayout>
  );
}

export default SignUpLayout;
