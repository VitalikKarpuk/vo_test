'use client'

interface CategoryBadgeProps {
  category: string
  variant?: 'default' | 'featured' | 'outline'
  className?: string
}

export default function CategoryBadge({
  category,
  variant = 'default',
  className = '',
}: CategoryBadgeProps) {
  const base =
    'inline-flex items-center gap-1.5 px-2.5 py-1 text-[0.625rem] font-sans font-semibold uppercase tracking-widest rounded-full transition-all duration-200 select-none'

  const variants: Record<string, string> = {
    default:
      'bg-primary/10 text-primary border border-primary/20 hover:bg-primary/15 hover:border-primary/35',
    featured:
      'bg-primary text-white border border-transparent hover:bg-primary/85',
    outline:
      'bg-transparent text-primary/60 border border-primary/20 hover:text-primary hover:border-primary/40',
  }

  return (
    <span className={`${base} ${variants[variant]} ${className}`}>
      <span className="w-1 h-1 rounded-full bg-current opacity-50 shrink-0" />
      {category}
    </span>
  )
}
