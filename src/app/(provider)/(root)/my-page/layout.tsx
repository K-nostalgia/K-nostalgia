import DefaultAppLayout from '@/components/common/DefaultAppLayout';
import { PropsWithChildren } from 'react';

function MyPageLayout({ children }: PropsWithChildren) {
  return (
    <DefaultAppLayout showHeader={true} showBackButton={false} showNavigation={true}>
      {children}
    </DefaultAppLayout>
  );
}

export default MyPageLayout;
