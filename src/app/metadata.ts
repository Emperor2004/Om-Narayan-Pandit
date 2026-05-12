import { Metadata } from 'next';

export const siteMetadata: Metadata = {
  metadataBase: new URL('https://om-narayan-pandit.vercel.app'),
  title: {
    default: 'Om Narayan Pandit - AI/ML Engineer',
    template: '%s | Om Narayan Pandit'
  },
  description: 'B.Tech Computer Science student specializing in AI/ML, Deep Learning, and Reinforcement Learning. Explore my projects, research, and technical skills.',
  keywords: [
    'AI Engineer',
    'Machine Learning',
    'Deep Learning',
    'Reinforcement Learning',
    'Computer Vision',
    'NLP',
    'Python',
    'TensorFlow',
    'PyTorch',
    'Research',
    'Portfolio'
  ],
  authors: [{ name: 'Om Narayan Pandit' }],
  creator: 'Om Narayan Pandit',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://om-narayan-pandit.vercel.app',
    title: 'Om Narayan Pandit - AI/ML Engineer',
    description: 'B.Tech Computer Science student specializing in AI/ML, Deep Learning, and Reinforcement Learning.',
    siteName: 'Om Narayan Pandit Portfolio',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Om Narayan Pandit - AI/ML Engineer Portfolio'
      }
    ]
  },
  other: {
    'instagram': 'https://instagram.com/omnarayanpandit'
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1
    }
  },
  verification: {
    google: 'google-site-verification-code',
    yandex: 'yandex-verification-code'
  }
};

export function generatePageMetadata(
  title: string,
  description?: string,
  keywords?: string[]
): Metadata {
  return {
    title,
    description: description || (siteMetadata.description as string),
    keywords: keywords ? [...keywords, ...(siteMetadata.keywords as string[])] : siteMetadata.keywords,
    openGraph: {
      ...siteMetadata.openGraph,
      title,
      description: description || (siteMetadata.description as string)
    },
  };
}
