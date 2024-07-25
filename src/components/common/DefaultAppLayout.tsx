import { PropsWithChildren } from 'react';
import Header from './Header';
import Navigation from './Navigation';
import TopButton from '../icons/TopButton';

interface DefaultAppLayoutProps {
  showNavigation: boolean;
  showHeader: boolean;
  headerTitle?: string;
  showTopButton?: boolean;
  showBackButton?: boolean;
  showLogo?: boolean;
  showSearch?: boolean;
  showCart?: boolean;
}

const DefaultAppLayout = ({
  children,
  showNavigation,
  showHeader,
  headerTitle,
  showTopButton,
  showBackButton = true,
  showLogo = false,
  showSearch = true,
  showCart = true
}: PropsWithChildren<DefaultAppLayoutProps>) => {
  return (
    <div className="flex flex-col min-h-screen">
      {showHeader && (
        <Header
          headerTitle={headerTitle}
          showBackButton={showBackButton}
          showLogo={showLogo}
          showSearch={showSearch}
          showCart={showCart}
        />
      )}
      <main className="flex-grow overflow-y-hidden mt-[3.25rem]">
        {children}
      </main>
      {showTopButton && <TopButton />}
      {showNavigation && <Navigation />}
    </div>
  );
};

export default DefaultAppLayout;
