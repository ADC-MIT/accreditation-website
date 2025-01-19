import {
  IBM_Plex_Serif as FontHeading,
  JetBrains_Mono as FontMono,
  Inter as FontSans,
} from 'next/font/google';

export const fontHeading = FontHeading({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-heading',
});

export const fontSans = FontSans({
  subsets: ['latin'],
  variable: '--font-sans',
});

export const fontMono = FontMono({
  subsets: ['latin'],
  variable: '--font-mono',
});
