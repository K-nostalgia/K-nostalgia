import DefaultAppLayout from '@/components/common/DefaultAppLayout';
import { PropsWithChildren } from 'react';

function MyPageLayout({ children }: PropsWithChildren) {
  return (
    <DefaultAppLayout showHeader={true} showBackButton={false} showChat={true} showNavigation={true} headerTitle="내 프로필">
      {children}
    </DefaultAppLayout>
  );
}

export default MyPageLayout;
