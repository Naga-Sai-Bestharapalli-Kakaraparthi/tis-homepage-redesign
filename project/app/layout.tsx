import './globals.css';
import type { Metadata } from 'next';
import { Playfair_Display, Inter } from 'next/font/google';
import { ThemeProvider } from '@/components/ThemeProvider';

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
});

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://tulasinternationalschool.com'),
  title: 'Tulas International School | Best CBSE Boarding School in Dehradun',
  description:
    'Top-ranked CBSE Co-Ed Boarding School in Dehradun. 22-acre eco-friendly campus, 16+ Olympic sports, 6:1 student-teacher ratio. Empowering global leaders.',
  keywords: [
    'best boarding school Dehradun',
    'CBSE co-ed boarding school',
    'Tulas International School',
    'TIS Dehradun',
    'Olympic sports school',
    'boarding school Uttarakhand',
  ],
  openGraph: {
    title: 'Tulas International School | Best CBSE Boarding School in Dehradun',
    description:
      'Top-ranked CBSE Co-Ed Boarding School in Dehradun combining academic excellence, 16+ Olympic sports, and holistic development.',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${playfair.variable} ${inter.variable} font-sans antialiased`}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
