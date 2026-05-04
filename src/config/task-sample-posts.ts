import type { SitePost } from '@/lib/site-connector'
import type { TaskKey } from '@/lib/site-config'

const svgUri = (svg: string) =>
  `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`

const profileVisual = (name: string, tone: string) =>
  svgUri(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 1200">
      <defs>
        <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stop-color="${tone}" />
          <stop offset="100%" stop-color="#f7f0f0" />
        </linearGradient>
      </defs>
      <rect width="1200" height="1200" fill="url(#g)" />
      <circle cx="600" cy="470" r="190" fill="#ffffff" opacity="0.55" />
      <circle cx="600" cy="470" r="120" fill="#4a2a34" opacity="0.16" />
      <path d="M340 980c42-170 157-255 260-255s218 85 260 255" fill="#ffffff" opacity="0.72" />
      <text x="600" y="1030" text-anchor="middle" font-family="Arial, sans-serif" font-size="64" font-weight="700" fill="#3d2130">${name}</text>
    </svg>
  `)

const imageVisual = (title: string, a: string, b: string) =>
  svgUri(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1600 1200">
      <defs>
        <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stop-color="${a}" />
          <stop offset="100%" stop-color="${b}" />
        </linearGradient>
        <linearGradient id="fade" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="#ffffff" stop-opacity="0" />
          <stop offset="100%" stop-color="#ffffff" stop-opacity="0.8" />
        </linearGradient>
      </defs>
      <rect width="1600" height="1200" fill="url(#bg)" />
      <circle cx="260" cy="260" r="180" fill="#fff" opacity="0.18" />
      <circle cx="1280" cy="260" r="220" fill="#fff" opacity="0.14" />
      <rect x="120" y="720" width="1360" height="360" fill="url(#fade)" />
      <path d="M0 820 C 220 700, 420 680, 650 780 S 1120 940, 1600 760 L 1600 1200 L 0 1200 Z" fill="#2b1420" opacity="0.16" />
      <text x="110" y="1080" font-family="Arial, sans-serif" font-size="76" font-weight="700" fill="#2f1d16">${title}</text>
    </svg>
  `)

export const samplePostsByTask: Partial<Record<TaskKey, SitePost[]>> = {
  profile: [
    {
      id: 'sample-profile-1',
      title: 'Aisha Khan',
      slug: 'aisha-khan',
      summary: 'Creative director with a public bio, portfolio highlights, and contact details.',
      content: {
        category: 'lifestyle',
        location: 'Mumbai, India',
        bio: 'Designing calm, curated experiences for modern teams.',
      },
      media: [{ url: profileVisual('AK', '#f2b6c5'), type: 'IMAGE' }],
      tags: ['creator', 'profile'],
      authorName: 'Creative Guy Ink',
      publishedAt: new Date().toISOString(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: 'sample-profile-2',
      title: 'Rohan Patel',
      slug: 'rohan-patel',
      summary: 'Photographer profile with a clean bio and visual-forward layout.',
      content: {
        category: 'photography',
        location: 'Ahmedabad, India',
        bio: 'Portraits, brand stories, and editorial visuals.',
      },
      media: [{ url: profileVisual('RP', '#d8c2a7'), type: 'IMAGE' }],
      tags: ['photographer', 'profile'],
      authorName: 'Creative Guy Ink',
      publishedAt: new Date().toISOString(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: 'sample-profile-3',
      title: 'Studio R&R',
      slug: 'studio-r-and-r',
      summary: 'Editorial collective profile for a small team or brand page.',
      content: {
        category: 'business',
        location: 'Delhi, India',
        bio: 'Editorial storytelling, brand direction, and visual systems.',
      },
      media: [{ url: profileVisual('RR', '#d7a3b0'), type: 'IMAGE' }],
      tags: ['studio', 'profile'],
      authorName: 'Creative Guy Ink',
      publishedAt: new Date().toISOString(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
  ],
  image: [
    {
      id: 'sample-image-1',
      title: 'Editorial Portrait Study',
      slug: 'editorial-portrait-study',
      summary: 'Warm light, soft shadows, and a strong focal point for a visual story.',
      content: {
        category: 'photography',
        images: [imageVisual('Editorial Portrait Study', '#f3d7c6', '#d5a3b3')],
      },
      media: [{ url: imageVisual('Editorial Portrait Study', '#f3d7c6', '#d5a3b3'), type: 'IMAGE' }],
      tags: ['portrait', 'visual'],
      authorName: 'Creative Guy Ink',
      publishedAt: new Date().toISOString(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: 'sample-image-2',
      title: 'Gallery Sequence',
      slug: 'gallery-sequence',
      summary: 'Three-frame visual set designed to read like a cohesive story.',
      content: {
        category: 'arts',
        images: [
          imageVisual('Gallery Sequence', '#e8dcbf', '#cf9ab3'),
          imageVisual('Gallery Sequence', '#d8c7df', '#f4d7a9'),
          imageVisual('Gallery Sequence', '#b8d4e8', '#f0c2cc'),
        ],
      },
      media: [{ url: imageVisual('Gallery Sequence', '#e8dcbf', '#cf9ab3'), type: 'IMAGE' }],
      tags: ['gallery', 'sequence'],
      authorName: 'Creative Guy Ink',
      publishedAt: new Date().toISOString(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: 'sample-image-3',
      title: 'Cover Frame',
      slug: 'cover-frame',
      summary: 'Bold hero image with enough room for a caption or title overlay.',
      content: {
        category: 'fashion',
        images: [imageVisual('Cover Frame', '#d3b4c0', '#f0e0bf')],
      },
      media: [{ url: imageVisual('Cover Frame', '#d3b4c0', '#f0e0bf'), type: 'IMAGE' }],
      tags: ['hero', 'cover'],
      authorName: 'Creative Guy Ink',
      publishedAt: new Date().toISOString(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: 'sample-image-4',
      title: 'Urban Architecture',
      slug: 'urban-architecture',
      summary: 'Geometric lines and modern structures captured in natural daylight.',
      content: {
        category: 'architecture',
        images: [imageVisual('Urban Architecture', '#c4d4e0', '#8fa3b5')],
      },
      media: [{ url: imageVisual('Urban Architecture', '#c4d4e0', '#8fa3b5'), type: 'IMAGE' }],
      tags: ['architecture', 'urban'],
      authorName: 'Creative Guy Ink',
      publishedAt: new Date().toISOString(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: 'sample-image-5',
      title: 'Nature Close-up',
      slug: 'nature-close-up',
      summary: 'Macro photography exploring textures and patterns in the natural world.',
      content: {
        category: 'nature',
        images: [imageVisual('Nature Close-up', '#d4e5c4', '#a8c686')],
      },
      media: [{ url: imageVisual('Nature Close-up', '#d4e5c4', '#a8c686'), type: 'IMAGE' }],
      tags: ['nature', 'macro'],
      authorName: 'Creative Guy Ink',
      publishedAt: new Date().toISOString(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: 'sample-image-6',
      title: 'Abstract Light Study',
      slug: 'abstract-light-study',
      summary: 'Playing with light, shadow, and color to create dynamic visual compositions.',
      content: {
        category: 'arts',
        images: [imageVisual('Abstract Light Study', '#f8e8a0', '#e8a898')],
      },
      media: [{ url: imageVisual('Abstract Light Study', '#f8e8a0', '#e8a898'), type: 'IMAGE' }],
      tags: ['abstract', 'light'],
      authorName: 'Creative Guy Ink',
      publishedAt: new Date().toISOString(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
  ],
}
