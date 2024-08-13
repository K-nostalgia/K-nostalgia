import React, { PropsWithChildren } from 'react';
import WebHeader from './header/WebHeader';
import Footer from './Footer';

const DefaultWebLayout = ({ children }: PropsWithChildren<{}>) => {
  return (
    <div className="min-h-screen">
      <WebHeader />
      <main className="mx-auto mt-[72px]">{children}</main>
      <Footer />
    </div>
  );
};

export default DefaultWebLayout;
