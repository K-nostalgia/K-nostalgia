'use client';

import { PropsWithChildren } from 'react';
import CustomerHeader from './_components/CustomerHeader';

function CustomerPageLayout({ children }: PropsWithChildren) {
  return (
    <div>
      <CustomerHeader />
      <main>{children}</main>
    </div>
  );
}

export default CustomerPageLayout;
