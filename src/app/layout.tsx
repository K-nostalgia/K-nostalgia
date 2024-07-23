import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Providers from './Providers';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: '향그리움',
  description:
    '전통이 있는, 그리운 곳으로 향하다(向). 향그리움에서 전국 각지에 위치한 시장 그리고 각 업체에서 올린 특산물을 확인해보세요.'
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className} style={{ background: '#FAF8F5' }}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
