import { PropsWithChildren } from 'react';
import Header from './Header';
import Navigation from './Navigation';
import TopButton from '../icons/TopButton';

interface DefaultAppLayoutProps {
  showNavigation: boolean;
  showHeader: boolean;
  headerTitle?: string;
  showTopButton?: boolean;
}

const DefaultAppLayout = ({
  children,
  showNavigation,
  showHeader,
  headerTitle,
  showTopButton
}: PropsWithChildren<DefaultAppLayoutProps>) => {
  return (
    <div className="flex flex-col min-h-screen">
      {showHeader && <Header headerTitle={headerTitle} />}
      <main className="flex-grow overflow-y-hidden">{children}</main>
      {showTopButton && <TopButton />}
      {showNavigation && <Navigation />}
    </div>
  );
};

export default DefaultAppLayout;
