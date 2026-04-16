import React from 'react'
import Link from 'next/link'

interface GlowButtonProps {
  children: React.ReactNode
  href?: string
  onClick?: () => void
  variant?: 'primary' | 'secondary' | 'accent'
  size?: 'sm' | 'md' | 'lg'
  className?: string
  external?: boolean
}

export default function GlowButton({
  children,
  href,
  onClick,
  variant = 'primary',
  size = 'md',
  className = '',
  external = false
}: GlowButtonProps) {
  const baseClasses = 'inline-flex items-center justify-center font-medium transition-all duration-300 rounded-lg border neon-border hover:animate-glow-pulse'

  const variantClasses = {
    primary: 'bg-primary/10 text-primary border-primary/30 hover:bg-primary/20 hover:border-primary/50',
    secondary: 'bg-secondary/10 text-secondary border-secondary/30 hover:bg-secondary/20 hover:border-secondary/50',
    accent: 'bg-accent/10 text-accent border-accent/30 hover:bg-accent/20 hover:border-accent/50'
  }

  const sizeClasses = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-6 py-3 text-lg'
  }

  const combinedClasses = `${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`

  if (href) {
    if (external) {
      return (
        <a
          href={href}
          className={combinedClasses}
          target="_blank"
          rel="noopener noreferrer"
        >
          {children}
        </a>
      )
    }

    return (
      <Link href={href} className={combinedClasses}>
        {children}
      </Link>
    )
  }

  return (
    <button onClick={onClick} className={combinedClasses}>
      {children}
    </button>
  )
}