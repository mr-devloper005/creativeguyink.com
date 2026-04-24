import { defineSiteTheme } from '@/config/site.theme.defaults'

export const SITE_THEME = defineSiteTheme({
  shell: 'studio',
  hero: {
    variant: 'spotlight-split',
    eyebrow: 'Public profiles & visual stories',
  },
  home: {
    layout: 'studio-showcase',
    primaryTask: 'profile',
    featuredTaskKeys: ['profile', 'image'],
  },
  navigation: {
    variant: 'capsule',
  },
  footer: {
    variant: 'dense',
  },
  cards: {
    listing: 'catalog-grid',
    article: 'editorial-feature',
    image: 'catalog-grid',
    profile: 'listing-elevated',
    classified: 'catalog-grid',
    pdf: 'editorial-feature',
    sbm: 'editorial-feature',
    social: 'listing-elevated',
    org: 'listing-elevated',
    comment: 'editorial-feature',
  },
})
