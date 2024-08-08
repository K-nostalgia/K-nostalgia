'use client';

import DefaultAppLayout from '@/components/common/DefaultAppLayout';
import { PropsWithChildren, useEffect, useState } from 'react';
import Cookies from 'js-cookie';

function LogInLayout({ children }: PropsWithChildren) {
  const [isGuest, setIsGuest] = useState<boolean>(false);

  useEffect(() => {
    const guestCookie = Cookies.get('guest');
    if (guestCookie === 'true') {
      setIsGuest(true);
    }
  }, []);

  return (
    <DefaultAppLayout
      showHeader={isGuest}
      showNavigation={isGuest}
      headerTitle={isGuest ? '로그인' : ''}
    >
      {children}
    </DefaultAppLayout>
  );
}

export default LogInLayout;