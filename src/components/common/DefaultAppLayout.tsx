import { PropsWithChildren } from 'react';
import Header from './Header';
import Navigation from './Navigation';
import { Chat } from '../chat/Chat';

interface DefaultAppLayoutProps {
  showNavigation: boolean;
  showHeader: boolean;
  headerTitle?: string;
  shwoChat?: boolean;
}

const DefaultAppLayout = ({
  children,
  showNavigation,
  showHeader,
  headerTitle,
  shwoChat
}: PropsWithChildren<DefaultAppLayoutProps>) => {
  return (
    <div className="flex flex-col min-h-screen">
      {showHeader && <Header headerTitle={headerTitle} />}
      <main className="flex-grow overflow-y-hidden">{children}</main>
      {shwoChat && <Chat />}
      {showNavigation && <Navigation />}
    </div>
  );
};

export default DefaultAppLayout;
