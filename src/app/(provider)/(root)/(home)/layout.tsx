import DefaultAppLayout from '@/components/common/DefaultAppLayout';
import { PropsWithChildren } from 'react';

function HomeLayout({ children }: PropsWithChildren) {
  return (
    <DefaultAppLayout
      showNavigation={true}
      showHeader={true}
      showTopButton={true}
      showLogo={true}
      showBackButton={false}
    >
      {children}
    </DefaultAppLayout>
  );
}

export default HomeLayout;
