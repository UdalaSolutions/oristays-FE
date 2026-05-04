import { DM_Sans } from 'next/font/google';
import './globals.css';

const dmSans = DM_Sans({
	variable: '--font-dm-sans',
	subsets: ['latin'],
});

export const metadata = {
  title: 'Oristays | Book Apartments & Short Stays Easily',
  description:
    'Oristays is your go-to platform for booking apartments, short stays, and vacation homes with ease. Discover comfortable spaces, flexible stays, and seamless booking all in one place.',
  keywords: [
    'Oristays',
    'apartment booking',
    'short stay apartments',
    'vacation rentals',
    'Airbnb alternative',
    'rent apartments online',
    'holiday homes',
    'short term rentals'
  ],
  openGraph: {
    title: 'Oristays | Book Apartments & Short Stays Easily',
    description:
      'Find and book apartments, short stays, and vacation homes effortlessly with Oristays.',
    url: 'https://oristays.com',
    siteName: 'Oristays',
    images: [
      {
        url: '/images/ori-stays-logo.svg',
        width: 1200,
        height: 630,
        alt: 'Oristays booking platform',
      },
    ],
    type: 'website',
  },
};

export default function RootLayout({ children }) {
	return (
		<html
			lang='en'
			className={`${dmSans.variable} h-full antialiased`}>
			<body className='min-h-full flex flex-col'>{children}</body>
		</html>
	);
}
