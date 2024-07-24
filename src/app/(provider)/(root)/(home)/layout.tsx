import DefaultAppLayout from '@/components/common/DefaultAppLayout';
import { PropsWithChildren } from 'react';

function HomeLayout({ children }: PropsWithChildren) {
  return (
    <DefaultAppLayout
      showNavigation={true}
      showHeader={true}
      showTopButton={true}
    >
      {children}
    </DefaultAppLayout>
  );
}

export default HomeLayout;
