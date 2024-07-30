import { PropsWithChildren } from 'react';
import Header from './Header';
import Navigation from './Navigation';
import { Chat } from '../chat/Chat';
import TopButton from '../icons/TopButton';

interface DefaultAppLayoutProps {
  showNavigation: boolean;
  showHeader: boolean;
  headerTitle?: string;
  showChat?: boolean;
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
  showChat = true,
  showTopButton = false,
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
      <div className="flex flex-col fixed bottom-[97px] right-3 z-50">
        {showChat && <Chat />}
        {showTopButton && <TopButton />}
      </div>
      {showNavigation && <Navigation />}
    </div>
  );
};

export default DefaultAppLayout;
