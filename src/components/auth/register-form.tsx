'use client'

import { useEffect, type FormEvent } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Sparkles } from 'lucide-react'
import { useAuth } from '@/lib/auth-context'

export function RegisterForm({ actionClass, mutedClass }: { actionClass: string; mutedClass: string }) {
  const router = useRouter()
  const { signup, isAuthenticated } = useAuth()

  useEffect(() => {
    if (isAuthenticated) {
      router.replace('/')
    }
  }, [isAuthenticated, router])

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)
    const name = String(formData.get('name') || '').trim()
    const email = String(formData.get('email') || '').trim()
    const password = String(formData.get('password') || '')
    await signup(name, email, password)
    router.replace('/')
  }

  return (
    <>
      <p className="text-xs font-semibold uppercase tracking-[0.24em] opacity-70">Create account</p>
      <form className="mt-6 grid gap-4" onSubmit={handleSubmit}>
        <input className="h-12 rounded-xl border border-current/10 bg-transparent px-4 text-sm" name="name" placeholder="Full name" />
        <input className="h-12 rounded-xl border border-current/10 bg-transparent px-4 text-sm" name="email" placeholder="Email address" />
        <input className="h-12 rounded-xl border border-current/10 bg-transparent px-4 text-sm" name="password" placeholder="Password" type="password" />
        <input className="h-12 rounded-xl border border-current/10 bg-transparent px-4 text-sm" name="focus" placeholder="What are you creating or publishing?" />
        <button type="submit" className={`inline-flex h-12 items-center justify-center rounded-full px-6 text-sm font-semibold ${actionClass}`}>Create account</button>
      </form>
      <div className={`mt-6 flex items-center justify-between text-sm ${mutedClass}`}>
        <span>Already have an account?</span>
        <Link href="/login" className="inline-flex items-center gap-2 font-semibold hover:underline">
          <Sparkles className="h-4 w-4" />
          Sign in
        </Link>
      </div>
    </>
  )
}
