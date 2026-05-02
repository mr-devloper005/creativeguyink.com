import type { TaskKey } from '@/lib/site-config'

export const siteContent = {
  navbar: {},
  footer: {
    tagline: 'Discover profiles and connect',
  },
  hero: {
    badge: 'Social profiles',
    title: ['Where people', 'connect and share.'],
    description:
      'Discover amazing people, explore profiles, and connect with a vibrant community through our social platform.',
    primaryCta: {
      label: 'Explore profiles',
      href: '/profile',
    },
    secondaryCta: {
      label: 'Join community',
      href: '/register',
    },
    searchPlaceholder: 'Search profiles, people, and connections',
    focusLabel: 'Discover',
    featureCardBadge: 'featured profiles',
    featureCardTitle: 'Top profiles shape our community.',
    featureCardDescription:
      'Featured members and active creators stay at the center of the experience, making connections easy and meaningful.',
  },
  home: {
    metadata: {
      title: 'Social profiles and community connections',
      description:
        'Discover people, connect with friends, and explore profiles through our social platform.',
      openGraphTitle: 'Social profiles and community connections',
      openGraphDescription:
        'Connect with people, discover profiles, and build meaningful relationships through our social platform.',
      keywords: ['social platform', 'profile discovery', 'community', 'connect people'],
    },
    introBadge: 'About our community',
    introTitle: 'Built for connection, discovery, and meaningful relationships.',
    introParagraphs: [
      'This platform brings people together through profile discovery, social connections, and community engagement.',
      'Instead of separating content and interactions, we keep everything connected in one place with consistent social features.',
      'Whether you\'re discovering new people, connecting with friends, or exploring communities, you can build meaningful relationships without friction.',
    ],
    sideBadge: 'Why join us',
    sidePoints: [
      'Profile-first homepage with emphasis on people and connections.',
      'Social features for profiles, messaging, and community interaction.',
      'Cleaner social experience designed to make connections feel natural.',
      'Lightweight interactions that keep the experience fast and engaging.',
    ],
    primaryLink: {
      label: 'Browse profiles',
      href: '/profile',
    },
    secondaryLink: {
      label: 'Join now',
      href: '/register',
    },
  },
  cta: {
    badge: 'Join our community',
    title: 'Connect with people and discover amazing profiles.',
    description:
      'Build meaningful relationships, discover new connections, and engage with our vibrant social community.',
    primaryCta: {
      label: 'Join Now',
      href: '/register',
    },
    secondaryCta: {
      label: '',
      href: '/profile',
    },
  },
  taskSectionHeading: 'Latest {label}',
  taskSectionDescriptionSuffix: 'Browse the newest posts in this section.',
} as const

export const taskPageMetadata: Record<Exclude<TaskKey, 'comment' | 'org' | 'social'>, { title: string; description: string }> = {
  article: {
    title: 'Articles and stories',
    description: 'Read articles, stories, guides, and long-form posts across topics and interests.',
  },
  listing: {
    title: 'Listings and discoverable pages',
    description: 'Explore listings, services, brands, and structured pages organized for easier browsing.',
  },
  classified: {
    title: 'Classifieds and announcements',
    description: 'Browse classifieds, offers, notices, and time-sensitive posts across categories.',
  },
  image: {
    title: 'Images and visual posts',
    description: 'Explore image-led posts, galleries, and visual stories from across the platform.',
  },
  profile: {
    title: 'People and social profiles',
    description: 'Connect with people, discover social profiles, and build meaningful relationships in our community.',
  },
  sbm: {
    title: 'Curated links and saved resources',
    description: 'Browse useful links, saved references, and curated resources organized for discovery.',
  },
  pdf: {
    title: 'PDFs and downloadable resources',
    description: 'Open reports, documents, and downloadable resources shared across the platform.',
  },
}

export const taskIntroCopy: Record<
  TaskKey,
  {
    title: string
    paragraphs: string[]
    links?: { label: string; href: string }[]
    samples?: { eyebrow: string; title: string; description: string }[]
  }
