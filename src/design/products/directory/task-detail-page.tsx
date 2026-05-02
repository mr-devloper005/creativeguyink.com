import Link from 'next/link'
import { ArrowRight, Globe, Mail, MapPin, Phone, ShieldCheck, Tag } from 'lucide-react'
import { ContentImage } from '@/components/shared/content-image'
import { RichContent, formatRichHtml } from '@/components/shared/rich-content'
import { SchemaJsonLd } from '@/components/seo/schema-jsonld'
import { TaskPostCard } from '@/components/shared/task-post-card'
import type { SitePost } from '@/lib/site-connector'
import type { TaskKey } from '@/lib/site-config'

export function DirectoryTaskDetailPage({
  task,
  taskLabel,
  taskRoute,
  post,
  description,
  category,
  images,
  mapEmbedUrl,
  related,
}: {
  task: TaskKey
  taskLabel: string
  taskRoute: string
  post: SitePost
  description: string
  category: string
  images: string[]
  mapEmbedUrl: string | null
  related: SitePost[]
}) {
  const content = post.content && typeof post.content === 'object' ? (post.content as Record<string, unknown>) : {}
  const location = typeof content.address === 'string' ? content.address : typeof content.location === 'string' ? content.location : ''
  const website = typeof content.website === 'string' ? content.website : ''
  const phone = typeof content.phone === 'string' ? content.phone : ''
  const email = typeof content.email === 'string' ? content.email : ''
  const highlights = Array.isArray(content.highlights) ? content.highlights.filter((item): item is string => typeof item === 'string') : []
  const isProfile = task === 'profile'
  const profileAboutHtml = isProfile
    ? formatRichHtml(
        (typeof content.body === 'string' && content.body.trim()) ||
          (typeof content.description === 'string' && String(content.description).trim()) ||
          (typeof post.summary === 'string' && post.summary.trim()) ||
          description ||
          '',
        'Details coming soon.',
      )
    : ''
  const schemaPayload = {
    '@context': 'https://schema.org',
    '@type': isProfile ? 'Person' : 'LocalBusiness',
    name: post.title,
    description,
    image: images[0],
    url: `${taskRoute}/${post.slug}`,
    address: isProfile ? undefined : location || undefined,
    telephone: phone || undefined,
    email: isProfile ? undefined : email || undefined,
  }

  if (isProfile) {
    return (
      <div className="min-h-screen bg-white text-slate-950">
        <SchemaJsonLd data={schemaPayload} />
        <main className="mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:px-8">
          <Link href={taskRoute} className="mb-8 inline-flex items-center gap-2 text-sm font-medium text-slate-500 hover:text-slate-900">
            ← Back to {taskLabel}
          </Link>

          <div className="flex items-start gap-6 mb-8">
            <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-2xl">
              <ContentImage src={images[0]} alt={post.title} fill className="object-cover" />
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">{category || taskLabel}</p>
              <h1 className="mt-1 text-2xl font-semibold text-slate-900">{post.title}</h1>
              {website && (
                <a href={website} target="_blank" rel="noreferrer" className="mt-2 inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-slate-900">
                  <Globe className="h-3.5 w-3.5" /> {website}
                </a>
              )}
            </div>
          </div>

          <RichContent html={profileAboutHtml} className="max-w-none text-base leading-7 text-slate-600 prose-p:my-3" />

          {highlights.length > 0 && (
            <div className="mt-8 space-y-2">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">Highlights</p>
              <ul className="space-y-1 text-sm text-slate-600">
                {highlights.map((item) => (
                  <li key={item} className="flex items-center gap-2">
                    <span className="h-1 w-1 rounded-full bg-slate-400" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          )}

          <div className="mt-8 space-y-4">
            {location && (
              <div className="flex items-center gap-2 text-sm text-slate-600">
                <MapPin className="h-4 w-4 text-slate-400" />
                {location}
              </div>
            )}

            {email && (
              <a href={`mailto:${email}`} className="flex items-center gap-2 text-sm text-slate-600 hover:text-slate-900">
                <Mail className="h-4 w-4 text-slate-400" />
                {email}
              </a>
            )}

            {phone && (
              <a href={`tel:${phone}`} className="flex items-center gap-2 text-sm text-slate-600 hover:text-slate-900">
                <Phone className="h-4 w-4 text-slate-400" />
                {phone}
              </a>
            )}
          </div>

        {related.length ? (
          <section className="mt-14">
            <div className="flex items-end justify-between gap-4 border-b border-slate-200 pb-4">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-400">Related</p>
                <h2 className="mt-2 text-xl font-semibold text-slate-900">More profiles</h2>
              </div>
            </div>
            <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((item) => (
                <TaskPostCard key={item.id} post={item} href={`${taskRoute}/${item.slug}`} taskKey={task} />
              ))}
            </div>
          </section>
        ) : null}
      </main>
    </div>
  )
  }

  return (
    <div className="min-h-screen bg-[#f8fbff] text-slate-950">
      <SchemaJsonLd data={schemaPayload} />
      <main className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <Link href={taskRoute} className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-slate-600 hover:text-slate-950">
          ← Back to {taskLabel}
        </Link>

        <section className="grid gap-8 lg:grid-cols-[1.02fr_0.98fr] lg:items-start">
          <div>
            <div className="overflow-hidden rounded-[2.2rem] border border-slate-200 bg-white shadow-[0_24px_70px_rgba(15,23,42,0.08)]">
              <div className="relative h-[420px] overflow-hidden bg-slate-100">
                <ContentImage src={images[0]} alt={post.title} fill className="object-cover" />
              </div>
              {images.length > 1 ? (
                <div className="grid grid-cols-4 gap-3 p-4">
                  {images.slice(1, 5).map((image) => (
                    <div key={image} className="relative h-24 overflow-hidden rounded-2xl border border-slate-200 bg-slate-50">
                      <ContentImage src={image} alt={post.title} fill className="object-cover" />
                    </div>
                  ))}
                </div>
              ) : null}
            </div>

            <div className="mt-8 rounded-[2rem] border border-slate-200 bg-white p-7 shadow-[0_20px_60px_rgba(15,23,42,0.06)]">
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-500">About this {task}</p>
              <h2 className="mt-3 text-3xl font-semibold tracking-[-0.04em]">Structured details instead of a generic content block.</h2>
              <p className="mt-4 text-sm leading-8 text-slate-600">{description}</p>
              {highlights.length ? (
                <div className="mt-6 grid gap-3 md:grid-cols-2">
                  {highlights.slice(0, 4).map((item) => (
                    <div key={item} className="rounded-[1.4rem] border border-slate-200 bg-slate-50 px-4 py-4 text-sm text-slate-700">{item}</div>
                  ))}
                </div>
              ) : null}
            </div>
          </div>

          <div className="space-y-6">
            <div className="rounded-[2rem] border border-slate-200 bg-white p-7 shadow-[0_24px_60px_rgba(15,23,42,0.08)]">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-500">{category || taskLabel}</p>
                  <h1 className="mt-3 text-4xl font-semibold tracking-[-0.05em]">{post.title}</h1>
                </div>
                <span className="inline-flex items-center gap-2 rounded-full bg-slate-950 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-white">
                  <ShieldCheck className="h-3.5 w-3.5" /> Verified
                </span>
              </div>

              <div className="mt-6 grid gap-3">
                {location && (
                  <div className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700"><MapPin className="h-4 w-4" /> {location}</div>
                )}
                {phone && (
                  <div className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700"><Phone className="h-4 w-4" /> {phone}</div>
                )}
                {email && (
                  <div className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700"><Mail className="h-4 w-4" /> {email}</div>
                )}
                {website && (
                  <div className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700"><Globe className="h-4 w-4" /> {website}</div>
                )}
              </div>

              <div className="mt-6 flex flex-wrap gap-3">
                {website && (
                  <a href={website} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full bg-slate-950 px-5 py-3 text-sm font-semibold text-white hover:bg-slate-800">Visit website <ArrowRight className="h-4 w-4" /></a>
                )}
                <Link href={taskRoute} className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-950 hover:bg-slate-100">Browse more</Link>
              </div>
            </div>

            {mapEmbedUrl && (
              <div className="overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-[0_24px_60px_rgba(15,23,42,0.08)]">
                <div className="border-b border-slate-200 px-6 py-4">
                  <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-500">Location</p>
                </div>
                <iframe src={mapEmbedUrl} title={`${post.title} map`} className="h-[320px] w-full border-0" loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
              </div>
            )}
          </div>
        </section>

        {related.length ? (
          <section className="mt-14">
            <div className="flex items-end justify-between gap-4 border-b border-slate-200 pb-6">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-500">Related surfaces</p>
                <h2 className="mt-3 text-3xl font-semibold tracking-[-0.04em]">Keep browsing nearby matches.</h2>
              </div>
              <span className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-slate-600">
                <Tag className="h-3.5 w-3.5" /> {taskLabel}
              </span>
            </div>
            <div className="mt-8 grid gap-6 lg:grid-cols-3">
              {related.map((item) => (
                <TaskPostCard key={item.id} post={item} href={`${taskRoute}/${item.slug}`} taskKey={task} />
              ))}
            </div>
          </section>
        ) : null}
      </main>
    </div>
  )
}
