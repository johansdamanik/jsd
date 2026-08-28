export const SITE_CONFIG = {
  domain: 'https://simeon.id',
  language: 'en-US',
  identity: {
    name: 'Johan Simeon Damanik',
    givenName: 'Johan Simeon',
    familyName: 'Damanik',
  },
  role: 'Full-Stack Developer',
  location: {
    city: 'Jakarta',
    region: 'Jakarta',
    country: 'Indonesia',
    countryCode: 'ID',
    label: 'Jakarta, Indonesia',
  },
  description: 'Full-Stack Developer skilled in Vue/Nuxt, React/Next, Node/NestJS, and Laravel. Specializes in building scalable ERPs, POS systems, payment gateways, and business-critical APIs.',
  contact: {
    email: 'johansdamanik@gmail.com',
    phone: '+62 812 2223 4454',
    whatsappUrl: 'https://wa.me/6281222234454',
  },
  employment: {
    organization: 'PT Kartel Daun International',
    role: 'Full-Stack Developer',
  },
  resume: {
    path: '/cv-johan-simeon-damanik.pdf',
  },
  profileImage: {
    path: '/images/simeon-char.webp',
    width: 800,
    height: 800,
    alt: 'Johan Simeon Damanik building web applications',
  },
  social: {
    github: 'https://github.com/johansdamanik',
  },
  seo: {
    homeTitle: 'Johan Simeon Damanik | Full-Stack Developer',
    homeDescription: 'Full-Stack Developer in Jakarta building scalable web products, ERP/POS systems, business platforms, and automation tools with modern JavaScript and backend technologies.',
    ogImagePath: '/og-image.png',
    ogImageWidth: 1200,
    ogImageHeight: 630,
    lastModified: '2026-08-28',
  },
} as const;