> = {
  listing: {
    title: 'Listings, services, and structured pages',
    paragraphs: [
      'Explore listings, services, brands, and discoverable pages across categories. Each entry is organized to make browsing clearer and help visitors quickly understand what a post offers.',
      'Listings connect naturally with articles, images, resources, and other content types so supporting information stays easy to reach from the same platform.',
      'Browse by category to compare posts in context, discover related content, and move between formats without losing your place.',
    ],
    samples: [
      {
        eyebrow: 'Local business',
        title: 'Studio storefront with services, hours, and a clear call to action.',
        description: 'Good for listings that need practical details and a sharper conversion path.',
      },
      {
        eyebrow: 'Service page',
        title: 'Simple listing for consultants, teams, and appointment-based offerings.',
        description: 'Keeps the page structured while still leaving room for personality and trust signals.',
      },
      {
        eyebrow: 'Featured entry',
        title: 'A polished card that can sit beside articles, photos, or related offers.',
        description: 'Works well when a listing needs to be discoverable without feeling noisy.',
      },
    ],
  },
  article: {
    title: 'Articles, stories, and long-form reading',
    paragraphs: [
      'This section is built for stories, explainers, guides, and long-form reading across topics and interests.',
      'Articles connect with listings, images, resources, and other content types so deeper reading can lead naturally into related discovery.',
      'Use this section to browse thoughtful posts, revisit useful writing, and move into supporting content when you want more context.',
    ],
    samples: [
      {
        eyebrow: 'Feature article',
        title: 'A calm, long-form story with room for argument and context.',
        description: 'Useful when the reading experience should slow down and feel more editorial.',
      },
      {
        eyebrow: 'Guide',
        title: 'Practical explainer with steps, references, and a clear structure.',
        description: 'Works well for how-tos, explainers, and knowledge-base style content.',
      },
      {
        eyebrow: 'Interview',
        title: 'Conversation-led post that pairs well with related profiles and images.',
        description: 'A stronger fit when the article needs a human voice and supporting visuals.',
      },
    ],
  },
  classified: {
    title: 'Classifieds, offers, and timely updates',
    paragraphs: [
      'Classified posts help surface offers, notices, deals, and time-sensitive opportunities in a faster-scanning format.',
      'They work well alongside articles, listings, and profiles, making it easier to connect short-term posts with more structured content.',
      'Browse by category to find announcements quickly, then continue into related sections when you need more detail.',
    ],
    samples: [
      {
        eyebrow: 'Announcement',
        title: 'Time-sensitive update with a clean headline and quick scan value.',
        description: 'Best when the post needs urgency without becoming visually cluttered.',
      },
      {
        eyebrow: 'Offer',
        title: 'Simple promotion that highlights the important detail first.',
        description: 'Helps readers act quickly while still staying connected to the rest of the platform.',
      },
      {
        eyebrow: 'Notice',
        title: 'Short, practical notice for a community, event, or opportunity.',
        description: 'Ideal for posts that need to be found fast and understood even faster.',
      },
    ],
  },
  image: {
    title: 'Image-led posts and visual stories',
    paragraphs: [
      'Images take the lead in this section through galleries, visual posts, and story-led content where imagery carries the experience.',
      'These posts connect with articles, listings, and other sections so visuals can act as entry points into deeper content.',
      'Browse the latest visual updates, then continue into related stories or supporting pages for more context.',
    ],
    samples: [
      {
        eyebrow: 'Feature story',
        title: 'Portrait session with warm, editorial lighting.',
        description: 'A balanced image set that feels polished enough for a profile header or showcase card.',
      },
      {
        eyebrow: 'Gallery set',
        title: 'Three-image sequence for a richer visual narrative.',
        description: 'Use a mixed crop layout when the story needs a little more movement and pacing.',
      },
      {
        eyebrow: 'Cover image',
        title: 'Bold hero frame with a strong focal point.',
        description: 'Great for first impressions when the image needs to carry the whole page at a glance.',
      },
    ],
  },
  profile: {
    title: 'People, public bios, and profile pages',
    paragraphs: [
      'Each profile is a concise public page: photo, headline, and supporting context so visitors can understand someone at a glance.',
      'Profiles stay linked to the rest of the platform, so you can move from a person into images, articles, or saved resources when you need more depth.',
      'Use this directory to scan faces and names quickly, then open a profile when you want the full story.',
    ],
    samples: [
      {
        eyebrow: 'Creator profile',
        title: 'Aisha Khan, creative director',
        description: 'Public bio, featured work, and contact cues in one calm profile surface.',
      },
      {
        eyebrow: 'Community voice',
        title: 'Rohan Patel, photographer',
        description: 'A simple identity card that helps visitors scan people quickly and confidently.',
      },
      {
        eyebrow: 'Team page',
        title: 'Studio R&R, editorial collective',
        description: 'Useful when a profile needs to represent a person, brand, or small team together.',
      },
    ],
  },
  sbm: {
    title: 'Curated links and bookmarked resources',
    paragraphs: [
      'This section collects useful links, references, tools, and saved resources in a text-first browsing format.',
      'Bookmarks stay connected to the rest of the platform, making it easier to move from a saved link into related stories, listings, or resources.',
      'Use this section to organize helpful sources and discover connected content without leaving the broader site experience.',
    ],
    samples: [
      {
        eyebrow: 'Saved link',
        title: 'Reference page with tags, context, and a short note.',
        description: 'Helpful for keeping one useful source easy to revisit later.',
      },
      {
        eyebrow: 'Curated board',
        title: 'A tighter collection of links grouped by theme or project.',
        description: 'Works when the page should feel like a shelf instead of a feed.',
      },
      {
        eyebrow: 'Research note',
        title: 'A bookmark with enough context to explain why it matters.',
        description: 'Good for teams and creators who organize sources around ongoing work.',
      },
    ],
  },
  pdf: {
    title: 'PDFs, documents, and downloadable files',
    paragraphs: [
      'The PDF library hosts reports, guides, downloadable files, and longer-form document resources that support reading and discovery.',
      'These resources work alongside stories, listings, and profiles, helping document-style content stay connected to the rest of the platform.',
      'Browse by category to find relevant files quickly, then continue into related sections when you want more context.',
    ],
    samples: [
      {
        eyebrow: 'Report',
        title: 'A structured PDF with chapters, charts, and takeaways.',
        description: 'Works well when a document should feel substantial and credible.',
      },
      {
        eyebrow: 'Download',
        title: 'Practical resource sheet with one clear purpose and format.',
        description: 'Best for guides, handouts, checklists, and simple reference files.',
      },
      {
        eyebrow: 'Reference',
        title: 'Supporting document that connects back into profiles and articles.',
        description: 'Helps the library feel connected instead of isolated from the rest of the site.',
      },
    ],
  },
  social: {
    title: 'Short updates and community signals',
    paragraphs: [
      'Short updates add quick signals that keep activity flowing across the platform.',
      'They work well with stories, listings, and resources by helping visitors move from brief updates into deeper content.',
      'Use these posts as lightweight entry points into the broader site experience.',
    ],
    samples: [
      {
        eyebrow: 'Status update',
        title: 'Quick note about a launch, event, or new post.',
        description: 'Keeps the update stream light while still feeling useful.',
      },
      {
        eyebrow: 'Community signal',
        title: 'Short post that nudges people toward a related profile or article.',
        description: 'Good for quick engagement without forcing a big content block.',
      },
      {
        eyebrow: 'Micro announcement',
        title: 'A tiny message with enough structure to scan cleanly.',
        description: 'Useful when the goal is awareness rather than depth.',
      },
    ],
  },
  comment: {
    title: 'Comments and contextual responses',
    paragraphs: [
      'Comments surface responses connected directly to articles and help keep discussion close to the writing it belongs to.',
      'This layer adds perspective and reaction without needing a separate standalone content format.',
      'Use comments as supporting context beneath stories, then continue exploring related content from the same topic area.',
    ],
    samples: [
      {
        eyebrow: 'Reader reply',
        title: 'A thoughtful response with enough context to be meaningful.',
        description: 'Keeps the conversation close to the original post while adding value.',
      },
      {
        eyebrow: 'Follow-up',
        title: 'Short contextual note that extends the article without hijacking it.',
        description: 'Useful when the reply should support the thread, not replace it.',
      },
      {
        eyebrow: 'Discussion',
        title: 'A compact comment cluster that highlights the best responses.',
        description: 'Helps the page feel active without turning into a noisy forum.',
      },
    ],
  },
  org: {
    title: 'Organizations, teams, and structured entities',
    paragraphs: [
      'Organization pages provide structured identity surfaces for teams, brands, communities, and agencies.',
      'Used with listings, stories, profiles, and resources, they help create stronger structure across the platform.',
      'Connect organization pages with related content to build a clearer and more unified site presence.',
    ],
    samples: [
      {
        eyebrow: 'Brand page',
        title: 'Company profile with team details, mission, and trust cues.',
        description: 'Useful for organizations that need a public identity surface.',
      },
      {
        eyebrow: 'Agency',
        title: 'A structured page that groups services, work, and contact paths.',
        description: 'Helps larger teams look polished and easy to understand.',
      },
      {
        eyebrow: 'Community org',
        title: 'Nonprofit or group page with a clearer organization-first layout.',
        description: 'Best when the page has multiple related links and responsibilities.',
      },
    ],
  },
}
