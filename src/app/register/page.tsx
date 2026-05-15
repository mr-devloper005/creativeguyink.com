import { Bookmark, Building2, FileText, Image as ImageIcon, ArrowRight, Shield, Zap, Users, Star, CheckCircle, Sparkles, Gift } from 'lucide-react'
import { NavbarShell } from '@/components/shared/navbar-shell'
import { Footer } from '@/components/shared/footer'
import { RegisterForm } from '@/components/auth/register-form'
import { getFactoryState } from '@/design/factory/get-factory-state'
import { getProductKind } from '@/design/factory/get-product-kind'
import { REGISTER_PAGE_OVERRIDE_ENABLED, RegisterPageOverride } from '@/overrides/register-page'

function getRegisterConfig(kind: ReturnType<typeof getProductKind>) {
  return {
    shell: 'bg-background text-foreground',
    panel: 'border border-border bg-card shadow-[0_24px_64px_rgba(189,17,74,0.08)]',
    side: 'border border-border bg-secondary/20',
    muted: 'text-muted-foreground',
    action: 'bg-primary text-primary-foreground hover:bg-accent shadow-[0_14px_40px_rgba(189,17,74,0.28)]',
    icon: kind === 'directory' ? Building2 : kind === 'editorial' ? FileText : kind === 'visual' ? ImageIcon : Bookmark,
    title: kind === 'directory' ? 'Join Our Business Community' : kind === 'editorial' ? 'Become a Contributor' : kind === 'visual' ? 'Create Your Visual Portfolio' : 'Start Curating Today',
    subtitle: kind === 'directory' ? 'Create your business profile' : kind === 'editorial' ? 'Start your writing journey' : kind === 'visual' ? 'Showcase your creative vision' : 'Build your knowledge library',
    body: kind === 'directory' ? 'Transform your business with powerful tools designed for modern enterprises and local businesses alike.' : kind === 'editorial' ? 'Share your voice with a community that values thoughtful, well-crafted content and meaningful discussions.' : kind === 'visual' ? 'Build a stunning visual portfolio that captures your artistic style and connects you with opportunities.' : 'Organize, discover, and share best resources from across the web with intelligent curation tools.',
    features: kind === 'directory' ? [
      { icon: Star, title: 'Business Profile', desc: 'Professional listing with verified badges and trust signals' },
      { icon: Zap, title: 'Quick Setup', desc: 'Get your business online in under 5 minutes' },
      { icon: Users, title: 'Customer Reach', desc: 'Connect with thousands of ready-to-buy customers' }
    ] : kind === 'editorial' ? [
      { icon: Star, title: 'Writer Tools', desc: 'Advanced editor with markdown support and media embedding' },
      { icon: Users, title: 'Editor Network', desc: 'Connect with experienced editors and fellow writers' },
      { icon: Shield, title: 'Content Rights', desc: 'You maintain full ownership of your published work' }
    ] : kind === 'visual' ? [
      { icon: Star, title: 'Pro Galleries', desc: 'Unlimited high-resolution image galleries with custom layouts' },
      { icon: Zap, title: 'Instant Sharing', desc: 'One-click sharing to social media and creative networks' },
      { icon: Users, title: 'Creator Community', desc: 'Join thousands of visual artists and photographers' }
    ] : [
      { icon: Star, title: 'Smart Collections', desc: 'AI-powered organization that learns your preferences' },
      { icon: Shield, title: 'Privacy First', desc: 'Your collections and reading habits are completely private' },
      { icon: Users, title: 'Curator Network', desc: 'Discover and follow expert curators in your field' }
    ],
    benefits: kind === 'directory' ? [
      'Free business listing for 30 days',
      'Priority customer support',
      'Advanced analytics dashboard',
      'Multi-location management'
    ] : kind === 'editorial' ? [
      'Free portfolio website',
      'Editorial review process',
      'Reader engagement analytics',
      'Monetization options'
    ] : kind === 'visual' ? [
      'Unlimited storage space',
      'Professional portfolio themes',
      'Advanced image analytics',
      'Commission opportunities'
    ] : [
      'Unlimited bookmarks',
      'AI-powered tagging',
      'Private collections',
      'Cross-device sync'
    ],
    stats: kind === 'directory' ? [
      { label: 'Businesses Joined', value: '10K+' },
      { label: 'Customer Reviews', value: '50K+' },
      { label: 'Success Stories', value: '2.5K+' }
    ] : kind === 'editorial' ? [
      { label: 'Writers Joined', value: '5K+' },
      { label: 'Articles Published', value: '25K+' },
      { label: 'Monthly Readers', value: '500K+' }
    ] : kind === 'visual' ? [
      { label: 'Visual Artists', value: '15K+' },
      { label: 'Artworks Shared', value: '100K+' },
      { label: 'Monthly Views', value: '5M+' }
    ] : [
      { label: 'Active Curators', value: '8K+' },
      { label: 'Resources Saved', value: '1M+' },
      { label: 'Collections Created', value: '50K+' }
    ]
  }
}

export default function RegisterPage() {
  if (REGISTER_PAGE_OVERRIDE_ENABLED) {
    return <RegisterPageOverride />
  }

  const { recipe } = getFactoryState()
  const productKind = getProductKind(recipe)
  const config = getRegisterConfig(productKind)
  const Icon = config.icon

  return (
    <div className={`min-h-screen ${config.shell}`}>
      <NavbarShell />
      <main className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="mb-12 text-center">
          <div className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium opacity-80">
            <Sparkles className="h-4 w-4" />
            Join thousands of satisfied creators and businesses
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
              
              <div className="mt-10">
                <div className="flex items-center gap-2 mb-4">
                  <Gift className="h-5 w-5" />
                  <span className="font-semibold">What you'll get:</span>
                </div>
                <div className="grid gap-3">
                  {config.benefits.map((benefit, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      <span className="text-sm">{benefit}</span>
                    </div>
                  ))}
                </div>
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
                Already have an account?{' '}
                <a href="/login" className={`font-semibold underline hover:no-underline`}>
                  Sign in here
                </a>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className={`rounded-[3rem] p-10 ${config.panel}`}>
              <div className="mb-8">
                <h2 className="text-2xl font-semibold">Create Account</h2>
                <p className={`mt-2 text-sm ${config.muted}`}>Start your journey with a personalized workspace</p>
              </div>
              <RegisterForm actionClass={config.action} mutedClass={config.muted} />
            </div>
            
            <div className={`rounded-2xl border border-current/10 p-6 ${config.side}`}>
              <div className="flex items-center justify-center gap-2 mb-3">
                <Shield className="h-5 w-5" />
                <span className="font-medium">14-day free trial</span>
              </div>
              <p className={`text-sm ${config.muted} text-center`}>
                Try all premium features risk-free. No credit card required.
              </p>
            </div>
            
            <div className={`rounded-2xl border border-current/10 p-6 ${config.side}`}>
              <div className="flex items-center justify-center gap-2 mb-3">
                <Users className="h-5 w-5" />
                <span className="font-medium">Join our community</span>
              </div>
              <p className={`text-sm ${config.muted} text-center`}>
                Get help, share ideas, and connect with other creators
              </p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
