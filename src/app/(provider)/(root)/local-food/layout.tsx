'use client';

import DefaultAppLayout from '@/components/common/DefaultAppLayout';
import DefaultWebLayout from '@/components/common/DefaultWebLayout';
import Loading from '@/components/common/Loading';
import useDeviceSize from '@/hooks/useDeviceSize';
import { usePathname } from 'next/navigation';
import { PropsWithChildren, useEffect, useState } from 'react';

function LocalFoodLayout({ children }: PropsWithChildren) {
  // TODO 조건부 TODO use client 쓰는 방법밖에 없는지 한 번 더 생각해보기
  const pathLocalName: string = usePathname();
  const showLocalFoodLayout =
    pathLocalName === '/local-food' ||
    !pathLocalName.startsWith('/local-food/');

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
      showHeader={true}
      showNavigation={showLocalFoodLayout}
      showBackButton={!showLocalFoodLayout}
      showTopButton={!showLocalFoodLayout}
      headerTitle={showLocalFoodLayout ? '특산물' : ''}
    >
      {children}
    </DefaultAppLayout>
  );
}

export default LocalFoodLayout;
