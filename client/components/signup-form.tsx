"use client"

import { useState } from "react"
import { Mail, ArrowRight, Star, CreditCard } from "lucide-react"

export function SignupForm() {
  const [email, setEmail] = useState("")
  const [submitted, setSubmitted] = useState(false)

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!email) return
    setSubmitted(true)
  }

  if (submitted) {
    return (
      <p className="py-3 text-sm font-medium text-primary text-center">
        You&apos;re on the list! We&apos;ll be in touch soon.
      </p>
    )
  }

  return (
    <div className="flex flex-col items-center gap-3 w-full">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 w-full max-w-md"
      >
        <div className="relative flex-1">
          <Mail
            className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none"
            aria-hidden="true"
          />
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            aria-label="Email address"
            className="w-full h-11 pl-9 pr-3 rounded-md border border-border bg-input text-foreground placeholder:text-muted-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring transition-shadow"
          />
        </div>

        <button
          type="submit"
          className="h-11 px-5 rounded-md bg-[#0F6B63] hover:bg-[#0c5c55] text-primary-foreground text-sm font-semibold flex items-center justify-center gap-2 cursor-pointer active:opacity-80 transition-opacity shrink-0 whitespace-nowrap"
        >
          Get started
          <ArrowRight className="w-4 h-4" aria-hidden="true" />
        </button>
      </form>

      <div className="flex items-center text-white justify-center text-muted-foreground text-xs">
        <span className="flex items-center gap-1.5">
          <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" aria-hidden="true" />
          <span className="font-semibold text-white">4.9</span>
          from 2.4k reviews
        </span>

        <span className="mx-3 w-px h-4 bg-border" aria-hidden="true" />

        <span className="flex items-center gap-1.5">
          <CreditCard className="w-3.5 h-3.5" aria-hidden="true" />
          No credit card required
        </span>
      </div>
    </div>
  )
}
