import { PropsWithChildren } from 'react';
import Header from './Header';
import Navigation from './Navigation';
import TopButton from '../icons/TopButton';

interface DefaultAppLayoutProps {
  showNavigation: boolean;
  showHeader: boolean;
  headerTitle?: string;
}

const DefaultAppLayout = ({
  children,
  showNavigation,
  showHeader,
  headerTitle
}: PropsWithChildren<DefaultAppLayoutProps>) => {
  return (
    <div className="flex flex-col min-h-screen">
      {showHeader && <Header headerTitle={headerTitle} />}
      <main className="flex-grow overflow-y-hidden">{children}</main>
        <TopButton />
      {showNavigation && <Navigation />}
    </div>
  );
};

export default DefaultAppLayout;
