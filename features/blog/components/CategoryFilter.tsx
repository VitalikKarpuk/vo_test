'use client'

interface CategoryFilterProps {
  categories: string[]
  activeCategory: string | null
  onSelect?: (category: string | null) => void
}

export default function CategoryFilter({ categories, activeCategory, onSelect }: CategoryFilterProps) {
  function handleSelect(cat: string | null) {
    if (cat === null) {
      onSelect?.(null)
      return
    }
    const next = cat === activeCategory ? null : cat
    onSelect?.(next)
  }

  return (
    <div className="relative">
      {/* Gradient fade on right */}
      <div 
        className="pointer-events-none absolute right-0 top-0 z-10 h-full w-8 bg-linear-to-l from-background to-transparent" 
        aria-hidden 
      />

      {/* Filter buttons container */}
      <div
        role="listbox"
        aria-label="Filter by category"
        className="-mx-1 flex items-center gap-2 overflow-x-auto pb-2 pr-10 scrollbar-none"
      >
        {/* "All" button */}
        <button
          type="button"
          role="option"
          aria-selected={activeCategory === null}
          onClick={() => handleSelect(null)}
          className={`relative shrink-0 px-4 py-2.5 text-sm font-medium rounded-lg transition-all duration-200 whitespace-nowrap ${
            activeCategory === null
              ? 'bg-primary/15 text-primary shadow-sm shadow-primary/20'
              : 'text-muted-foreground hover:text-foreground hover:bg-muted/40'
          }`}
        >
          All
        </button>

        {/* Category buttons */}
        {categories.map((cat) => {
          const isActive = activeCategory === cat
          return (
            <button
              type="button"
              key={cat}
              role="option"
              aria-selected={isActive}
              onClick={() => handleSelect(cat)}
              className={`relative shrink-0 px-4 py-2.5 text-sm font-medium rounded-lg transition-all duration-200 whitespace-nowrap ${
                isActive
                  ? 'bg-primary/15 text-primary shadow-sm shadow-primary/20'
                  : 'text-muted-foreground hover:text-foreground hover:bg-muted/40'
              }`}
            >
              {cat}
            </button>
          )
        })}
      </div>
    </div>
  )
}
