import { ContentImage } from '@/components/shared/content-image'
import Link from 'next/link'
import { ArrowUpRight, ExternalLink, FileText, Mail, MapPin, Tag } from 'lucide-react'
import type { SitePost } from '@/lib/site-connector'
import { CATEGORY_OPTIONS, normalizeCategory } from '@/lib/categories'
import type { TaskKey } from '@/lib/site-config'
import { SITE_THEME } from '@/config/site.theme'
import { getFactoryState } from '@/design/factory/get-factory-state'
import { TASK_POST_CARD_OVERRIDE_ENABLED, TaskPostCardOverride } from '@/overrides/task-post-card'

type ListingContent = {
  location?: string
  category?: string
  description?: string
  email?: string
}

const stripHtml = (value?: string | null) =>
  (value || '')
    .replace(/<style[^>]*>[\s\S]*?<\/style>/gi, ' ')
    .replace(/<script[^>]*>[\s\S]*?<\/script>/gi, ' ')
    .replace(/<\/?[^>]+>/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()

const getExcerpt = (value?: string | null, maxLength = 140) => {
  const text = stripHtml(value)
  if (!text) return ''
  if (text.length <= maxLength) return text
  return `${text.slice(0, maxLength).trimEnd()}…`
}

const getContent = (post: SitePost): ListingContent => {
  const content = post.content && typeof post.content === 'object' ? post.content : {}
  return content as ListingContent
}

const getImageUrl = (post: SitePost, content: ListingContent) => {
  const media = Array.isArray(post.media) ? post.media : []
  const mediaUrl = media[0]?.url
  if (mediaUrl) return mediaUrl

  const contentAny = content as Record<string, unknown>
  const contentImage = typeof contentAny.image === 'string' ? contentAny.image : null
  if (contentImage) return contentImage

  const contentImages = Array.isArray(contentAny.images) ? contentAny.images : []
  const firstImage = contentImages.find((value) => typeof value === 'string')
  if (firstImage) return firstImage as string

  const contentLogo = typeof contentAny.logo === 'string' ? contentAny.logo : null
  if (contentLogo) return contentLogo

  return '/placeholder.svg?height=640&width=960'
}

const cardStyles = {
  'listing-elevated': {
    frame: 'rounded-[1.9rem] border border-border bg-card shadow-[0_20px_60px_rgba(189,17,74,0.08)] hover:-translate-y-1 hover:shadow-[0_28px_75px_rgba(189,17,74,0.14)]',
    muted: 'text-muted-foreground',
    title: 'text-foreground',
    badge: 'bg-primary text-primary-foreground',
  },
  'editorial-feature': {
    frame: 'rounded-[1.8rem] border border-border bg-secondary/20 shadow-[0_18px_55px_rgba(215,86,86,0.1)] hover:-translate-y-1 hover:shadow-[0_26px_75px_rgba(215,86,86,0.14)]',
    muted: 'text-muted-foreground',
    title: 'text-foreground',
    badge: 'bg-accent text-accent-foreground',
  },
  'studio-panel': {
    frame: 'rounded-[1.9rem] border border-border bg-gradient-to-br from-primary to-accent text-primary-foreground shadow-[0_24px_80px_rgba(189,17,74,0.35)] hover:-translate-y-1 hover:shadow-[0_30px_90px_rgba(189,17,74,0.42)]',
    muted: 'text-primary-foreground/80',
    title: 'text-primary-foreground',
    badge: 'bg-secondary text-foreground',
  },
  'catalog-grid': {
    frame: 'rounded-[1.8rem] border border-border bg-muted shadow-[0_18px_58px_rgba(189,17,74,0.1)] hover:-translate-y-1 hover:shadow-[0_28px_70px_rgba(189,17,74,0.14)]',
    muted: 'text-muted-foreground',
    title: 'text-foreground',
    badge: 'bg-primary text-primary-foreground',
  },
} as const

const getVariantForTask = (taskKey: TaskKey) => SITE_THEME.cards[taskKey] || 'listing-elevated'

export function TaskPostCard({
  post,
  href,
  taskKey,
  compact,
}: {
  post: SitePost
  href: string
  taskKey?: TaskKey
  compact?: boolean
}) {
  if (TASK_POST_CARD_OVERRIDE_ENABLED) {
    return <TaskPostCardOverride post={post} href={href} taskKey={taskKey} compact={compact} />
  }

  const content = getContent(post)
  const image = getImageUrl(post, content)
  const rawCategory = content.category || post.tags?.[0] || 'Post'
  const normalizedCategory = normalizeCategory(rawCategory)
  const category = CATEGORY_OPTIONS.find((item) => item.slug === normalizedCategory)?.name || rawCategory
  const variant = taskKey || 'listing'
  const visualVariant = cardStyles[getVariantForTask(variant)]
  const isBookmarkVariant = variant === 'sbm' || variant === 'social'
  const imageAspect = variant === 'image' ? 'aspect-[4/5]' : variant === 'article' ? 'aspect-[16/10]' : variant === 'pdf' ? 'aspect-[4/5]' : variant === 'classified' ? 'aspect-[16/11]' : 'aspect-[4/3]'
  const altText = `${post.title} ${category} ${variant === 'listing' ? 'business listing' : variant} image`
  const imageSizes = variant === 'article' ? '(max-width: 640px) 90vw, (max-width: 1024px) 48vw, 420px' : variant === 'image' ? '(max-width: 640px) 82vw, (max-width: 1024px) 34vw, 320px' : '(max-width: 640px) 85vw, (max-width: 1024px) 42vw, 340px'

  const { recipe } = getFactoryState()
  const isDirectoryProduct = recipe.homeLayout === 'listing-home' || recipe.homeLayout === 'classified-home'
  const isDirectorySurface = isDirectoryProduct && (variant === 'listing' || variant === 'classified' || variant === 'profile')
  const isImageCard = variant === 'image'
  const isProfileCard = variant === 'profile'

  if (isDirectorySurface) {
    const cardTone = recipe.brandPack === 'market-utility'
      ? {
          frame: 'rounded-[1.75rem] border border-border bg-card shadow-[0_18px_44px_rgba(64,76,34,0.08)] hover:-translate-y-1 hover:shadow-[0_22px_50px_rgba(64,76,34,0.14)]',
          badge: 'bg-primary text-primary-foreground',
          muted: 'text-muted-foreground',
          title: 'text-foreground',
          cta: 'text-foreground',
        }
      : {
          frame: 'rounded-[1.75rem] border border-border bg-card shadow-[0_18px_44px_rgba(15,23,42,0.08)] hover:-translate-y-1 hover:shadow-[0_22px_50px_rgba(15,23,42,0.14)]',
          badge: 'bg-primary text-primary-foreground',
          muted: 'text-muted-foreground',
          title: 'text-foreground',
          cta: 'text-foreground',
        }

    return (
      <Link href={href} className={`group flex h-full flex-col overflow-hidden transition duration-300 ${cardTone.frame}`}>
        <div className="relative aspect-[16/11] overflow-hidden bg-muted">
          <ContentImage src={image} alt={altText} fill sizes={imageSizes} quality={75} className="object-cover transition-transform duration-500 group-hover:scale-[1.04]" intrinsicWidth={960} intrinsicHeight={720} />
          <div className="absolute inset-x-0 top-0 flex items-center justify-between p-4">
            <span className={`inline-flex items-center gap-1 rounded-full px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] ${cardTone.badge}`}>
              <Tag className="h-3.5 w-3.5" />
              {category}
            </span>
            <span className="rounded-full bg-card/85 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-foreground">
              {variant === 'classified' ? 'Open now' : 'Verified'}
            </span>
          </div>
        </div>
        <div className="flex flex-1 flex-col p-5">
          <div className="flex items-center justify-between gap-3">
            <h3 className={`line-clamp-2 text-xl font-semibold leading-snug ${cardTone.title}`}>{post.title}</h3>
            <ArrowUpRight className={`h-5 w-5 shrink-0 ${cardTone.muted}`} />
          </div>
          <p className={`mt-3 line-clamp-3 text-sm leading-7 ${cardTone.muted}`}>{getExcerpt(content.description || post.summary) || 'Explore this local listing.'}</p>
          <div className="mt-5 flex flex-wrap gap-3 text-xs">
            {content.location ? <span className={`inline-flex items-center gap-1 ${cardTone.muted}`}><MapPin className="h-3.5 w-3.5" />{content.location}</span> : null}
            {content.email ? <span className={`inline-flex items-center gap-1 ${cardTone.muted}`}><Mail className="h-3.5 w-3.5" />{content.email}</span> : null}
          </div>
          <div className={`mt-auto pt-5 text-sm font-semibold ${cardTone.cta}`}>{variant === 'classified' ? 'View offer' : 'View details'}</div>
        </div>
      </Link>
    )
  }

  if (isImageCard) {
    return (
      <Link href={href} className="group flex h-full flex-col overflow-hidden rounded-[2rem] border border-white/10 bg-white/6 backdrop-blur-sm transition duration-300 hover:-translate-y-1 hover:border-white/20 hover:bg-white/10 hover:shadow-[0_28px_80px_rgba(15,23,42,0.28)]">
        <div className="relative aspect-[4/5] overflow-hidden bg-[#0f172a]">
          <ContentImage src={image} alt={altText} fill sizes={imageSizes} quality={78} className="object-cover transition-transform duration-700 group-hover:scale-[1.06]" intrinsicWidth={960} intrinsicHeight={1200} />
          <div className="absolute inset-0 bg-gradient-to-t from-[#04101f]/88 via-[#04101f]/18 to-transparent" />
          <div className="absolute inset-x-0 top-0 flex items-center justify-between p-4">
            <span className="rounded-full border border-white/18 bg-black/20 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-white/88">
              {category}
            </span>
            <ArrowUpRight className="h-4 w-4 text-white/82 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </div>
          <div className="absolute inset-x-0 bottom-0 p-5">
            <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-white/70">Visual note</p>
            <h3 className="mt-2 line-clamp-2 text-2xl font-semibold leading-tight text-white">{post.title}</h3>
          </div>
        </div>
        <div className="flex flex-1 flex-col p-5 text-white">
          <p className="line-clamp-3 text-sm leading-7 text-white/72">{getExcerpt(content.description || post.summary, compact ? 110 : 150) || 'Explore this visual post.'}</p>
          <div className="mt-auto flex items-center justify-between gap-3 pt-5">
            {content.location ? <div className="inline-flex items-center gap-1 text-xs text-white/65"><MapPin className="h-3.5 w-3.5" />{content.location}</div> : <span className="text-xs uppercase tracking-[0.2em] text-white/50">Open story</span>}
            <span className="text-xs font-semibold uppercase tracking-[0.22em] text-white/78">View image</span>
          </div>
        </div>
      </Link>
    )
  }

  if (isProfileCard) {
    const initials = post.title
      .split(' ')
      .slice(0, 2)
      .map((word) => word[0])
      .join('')
      .toUpperCase()

    return (
      <Link href={href} className="group flex h-full flex-col overflow-hidden rounded-[2rem] border border-[#d9c8bd] bg-[linear-gradient(180deg,rgba(255,251,247,0.98),rgba(250,239,230,0.98))] transition duration-300 hover:-translate-y-1 hover:shadow-[0_24px_70px_rgba(80,28,36,0.14)]">
        <div className="relative px-5 pt-5">
          <div className="absolute inset-x-5 top-5 h-28 rounded-[1.5rem] bg-[radial-gradient(circle_at_top_left,rgba(174,36,72,0.14),transparent_42%),linear-gradient(135deg,rgba(255,255,255,0.95),rgba(242,225,212,0.95))]" />
          <div className="relative flex items-start gap-4">
            <div className="relative mt-8 h-20 w-20 shrink-0 overflow-hidden rounded-[1.6rem] border border-white/70 bg-white shadow-sm">
              {image !== '/placeholder.svg?height=640&width=960' ? (
                <ContentImage src={image} alt={altText} fill sizes="96px" quality={78} className="object-cover transition-transform duration-500 group-hover:scale-[1.04]" intrinsicWidth={160} intrinsicHeight={160} />
              ) : (
                <div className="flex h-full w-full items-center justify-center bg-[#f4e8dd] text-lg font-semibold text-[#6e1a37]">
                  {initials || 'P'}
                </div>
              )}
            </div>
            <div className="relative flex-1 pt-10">
              <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#8b6b5d]">{category}</p>
              <h3 className="mt-2 line-clamp-2 text-2xl font-semibold leading-tight text-[#261811]">{post.title}</h3>
              {content.location ? <div className="mt-2 inline-flex items-center gap-1 text-xs text-[#7a6155]"><MapPin className="h-3.5 w-3.5" />{content.location}</div> : null}
            </div>
          </div>
        </div>
        <div className="flex flex-1 flex-col px-5 pb-5 pt-4">
          <p className="line-clamp-4 text-sm leading-7 text-[#71574a]">{getExcerpt(content.description || post.summary, compact ? 120 : 180) || 'Explore this profile.'}</p>
          <div className="mt-auto flex items-center justify-between gap-3 pt-5">
            {content.email ? <div className="inline-flex items-center gap-1 text-xs text-[#7a6155]"><Mail className="h-3.5 w-3.5" />{content.email}</div> : <span className="text-xs uppercase tracking-[0.2em] text-[#9a7b6c]">Profile detail</span>}
            <span className="text-xs font-semibold uppercase tracking-[0.22em] text-[#261811]">Open profile</span>
          </div>
        </div>
      </Link>
    )
  }

  if (isBookmarkVariant) {
    return (
      <Link href={href} className={`group flex h-full flex-row items-start gap-4 overflow-hidden p-5 transition duration-300 ${visualVariant.frame}`}>
        <div className="mt-1 rounded-full bg-white/10 p-2.5 text-current transition group-hover:scale-105">
          <ExternalLink className="h-4 w-4" />
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <span className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] ${visualVariant.badge}`}>
              <Tag className="h-3.5 w-3.5" />
              {category}
            </span>
            {content.location ? <span className={`inline-flex items-center gap-1 text-xs ${visualVariant.muted}`}><MapPin className="h-3.5 w-3.5" />{content.location}</span> : null}
          </div>
          <h3 className={`mt-3 line-clamp-2 text-lg font-semibold leading-snug group-hover:opacity-85 ${visualVariant.title}`}>{post.title}</h3>
          <p className={`mt-2 line-clamp-3 text-sm leading-7 ${visualVariant.muted}`}>{getExcerpt(content.description || post.summary, compact ? 120 : 180) || 'Explore this bookmark.'}</p>
          {content.email ? <div className={`mt-3 inline-flex items-center gap-1 text-xs ${visualVariant.muted}`}><Mail className="h-3.5 w-3.5" />{content.email}</div> : null}
        </div>
      </Link>
    )
  }

  return (
    <Link href={href} className={`group flex h-full flex-col overflow-hidden transition duration-300 ${visualVariant.frame}`}>
      <div className={`relative ${imageAspect} overflow-hidden bg-[#ede2dc]`}>
        <ContentImage src={image} alt={altText} fill sizes={imageSizes} quality={75} className="object-cover transition-transform duration-500 group-hover:scale-[1.04]" intrinsicWidth={960} intrinsicHeight={720} />
        <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent opacity-80" />
        <span className={`absolute left-4 top-4 inline-flex items-center gap-1 rounded-full px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] ${visualVariant.badge}`}>
          <Tag className="h-3.5 w-3.5" />
          {category}
        </span>
        {variant === 'pdf' && <span className="absolute right-4 top-4 inline-flex items-center gap-1 rounded-full bg-white/88 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-950 shadow"><FileText className="h-3.5 w-3.5" />PDF</span>}
      </div>
      <div className={`flex flex-1 flex-col p-5 ${compact ? 'py-4' : ''}`}>
        <h3 className={`line-clamp-2 font-semibold leading-snug ${variant === 'article' ? 'text-[1.35rem]' : 'text-lg'} ${visualVariant.title}`}>{post.title}</h3>
        <p className={`mt-3 text-sm leading-7 ${variant === 'article' ? 'line-clamp-4' : 'line-clamp-3'} ${visualVariant.muted}`}>{getExcerpt(content.description || post.summary) || 'Explore this post.'}</p>
        <div className="mt-auto pt-4">
          {content.location && <div className={`inline-flex items-center gap-1 text-xs ${visualVariant.muted}`}><MapPin className="h-3.5 w-3.5" />{content.location}</div>}
          {content.email && <div className={`mt-2 inline-flex items-center gap-1 text-xs ${visualVariant.muted}`}><Mail className="h-3.5 w-3.5" />{content.email}</div>}
        </div>
      </div>
    </Link>
  )
}
