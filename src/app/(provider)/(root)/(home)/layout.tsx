'use client';

import DefaultAppLayout from '@/components/common/DefaultAppLayout';
import DefaultWebLayout from '@/components/common/DefaultWebLayout';
import Loading from '@/components/common/Loading';
import useDeviceSize from '@/hooks/useDeviceSize';

import { PropsWithChildren, useState, useEffect } from 'react';

function HomeLayout({ children }: PropsWithChildren) {
  const { isDesktop } = useDeviceSize();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  // TODO 로딩 컴포넌트 바꿀 것
  if (!isClient) {
    return <Loading />;
  }

  return isDesktop ? (
    <DefaultWebLayout>{children}</DefaultWebLayout>
  ) : (
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
