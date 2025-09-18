import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { WebVitals } from '@/components/custom/web-vitals';
import { Analytics } from "@vercel/analytics/next"
import { SpeedInsights } from "@vercel/speed-insights/next"

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Pokédex - Antonio Silva',
  description: 'Uma Pokédex moderna e interativa construída com Next.js, TypeScript e Tailwind CSS. Explore todos os Pokémon com design responsivo, busca avançada e funcionalidades completas.',
  keywords: 'pokemon, pokedex, pokemon stats, pokemon types, pokemon search, nextjs, typescript, tailwind, react, acessibilidade',
  authors: [{ name: 'Antonio Silva', url: 'https://www.linkedin.com/in/tony-silva/' }],
  openGraph: {
    title: 'Pokédex - Antonio Silva',
    description: 'Uma Pokédex moderna e interativa com busca avançada e informações detalhadas sobre todos os Pokémon',
    type: 'website',
    locale: 'pt_BR',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Pokédex - Antonio Silva',
    description: 'Uma Pokédex moderna e interativa com busca avançada e informações detalhadas sobre todos os Pokémon',
  },
  manifest: '/manifest.json',
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#ef5350',
};


export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <meta name="theme-color" content="#ef5350" />
      </head>
      <body className={inter.className}>
        <WebVitals />
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50" role="application" aria-label="Pokédex Application">
          {children}
        </div>
        <SpeedInsights />
        <Analytics />
      </body>
    </html>
  );
}
