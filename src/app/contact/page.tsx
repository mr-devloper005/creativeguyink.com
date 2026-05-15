import { Building2, FileText, Image as ImageIcon, Mail, MapPin, Phone, Sparkles, Bookmark } from 'lucide-react'
import { NavbarShell } from '@/components/shared/navbar-shell'
import { Footer } from '@/components/shared/footer'
import { SITE_CONFIG } from '@/lib/site-config'
import { getFactoryState } from '@/design/factory/get-factory-state'
import { getProductKind } from '@/design/factory/get-product-kind'
import { CONTACT_PAGE_OVERRIDE_ENABLED, ContactPageOverride } from '@/overrides/contact-page'
import { ContactLeadForm } from "@/components/shared/contact-lead-form";

function getTone(kind: ReturnType<typeof getProductKind>) {
  if (kind === 'directory') {
    return {
      shell: 'bg-[radial-gradient(circle_at_top_left,rgba(189,17,74,0.08),transparent_30%),linear-gradient(180deg,#f8f7f4_0%,#f1ece5_100%)] text-foreground',
      panel: 'border border-border bg-card shadow-[0_24px_70px_rgba(42,18,24,0.08)]',
      soft: 'border border-border bg-secondary/25',
      muted: 'text-muted-foreground',
      action: 'bg-primary text-primary-foreground hover:bg-accent',
    }
  }
  if (kind === 'editorial') {
    return {
      shell: 'bg-[radial-gradient(circle_at_top_left,rgba(189,17,74,0.08),transparent_28%),linear-gradient(180deg,#fbf7f2_0%,#f3ede5_100%)] text-foreground',
      panel: 'border border-border bg-card shadow-[0_24px_70px_rgba(42,18,24,0.08)]',
      soft: 'border border-border bg-secondary/25',
      muted: 'text-muted-foreground',
      action: 'bg-primary text-primary-foreground hover:bg-accent',
    }
  }
  if (kind === 'visual') {
    return {
      shell: 'bg-[radial-gradient(circle_at_20%_0%,rgba(250,226,81,0.18),transparent_38%),linear-gradient(180deg,#faf7f2_0%,#f0ebe4_100%)] text-foreground',
      panel: 'border border-border bg-card/95 shadow-[0_24px_70px_rgba(42,18,24,0.08)]',
      soft: 'border border-border bg-secondary/20',
      muted: 'text-muted-foreground',
      action: 'bg-primary text-primary-foreground hover:bg-accent',
    }
  }
  return {
    shell: 'bg-[radial-gradient(circle_at_top_left,rgba(189,17,74,0.08),transparent_30%),linear-gradient(180deg,#f8f6f2_0%,#f0ebe3_100%)] text-foreground',
    panel: 'border border-border bg-card shadow-[0_24px_70px_rgba(42,18,24,0.08)]',
    soft: 'border border-border bg-secondary/25',
    muted: 'text-muted-foreground',
    action: 'bg-primary text-primary-foreground hover:bg-accent',
  }
}

export default function ContactPage() {
  if (CONTACT_PAGE_OVERRIDE_ENABLED) {
    return <ContactPageOverride />
  }

  const { recipe } = getFactoryState()
  const productKind = getProductKind(recipe)
  const tone = getTone(productKind)
  const lanes =
    productKind === 'directory'
      ? [
          { icon: Building2, title: 'Business onboarding', body: 'Add listings, verify operational details, and bring your business surface live quickly.' },
          { icon: Phone, title: 'Partnership support', body: 'Talk through bulk publishing, local growth, and operational setup questions.' },
          { icon: MapPin, title: 'Coverage requests', body: 'Need a new geography or category lane? We can shape the directory around it.' },
        ]
      : productKind === 'editorial'
        ? [
            { icon: FileText, title: 'Editorial submissions', body: 'Pitch essays, columns, and long-form ideas that fit the publication.' },
            { icon: Mail, title: 'Newsletter partnerships', body: 'Coordinate sponsorships, collaborations, and issue-level campaigns.' },
            { icon: Sparkles, title: 'Contributor support', body: 'Get help with voice, formatting, and publication workflow questions.' },
          ]
        : productKind === 'visual'
          ? [
              { icon: ImageIcon, title: 'Creator collaborations', body: 'Discuss gallery launches, creator features, and visual campaigns.' },
              { icon: Sparkles, title: 'Licensing and use', body: 'Reach out about usage rights, commercial requests, and visual partnerships.' },
              { icon: Mail, title: 'Media kits', body: 'Request creator decks, editorial support, or visual feature placement.' },
            ]
          : [
              { icon: Bookmark, title: 'Collection submissions', body: 'Suggest resources, boards, and links that deserve a place in the library.' },
              { icon: Mail, title: 'Resource partnerships', body: 'Coordinate curation projects, reference pages, and link programs.' },
              { icon: Sparkles, title: 'Curator support', body: 'Need help organizing shelves, collections, or profile-connected boards?' },
            ]

  return (
    <div className={`min-h-screen ${tone.shell}`}>
      <NavbarShell />
      <main className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <section className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-start">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-muted-foreground">Contact {SITE_CONFIG.name}</p>
            <h1 className="mt-4 text-5xl font-semibold tracking-[-0.05em]">A support page that matches the product, not a generic contact form.</h1>
            <p className={`mt-5 max-w-2xl text-sm leading-8 ${tone.muted}`}>Tell us what you are trying to publish, fix, or launch. We will route it through the right lane instead of forcing every request into the same support bucket.</p>
            <div className="mt-8 space-y-4">
              {lanes.map((lane) => (
                <div key={lane.title} className={`rounded-[1.6rem] p-5 ${tone.soft}`}>
                  <lane.icon className="h-5 w-5" />
                  <h2 className="mt-3 text-xl font-semibold">{lane.title}</h2>
                  <p className={`mt-2 text-sm leading-7 ${tone.muted}`}>{lane.body}</p>
                </div>
              ))}
            </div>
          </div>

          <div className={`rounded-[2rem] p-7 ${tone.panel}`}>
            <h2 className="text-2xl font-semibold">Send a message</h2>
            <p className={`mt-3 text-sm leading-7 ${tone.muted}`}>
              Prefer email? Reach us directly and manage the address through your environment settings.
            </p>
            <form className="mt-6 grid gap-4">
              <input className="h-12 rounded-xl border border-border bg-background px-4 text-sm text-foreground placeholder:text-muted-foreground" placeholder="Your name" />
              <input className="h-12 rounded-xl border border-border bg-background px-4 text-sm text-foreground placeholder:text-muted-foreground" placeholder="Email address" />
              <input className="h-12 rounded-xl border border-border bg-background px-4 text-sm text-foreground placeholder:text-muted-foreground" placeholder="What do you need help with?" />
              <textarea className="min-h-[180px] rounded-2xl border border-border bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground" placeholder="Share the full context so we can respond with the right next step." />
              <button type="submit" className={`inline-flex h-12 items-center justify-center rounded-full px-6 text-sm font-semibold ${tone.action}`}>Send message</button>
            </form>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
