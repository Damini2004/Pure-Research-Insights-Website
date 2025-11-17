import type {Metadata} from 'next';
import { Toaster } from "@/components/ui/toaster"
import './globals.css';

export const metadata: Metadata = {
  title: {
    default: 'Pure Research Insights',
    template: '%s | Pure Research Insights',
  },
  description: 'The leading platform for academic journal submissions, conference management, and publication support.',
  keywords: ['academic publishing', 'research journals', 'scientific conferences', 'manuscript submission', 'peer review', 'journal publication', 'research publication', 'scientific research papers'],
  manifest: '/site.webmanifest',
  themeColor: '#3F51B5',
  openGraph: {
    title: 'Pure Research Insights',
    description: 'The leading platform for academic journal submissions and management.',
    type: 'website',
    locale: 'en_US',
    url: 'https://www.pureresearchinsights.com', 
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/favicon-32x32.png" type="image/png" sizes="32x32" />
        <link rel="icon" href="/favicon-16x16.png" type="image/png" sizes="16x16" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700;800&display=swap" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css2?family=PT+Sans:wght@400;700&display=swap" rel="stylesheet" />
      </head>
      <body className="font-body antialiased">
        {children}
        <Toaster />
      </body>
    </html>
  );
}
