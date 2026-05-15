import { Bookmark, Building2, FileText, Image as ImageIcon, ArrowRight, Shield, Zap, Users, Star, CheckCircle } from 'lucide-react'
import { NavbarShell } from '@/components/shared/navbar-shell'
import { Footer } from '@/components/shared/footer'
import { LoginForm } from '@/components/auth/login-form'
import { getFactoryState } from '@/design/factory/get-factory-state'
import { getProductKind } from '@/design/factory/get-product-kind'
import { LOGIN_PAGE_OVERRIDE_ENABLED, LoginPageOverride } from '@/overrides/login-page'

function getLoginConfig(kind: ReturnType<typeof getProductKind>) {
  return {
    shell: 'bg-background text-foreground',
    panel: 'border border-border bg-card shadow-[0_24px_64px_rgba(189,17,74,0.08)]',
    side: 'border border-border bg-secondary/20',
    muted: 'text-muted-foreground',
    action: 'bg-primary text-primary-foreground hover:bg-accent shadow-[0_14px_40px_rgba(189,17,74,0.28)]',
    icon: kind === 'directory' ? Building2 : kind === 'editorial' ? FileText : kind === 'visual' ? ImageIcon : Bookmark,
    title: 'Welcome Back',
    subtitle: kind === 'directory' ? 'Access your business dashboard' : kind === 'editorial' ? 'Your editorial workspace awaits' : kind === 'visual' ? 'Creator studio ready' : 'Your curated space awaits',
    body: kind === 'directory' ? 'Step into your personalized workspace where every tool is tailored to your business needs.' : kind === 'editorial' ? 'Return to your sanctuary of thoughtful writing and curated content creation.' : kind === 'visual' ? 'Unleash your creativity in a space designed for visual storytellers and digital artists.' : 'Return to your personal collection of knowledge, inspiration, and carefully curated resources.',
    features: kind === 'directory' ? [
      { icon: Shield, title: 'Secure Access', desc: 'Enterprise-grade security for your business data' },
      { icon: Zap, title: 'Lightning Fast', desc: 'Instant access to all your business tools' },
      { icon: Users, title: 'Team Ready', desc: 'Collaborate seamlessly with your team members' }
    ] : kind === 'editorial' ? [
      { icon: Star, title: 'Premium Tools', desc: 'Advanced editing and publishing features' },
      { icon: Users, title: 'Writer Community', desc: 'Connect with fellow writers and editors' },
      { icon: Shield, title: 'Content Protection', desc: 'Automatic backups and version control' }
    ] : kind === 'visual' ? [
      { icon: Star, title: 'Pro Portfolio', desc: 'Showcase your best work with stunning galleries' },
      { icon: Zap, title: 'Instant Upload', desc: 'Lightning-fast media processing and delivery' },
      { icon: Users, title: 'Creator Network', desc: 'Join thousands of visual creators worldwide' }
    ] : [
      { icon: Star, title: 'Smart Collections', desc: 'AI-powered organization of your saved content' },
      { icon: Shield, title: 'Private & Secure', desc: 'Your collections are always private and encrypted' },
      { icon: Users, title: 'Community Curators', desc: 'Discover collections from trusted curators' }
    ],
    stats: kind === 'directory' ? [
      { label: 'Active Businesses', value: '10K+' },
      { label: 'Daily Logins', value: '50K+' },
      { label: 'Success Rate', value: '99.9%' }
    ] : kind === 'editorial' ? [
      { label: 'Published Articles', value: '25K+' },
      { label: 'Active Writers', value: '5K+' },
      { label: 'Reader Engagement', value: '85%' }
    ] : kind === 'visual' ? [
      { label: 'Visual Creations', value: '100K+' },
      { label: 'Active Creators', value: '15K+' },
      { label: 'Monthly Views', value: '5M+' }
    ] : [
      { label: 'Saved Items', value: '1M+' },
      { label: 'Active Curators', value: '8K+' },
      { label: 'Collections Created', value: '50K+' }
    ]
  }
}

export default function LoginPage() {
  if (LOGIN_PAGE_OVERRIDE_ENABLED) {
    return <LoginPageOverride />
  }

  const { recipe } = getFactoryState()
  const productKind = getProductKind(recipe)
  const config = getLoginConfig(productKind)
  const Icon = config.icon

  return (
    <div className={`min-h-screen ${config.shell}`}>
      <NavbarShell />
      <main className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="mb-12 text-center">
          <div className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium opacity-80">
            <CheckCircle className="h-4 w-4" />
            Secure authentication powered by industry standards
          </div>
        </div>
        
        <section className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <div className="space-y-8">
            <div className={`rounded-[3rem] p-10 ${config.side}`}>
              <div className="flex items-center gap-4">
                <div className={`rounded-2xl p-3 ${config.action} bg-opacity-10`}>
                  <Icon className="h-8 w-8" />
                </div>
                <div>
                  <h1 className="text-5xl font-bold tracking-[-0.04em]">{config.title}</h1>
                  <p className={`mt-2 text-lg font-medium ${config.muted}`}>{config.subtitle}</p>
                </div>
              </div>
              
              <p className={`mt-8 text-lg leading-8 ${config.muted}`}>{config.body}</p>
              
              <div className="mt-10 grid gap-6">
                {config.features.map((feature, index) => {
                  const FeatureIcon = feature.icon
                  return (
                    <div key={index} className="flex items-start gap-4">
                      <div className={`rounded-xl p-2 ${config.action} bg-opacity-10`}>
                        <FeatureIcon className="h-5 w-5" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold">{feature.title}</h3>
                        <p className={`mt-1 text-sm ${config.muted}`}>{feature.desc}</p>
                      </div>
                    </div>
                  )
                })}
              </div>
              
              <div className="mt-10 grid grid-cols-3 gap-6">
                {config.stats.map((stat, index) => (
                  <div key={index} className="text-center">
                    <div className="text-2xl font-bold">{stat.value}</div>
                    <div className={`mt-1 text-xs ${config.muted}`}>{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="flex items-center justify-between">
              <div className={`text-sm ${config.muted}`}>
                New to our platform?{' '}
                <a href="/register" className={`font-semibold underline hover:no-underline`}>
                  Create an account
                </a>
              </div>
              <a href="/forgot-password" className={`text-sm ${config.muted} hover:underline`}>
                Forgot password?
              </a>
            </div>
          </div>

          <div className="space-y-6">
            <div className={`rounded-[3rem] p-10 ${config.panel}`}>
              <div className="mb-8">
                <h2 className="text-2xl font-semibold">Sign In</h2>
                <p className={`mt-2 text-sm ${config.muted}`}>Enter your credentials to access your workspace</p>
              </div>
              <LoginForm actionClass={config.action} mutedClass={config.muted} />
            </div>
            
            <div className={`rounded-2xl border border-current/10 p-6 text-center ${config.side}`}>
              <div className="flex items-center justify-center gap-2 mb-3">
                <Shield className="h-5 w-5" />
                <span className="font-medium">Trusted by thousands</span>
              </div>
              <p className={`text-sm ${config.muted}`}>
                Join a community of creators, businesses, and curators who trust our platform
              </p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
