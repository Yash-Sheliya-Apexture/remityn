// app/fonts.ts
import localFont from 'next/font/local';

// NOTES:
// - Paths are relative from this file's directory to the font files in `public/fonts/`.
// - If `app/fonts.ts` is the location, then paths to `public/fonts/` start with `../public/fonts/`.
// - `display: 'swap'` is crucial for performance, preventing text from being invisible while fonts load.
// - `variable` creates a CSS variable (e.g., var(--font-satoshi)) for easy use with Tailwind.

export const satoshi = localFont({
  src: [
    {
      path: '../../public/fonts/Satoshi-Variable.ttf',
      style: 'normal',
      // For variable fonts, weight can often be inferred or you can specify a range.
      // next/font handles variable fonts well.
    },
    {
      path: '../../public/fonts/Satoshi-VariableItalic.ttf',
      style: 'italic',
    },
  ],
  display: 'swap',
  variable: '--font-satoshi',
  weight: '300 900' // Define the available weight range for the variable font
});

export const montserrat = localFont({
  src: [
    { path: '../../public/fonts/Montserrat-Thin.ttf', weight: '100', style: 'normal' },
    { path: '../../public/fonts/Montserrat-ExtraLight.ttf', weight: '200', style: 'normal' },
    { path: '../../public/fonts/Montserrat-Light.ttf', weight: '300', style: 'normal' },
    { path: '../../public/fonts/Montserrat-Regular.ttf', weight: '400', style: 'normal' },
    { path: '../../public/fonts/Montserrat-Medium.ttf', weight: '500', style: 'normal' },
    { path: '../../public/fonts/Montserrat-SemiBold.ttf', weight: '600', style: 'normal' },
    { path: '../../public/fonts/Montserrat-Bold.ttf', weight: '700', style: 'normal' },
    { path: '../../public/fonts/Montserrat-ExtraBold.ttf', weight: '800', style: 'normal' },
    { path: '../../public/fonts/Montserrat-Black.ttf', weight: '900', style: 'normal' },
  ],
  display: 'swap',
  variable: '--font-montserrat',
});

export const outfit = localFont({
  src: [
    { path: '../../public/fonts/Outfit-Thin.ttf', weight: '100', style: 'normal' },
    { path: '../../public/fonts/Outfit-ExtraLight.ttf', weight: '200', style: 'normal' },
    { path: '../../public/fonts/Outfit-Light.ttf', weight: '300', style: 'normal' },
    { path: '../../public/fonts/Outfit-Regular.ttf', weight: '400', style: 'normal' },
    { path: '../../public/fonts/Outfit-Medium.ttf', weight: '500', style: 'normal' },
    { path: '../../public/fonts/Outfit-SemiBold.ttf', weight: '600', style: 'normal' },
    { path: '../../public/fonts/Outfit-Bold.ttf', weight: '700', style: 'normal' },
    { path: '../../public/fonts/Outfit-ExtraBold.ttf', weight: '800', style: 'normal' },
    { path: '../../public/fonts/Outfit-Black.ttf', weight: '900', style: 'normal' },
  ],
  display: 'swap',
  variable: '--font-outfit',
});

export const inter = localFont({
  src: [
    { path: '../../public/fonts/Inter_18pt-Thin.ttf', weight: '100', style: 'normal' },
    { path: '../../public/fonts/Inter_18pt-ExtraLight.ttf', weight: '200', style: 'normal' },
    { path: '../../public/fonts/Inter_18pt-Light.ttf', weight: '300', style: 'normal' },
    { path: '../../public/fonts/Inter_18pt-Regular.ttf', weight: '400', style: 'normal' },
    { path: '../../public/fonts/Inter_18pt-Medium.ttf', weight: '500', style: 'normal' },
    { path: '../../public/fonts/Inter_18pt-SemiBold.ttf', weight: '600', style: 'normal' },
    { path: '../../public/fonts/Inter_18pt-Bold.ttf', weight: '700', style: 'normal' },
    { path: '../../public/fonts/Inter_18pt-ExtraBold.ttf', weight: '800', style: 'normal' },
    { path: '../../public/fonts/Inter_18pt-Black.ttf', weight: '900', style: 'normal' },
  ],
  display: 'swap',
  variable: '--font-inter',
});