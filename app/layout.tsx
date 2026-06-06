import type {Metadata} from 'next';
import { Inter, Instrument_Serif } from 'next/font/google';
import './globals.css'; // Global styles

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const instrumentSerif = Instrument_Serif({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-instrument-serif',
  display: 'swap',
});

import { AppStateProvider } from '@/components/AppStateContext';

export const metadata: Metadata = {
  title: 'Wiscode',
  description: 'Wiscode Studio Platform',
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="en" className={`${inter.variable} ${instrumentSerif.variable}`}>
      <body suppressHydrationWarning>
        <AppStateProvider>
          {children}
        </AppStateProvider>
      </body>
    </html>
  );
}
