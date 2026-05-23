import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import '@/styles/globals.scss';

const inter = Inter({
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Check KM',
  description: 'Gestão inteligente de veículos',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className={inter.className}>
      <body>
        {children}
      </body>
    </html>
  );
}
