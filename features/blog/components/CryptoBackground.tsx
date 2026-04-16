import React from 'react'

interface CryptoBackgroundProps {
  className?: string
  variant?: 'subtle' | 'intense'
}

export default function CryptoBackground({ className = '', variant = 'subtle' }: CryptoBackgroundProps) {
  const intensity = variant === 'intense' ? 'opacity-20' : 'opacity-5'

  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
      {/* Blockchain pattern overlay */}
      <div className="absolute inset-0 crypto-gradient-subtle">
        {/* Floating hash symbols */}
        <div className="absolute top-1/4 left-1/4 animate-hash-float">
          <span className="text-4xl text-primary/20">#</span>
        </div>
        <div className="absolute top-1/3 right-1/4 animate-hash-float" style={{ animationDelay: '2s' }}>
          <span className="text-3xl text-secondary/20">₿</span>
        </div>
        <div className="absolute bottom-1/3 left-1/3 animate-hash-float" style={{ animationDelay: '4s' }}>
          <span className="text-2xl text-accent/20">Ξ</span>
        </div>
        <div className="absolute bottom-1/4 right-1/3 animate-hash-float" style={{ animationDelay: '1s' }}>
          <span className="text-5xl text-primary/10">⟠</span>
        </div>

        {/* Animated waves */}
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent animate-crypto-wave"></div>
          <div className="absolute top-1/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-secondary/20 to-transparent animate-crypto-wave" style={{ animationDelay: '1s' }}></div>
          <div className="absolute top-1/2 left-0 w-full h-px bg-gradient-to-r from-transparent via-accent/20 to-transparent animate-crypto-wave" style={{ animationDelay: '2s' }}></div>
          <div className="absolute bottom-1/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent animate-crypto-wave" style={{ animationDelay: '0.5s' }}></div>
          <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-secondary/20 to-transparent animate-crypto-wave" style={{ animationDelay: '1.5s' }}></div>
        </div>

        {/* Matrix rain effect */}
        <div className="absolute inset-0 overflow-hidden">
          {Array.from({ length: 20 }).map((_, i) => (
            <div
              key={i}
              className="absolute w-px h-20 bg-primary/10 animate-matrix-rain"
              style={{
                left: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 8}s`,
                animationDuration: `${8 + Math.random() * 4}s`
              }}
            />
          ))}
        </div>
      </div>

      {/* Glow orbs */}
      <div className="absolute top-1/4 left-1/4 w-32 h-32 rounded-full bg-primary/5 blur-xl animate-pulse"></div>
      <div className="absolute bottom-1/3 right-1/4 w-24 h-24 rounded-full bg-secondary/5 blur-xl animate-pulse" style={{ animationDelay: '1s' }}></div>
      <div className="absolute top-1/2 right-1/3 w-16 h-16 rounded-full bg-accent/5 blur-xl animate-pulse" style={{ animationDelay: '2s' }}></div>
    </div>
  )
}