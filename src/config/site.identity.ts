export const siteIdentity = {
  code: process.env.NEXT_PUBLIC_SITE_CODE || 'ahfah5zv78',
  name: process.env.NEXT_PUBLIC_SITE_NAME || 'Creativeguyink',
  tagline: process.env.NEXT_PUBLIC_SITE_TAGLINE || 'Social Profile platform',
  description:
    process.env.NEXT_PUBLIC_SITE_DESCRIPTION ||
    'A social profile platform for public identity, creator pages, and community discovery.',
  domain: process.env.NEXT_PUBLIC_SITE_DOMAIN || 'creativeguyink.com',
  url: process.env.NEXT_PUBLIC_SITE_URL || 'https://creativeguyink.com',
  ogImage: process.env.NEXT_PUBLIC_SITE_OG_IMAGE || '/og-default.png',
  googleMapsEmbedApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_EMBED_API_KEY || 'AIzaSyBco7dIECu3rJWjP3J0MImnR_uxlbeqAe0',

} as const

export const defaultAuthorProfile = {
  name: siteIdentity.name,
  avatar: '/placeholder.svg?height=80&width=80',
} as const

