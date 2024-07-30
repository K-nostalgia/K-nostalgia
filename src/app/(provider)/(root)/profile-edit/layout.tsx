import DefaultAppLayout from '@/components/common/DefaultAppLayout';
import { PropsWithChildren } from 'react';

function LocalFoodLayout({ children }: PropsWithChildren) {
  return (
    <DefaultAppLayout
      showHeader={true}
      showNavigation={true}
      headerTitle="프로필 수정"
    >
      {children}
    </DefaultAppLayout>
  );
}

export default LocalFoodLayout;
