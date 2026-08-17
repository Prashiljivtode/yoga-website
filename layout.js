import { Poppins, Playfair_Display } from 'next/font/google'
import './globals.css'
import { Toaster } from 'sonner'

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-poppins',
  display: 'swap',
})

const playfair = Playfair_Display({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-playfair',
  display: 'swap',
})

export const metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_BASE_URL || 'https://shashwatholistic.com'),
  title: {
    default: 'Shashwat Holistic Health Mumbai | Natural Healing Therapy in Borivali',
    template: '%s | Shashwat Holistic Health Mumbai',
  },
  description:
    'Shashwat Holistic Health Mumbai offers drug-free acupressure, reflexology, massage, yoga, and naturopathy therapies in Borivali West. Home visits available across Mumbai. Book with therapist Jawahar Singh Shakya.',
  keywords: [
    'Acupressure therapy Mumbai', 'Holistic health Borivali', 'Reflexology Mumbai',
    'Naturopathy Mumbai', 'Home visit therapist Mumbai', 'Drug-free pain relief',
    'Jawahar Singh Shakya', 'Shashwat Holistic Health', 'Yoga therapy Borivali',
    'Back pain treatment Mumbai', 'Stress relief therapy', 'Cupping therapy Mumbai',
  ],
  authors: [{ name: 'Jawahar Singh Shakya' }],
  creator: 'Shashwat Holistic Health Mumbai',
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: '/',
    title: 'Shashwat Holistic Health Mumbai | Natural Healing for Body, Mind & Energy',
    description:
      'Drug-free holistic therapies for pain relief, stress management and overall wellness. Home visits across Mumbai.',
    siteName: 'Shashwat Holistic Health Mumbai',
    images: [
      {
        url: 'https://images.pexels.com/photos/3059892/pexels-photo-3059892.jpeg',
        width: 1200,
        height: 630,
        alt: 'Shashwat Holistic Health Mumbai',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Shashwat Holistic Health Mumbai',
    description: 'Heal Naturally • Live Happily • Stay Healthy',
    images: ['https://images.pexels.com/photos/3059892/pexels-photo-3059892.jpeg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large' },
  },
  alternates: { canonical: '/' },
  icons: { icon: '/favicon.ico' },
}

export const viewport = {
  themeColor: '#1B5E20',
  width: 'device-width',
  initialScale: 1,
}

const localBusinessJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'MedicalBusiness',
  '@id': 'https://shashwatholistic.com/#business',
  name: 'Shashwat Holistic Health Mumbai',
  image: 'https://images.pexels.com/photos/3059892/pexels-photo-3059892.jpeg',
  description:
    'Holistic wellness center offering drug-free therapies including acupressure, reflexology, massage, yoga, chiro, cupping and naturopathy in Borivali West Mumbai.',
  telephone: '+91-8851317276',
  email: 'shashwatholistichealth@gmail.com',
  priceRange: '₹₹',
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Borivali West',
    addressLocality: 'Mumbai',
    addressRegion: 'Maharashtra',
    postalCode: '400092',
    addressCountry: 'IN',
  },
  geo: { '@type': 'GeoCoordinates', latitude: 19.2288, longitude: 72.8567 },
  areaServed: { '@type': 'City', name: 'Mumbai' },
  openingHoursSpecification: [
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
      opens: '09:00',
      closes: '20:00',
    },
  ],
  founder: { '@type': 'Person', name: 'Jawahar Singh Shakya' },
  sameAs: [
    'https://www.instagram.com/shashwatholistichealth',
    'https://www.facebook.com/shashwatholistichealth',
  ],
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${poppins.variable} ${playfair.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessJsonLd) }}
        />
      </head>
      <body className="font-sans antialiased bg-background text-foreground">
        {children}
        <Toaster position="top-center" richColors closeButton />
      </body>
    </html>
  )
}
