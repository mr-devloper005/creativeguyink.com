'use client'

import { useMemo, useState } from 'react'
import dynamic from 'next/dynamic'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, X, User, FileText, Building2, LayoutGrid, Tag, Image as ImageIcon } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useAuth } from '@/lib/auth-context'
import { SITE_CONFIG, type TaskKey } from '@/lib/site-config'
import { cn } from '@/lib/utils'
import { siteContent } from '@/config/site.content'
import { getFactoryState } from '@/design/factory/get-factory-state'
import { NAVBAR_OVERRIDE_ENABLED, NavbarOverride } from '@/overrides/navbar'

const NavbarAuthControls = dynamic(() => import('@/components/shared/navbar-auth-controls').then((mod) => mod.NavbarAuthControls), {
  ssr: false,
  loading: () => null,
})

const taskIcons: Record<TaskKey, any> = {
  article: FileText,
  listing: Building2,
  sbm: LayoutGrid,
  classified: Tag,
  image: ImageIcon,
  profile: User,
  social: LayoutGrid,
  pdf: FileText,
  org: Building2,
  comment: FileText,
}

const variantClasses = {
  'compact-bar': {
    shell: 'border-b border-border bg-background/95 text-foreground backdrop-blur-xl',
    logo: 'rounded-2xl border border-border bg-card shadow-sm',
    active: 'bg-primary text-primary-foreground',
    idle: 'text-muted-foreground hover:bg-accent hover:text-foreground',
    cta: 'rounded-full bg-primary text-primary-foreground hover:bg-accent',
    mobile: 'border-t border-border bg-background/95',
  },
  'editorial-bar': {
    shell: 'border-b border-border bg-background/90 text-foreground backdrop-blur-xl',
    logo: 'rounded-full border border-border bg-card shadow-sm',
    active: 'bg-primary text-primary-foreground',
    idle: 'text-muted-foreground hover:bg-secondary/20 hover:text-foreground',
    cta: 'rounded-full bg-primary text-primary-foreground hover:bg-accent',
    mobile: 'border-t border-border bg-background',
  },
  'floating-bar': {
    shell: 'border-b border-border/30 bg-background/80 text-foreground backdrop-blur-xl supports-[backdrop-filter]:bg-background/65',
    logo: 'rounded-[1.35rem] border border-border/40 bg-card shadow-[0_12px_40px_rgba(189,17,74,0.12)]',
    active: 'bg-secondary text-secondary-foreground ring-1 ring-primary/15',
    idle: 'text-muted-foreground hover:bg-accent/12 hover:text-foreground',
    cta: 'rounded-full bg-primary text-primary-foreground hover:bg-accent hover:text-accent-foreground',
    mobile: 'border-t border-border/40 bg-background/98 backdrop-blur-md',
  },
  'utility-bar': {
    shell: 'border-b border-border bg-muted/94 text-foreground backdrop-blur-xl',
    logo: 'rounded-xl border border-border bg-card shadow-sm',
    active: 'bg-primary text-primary-foreground',
    idle: 'text-muted-foreground hover:bg-secondary/30 hover:text-foreground',
    cta: 'rounded-lg bg-primary text-primary-foreground hover:bg-accent',
    mobile: 'border-t border-border bg-muted',
  },
} as const

const directoryPalette = {
  'directory-clean': {
    shell: 'border-b border-border bg-background/94 text-foreground shadow-[0_1px_0_rgba(189,17,74,0.04)] backdrop-blur-xl',
    logo: 'rounded-2xl border border-border bg-muted',
    nav: 'text-muted-foreground hover:text-foreground',
    search: 'border border-border bg-muted text-muted-foreground',
    cta: 'bg-primary text-primary-foreground hover:bg-accent',
    post: 'border border-border bg-card text-card-foreground hover:bg-secondary/10',
    mobile: 'border-t border-border bg-background',
  },
  'market-utility': {
    shell: 'border-b border-border bg-muted/96 text-foreground shadow-[0_1px_0_rgba(189,17,74,0.06)] backdrop-blur-xl',
    logo: 'rounded-xl border border-border bg-card',
    nav: 'text-muted-foreground hover:text-foreground',
    search: 'border border-border bg-card text-muted-foreground',
    cta: 'bg-primary text-primary-foreground hover:bg-accent',
    post: 'border border-border bg-card text-card-foreground hover:bg-secondary/10',
    mobile: 'border-t border-border bg-muted',
  },
} as const

export function Navbar() {
  if (NAVBAR_OVERRIDE_ENABLED) {
    return <NavbarOverride />
  }

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const pathname = usePathname()
  const { isAuthenticated } = useAuth()
  const { recipe } = getFactoryState()

  const navigation = useMemo(() => {
    const enabledList = SITE_CONFIG.tasks.filter((task) => task.enabled && task.key !== 'profile')
    const orderedKeys = [...new Set<TaskKey>(['image', recipe.primaryTask, ...recipe.enabledTasks])].filter(key => key !== 'profile')
    return orderedKeys
      .map((key) => enabledList.find((task) => task.key === key))
      .filter((task): task is (typeof SITE_CONFIG.tasks)[number] => Boolean(task))
      .slice(0, 6)
  }, [recipe.enabledTasks, recipe.primaryTask])
  const primaryNavigation = navigation.slice(0, 5)
  const mobileNavigation = navigation.map((task) => ({
    name: task.label,
    href: task.route,
    icon: taskIcons[task.key] || LayoutGrid,
  }))
  const primaryTask = SITE_CONFIG.tasks.find((task) => task.key === recipe.primaryTask && task.enabled) || navigation[0]
  const isDirectoryProduct = recipe.homeLayout === 'listing-home' || recipe.homeLayout === 'classified-home'

  if (isDirectoryProduct) {
    const palette = directoryPalette[(recipe.brandPack === 'market-utility' ? 'market-utility' : 'directory-clean') as keyof typeof directoryPalette]

    return (
      <header className={cn('sticky top-0 z-50 w-full', palette.shell)}>
        <nav className="mx-auto flex h-20 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
          <div className="flex min-w-0 items-center gap-4">
            <Link href="/" className="flex shrink-0 items-center gap-3">
              <div className={cn('flex h-12 w-12 items-center justify-center overflow-hidden p-1.5', palette.logo)}>
                <img src="/favicon.png?v=20260401" alt={`${SITE_CONFIG.name} logo`} width="48" height="48" className="h-full w-full object-contain" />
              </div>
              <div className="min-w-0 hidden sm:block">
                <span className="block truncate text-xl font-semibold">{SITE_CONFIG.name}</span>
                {siteContent.navbar.tagline && <span className="block text-[10px] uppercase tracking-[0.24em] opacity-60">{siteContent.navbar.tagline}</span>}
              </div>
            </Link>

            <div className="hidden items-center gap-5 xl:flex">
              {primaryNavigation.slice(0, 4).map((task) => {
                const isActive = pathname.startsWith(task.route)
                return (
                  <Link key={task.key} href={task.route} className={cn('text-sm font-semibold transition-colors', isActive ? 'text-foreground' : palette.nav)}>
                    {task.label}
                  </Link>
                )
              })}
            </div>
          </div>

          <div className="flex shrink-0 items-center gap-2 sm:gap-3">
            {isAuthenticated ? (
              <NavbarAuthControls />
            ) : (
              <>
                <Link
                  href="/login"
                  className="hidden rounded-full border border-border px-4 py-2 text-sm font-semibold text-foreground transition hover:bg-secondary/30 sm:inline-flex"
                >
                  Sign in
                </Link>
                <Link
                  href="/register"
                  className="hidden rounded-full bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground transition hover:bg-accent sm:inline-flex"
                >
                  Sign up
                </Link>
              </>
            )}

            <Button variant="ghost" size="icon" className="rounded-full lg:hidden" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
              {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </nav>

        {isMobileMenuOpen && (
          <div className={palette.mobile}>
            <div className="space-y-2 px-4 py-4">
              {mobileNavigation.map((item) => {
                const isActive = pathname.startsWith(item.href)
                return (
                  <Link key={item.name} href={item.href} onClick={() => setIsMobileMenuOpen(false)} className={cn('flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-semibold transition-colors', isActive ? 'bg-foreground text-background' : palette.post)}>
                    <item.icon className="h-5 w-5" />
                    {item.name}
                  </Link>
                )
              })}
            </div>
          </div>
        )}
      </header>
    )
  }

  const style = variantClasses[recipe.navbar]
  const isFloating = recipe.navbar === 'floating-bar'
  const isEditorial = recipe.navbar === 'editorial-bar'
  const isUtility = recipe.navbar === 'utility-bar'

  return (
    <header className={cn('sticky top-0 z-50 w-full', style.shell)}>
      <nav className={cn('mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 sm:px-6 lg:px-8', isFloating ? 'h-24 pt-4' : 'h-20')}>
        <div className="flex min-w-0 flex-1 items-center gap-4 lg:gap-7">
          <Link href="/" className="flex shrink-0 items-center gap-3 whitespace-nowrap pr-2">
            <div className={cn('flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden p-1.5', style.logo)}>
              <img src="/favicon.png?v=20260401" alt={`${SITE_CONFIG.name} logo`} width="48" height="48" className="h-full w-full object-contain" />
            </div>
            <div className="min-w-0 hidden sm:block">
              <span className="block truncate text-xl font-semibold">{SITE_CONFIG.name}</span>
              {siteContent.navbar.tagline && <span className="hidden text-[10px] uppercase tracking-[0.28em] opacity-70 sm:block">{siteContent.navbar.tagline}</span>}
            </div>
          </Link>

          {isEditorial ? (
            <div className="hidden min-w-0 flex-1 items-center gap-4 xl:flex">
              <div className="h-px flex-1 bg-[#d8c8bb]" />
              {primaryNavigation.map((task) => {
                const isActive = pathname.startsWith(task.route)
                return (
                  <Link key={task.key} href={task.route} className={cn('text-sm font-semibold uppercase tracking-[0.18em] transition-colors', isActive ? 'text-[#2f1d16]' : 'text-[#7b6254] hover:text-[#2f1d16]')}>
                    {task.label}
                  </Link>
                )
              })}
              <div className="h-px flex-1 bg-[#d8c8bb]" />
            </div>
          ) : isFloating ? (
            <div className="hidden min-w-0 flex-1 items-center gap-2 xl:flex">
              {primaryNavigation.map((task) => {
                const Icon = taskIcons[task.key] || LayoutGrid
                const isActive = pathname.startsWith(task.route)
                return (
                  <Link key={task.key} href={task.route} className={cn('flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold transition-colors', isActive ? style.active : style.idle)}>
                    <Icon className="h-4 w-4" />
                    <span>{task.label}</span>
                  </Link>
                )
              })}
            </div>
          ) : isUtility ? (
            <div className="hidden min-w-0 flex-1 items-center gap-2 xl:flex">
              {primaryNavigation.map((task) => {
                const isActive = pathname.startsWith(task.route)
                return (
                  <Link key={task.key} href={task.route} className={cn('rounded-lg px-3 py-2 text-sm font-semibold transition-colors', isActive ? style.active : style.idle)}>
                    {task.label}
                  </Link>
                )
              })}
            </div>
          ) : (
            <div className="hidden min-w-0 flex-1 items-center gap-1 overflow-hidden xl:flex">
              {primaryNavigation.map((task) => {
                const Icon = taskIcons[task.key] || LayoutGrid
                const isActive = pathname.startsWith(task.route)
                return (
                  <Link key={task.key} href={task.route} className={cn('flex items-center gap-2 rounded-full px-3 py-2 text-sm font-semibold transition-colors whitespace-nowrap', isActive ? style.active : style.idle)}>
                    <Icon className="h-4 w-4" />
                    <span>{task.label}</span>
                  </Link>
                )
              })}
            </div>
          )}
        </div>

        <div className="flex shrink-0 items-center gap-2 sm:gap-3">
          {isAuthenticated ? (
            <NavbarAuthControls />
          ) : (
            <>
              <Link
                href="/login"
                className="hidden rounded-full border border-border px-4 py-2 text-sm font-semibold text-foreground transition hover:bg-secondary/30 sm:inline-flex"
              >
                Sign in
              </Link>
              <Link
                href="/register"
                className="hidden rounded-full bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground transition hover:bg-accent sm:inline-flex"
              >
                Sign up
              </Link>
            </>
          )}

          <Button variant="ghost" size="icon" className="rounded-full lg:hidden" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
            {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </nav>

      {isMobileMenuOpen && (
        <div className={style.mobile}>
          <div className="space-y-2 px-4 py-4">
            {mobileNavigation.map((item) => {
              const isActive = pathname.startsWith(item.href)
              return (
                <Link key={item.name} href={item.href} onClick={() => setIsMobileMenuOpen(false)} className={cn('flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-semibold transition-colors', isActive ? style.active : style.idle)}>
                  <item.icon className="h-5 w-5" />
                  {item.name}
                </Link>
              )
            })}
          </div>
        </div>
      )}
    </header>
  )
}
