"use client"

import { useEffect, useRef, useState } from "react"
import { MapPin, Plane } from "lucide-react"

const cities = [
  { city: "Las Vegas", country: "United States", code: "LAS" },
  { city: "New York", country: "United States", code: "NYC" },
  { city: "Los Angeles", country: "United States", code: "LAX" },
  { city: "Miami", country: "United States", code: "MIA" },
  { city: "Chicago", country: "United States", code: "CHI" },
  { city: "Dallas", country: "United States", code: "DAL" },
  { city: "San Francisco", country: "United States", code: "SFO" },
]

export function Cities() {
  const [visibleItems, setVisibleItems] = useState<number[]>([])
  const [sectionVisible, setSectionVisible] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)
  const itemRefs = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return

          if (entry.target === sectionRef.current) {
            setSectionVisible(true)
            return
          }

          const index = Number(entry.target.getAttribute("data-index"))
          if (!Number.isNaN(index)) {
            setVisibleItems((prev) => [...new Set([...prev, index])])
          }
        })
      },
      { threshold: 0.2 },
    )

    if (sectionRef.current) observer.observe(sectionRef.current)
    itemRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref)
    })

    return () => observer.disconnect()
  }, [])

  return (
    <section id="cities" ref={sectionRef} className="py-32 md:py-29">
      <div className="container mx-auto px-6 md:px-12">
        <div className={`flex flex-col md:flex-row md:items-end md:justify-between gap-8 mb-16 transition-all duration-700 ${
          sectionVisible ? "animate-fade-in-up opacity-100" : "opacity-0 translate-y-4"
        }`}>
          <div className="max-w-3xl">
            <p className="text-[var(--text-muted)] text-sm tracking-[0.3em] uppercase mb-6">
              Cities Available
            </p>
            <h2 className="text-3xl md:text-4xl lg:text-6xl font-serif font-medium leading-[1.1] tracking-tight text-balance text-[var(--text-heading)]">
              Service where it matters
            </h2>
            <p className="text-[var(--text-body)] text-lg leading-relaxed mt-6">
              A curated list of key destinations we regularly operate in. Don't see your city? Our concierge can still arrange
              access through our global network.
            </p>
          </div>

          <div className="flex items-center gap-3 text-[var(--text-muted)]">
            <MapPin className="w-4 h-4 text-[var(--accent-primary)]" />
            <span className="text-sm tracking-wide">Global coverage, tailored dispatch</span>
          </div>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 md:gap-10">
          {cities.map((c, index) => (
            <div
              key={`${c.city}-${c.code}`}
              ref={(el) => {
                itemRefs.current[index] = el
              }}
              data-index={index}
              className={`transition-all duration-700 ${
                visibleItems.includes(index) ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
              }`}
              style={{ transitionDelay: `${index * 60}ms` }}
            >
              <div className="relative group">
                {/* Outer ring */}
                <div className="absolute inset-0 rounded-full border-2 border-[var(--border-subtle)] group-hover:border-[var(--accent-primary)] transition-all duration-500 group-hover:scale-105"></div>
                
                {/* Inner circle */}
                <div className="aspect-square rounded-full bg-[var(--surface)] border border-[var(--border-subtle)] p-8 flex flex-col items-center justify-center text-center relative overflow-hidden group-hover:shadow-xl transition-all duration-500">
                  {/* Subtle gradient overlay on hover */}
                  <div className="absolute inset-0 bg-gradient-to-br from-[var(--accent-primary)] to-transparent opacity-0 group-hover:opacity-5 transition-opacity duration-500"></div>
                  
                  {/* Icon at top */}
                  <div className="absolute top-6 opacity-20 group-hover:opacity-40 transition-opacity duration-500">
                    <Plane className="w-5 h-5 text-[var(--accent-primary)] transform rotate-45" />
                  </div>
                  
                  {/* Content */}
                  <div className="relative z-10 space-y-3">
                    <div>
                      <h3 className="text-[var(--text-heading)] font-medium text-xl leading-tight mb-1.5">
                        {c.city}
                      </h3>
                      <p className="text-[var(--text-muted)] text-xs tracking-wide">
                        {c.country}
                      </p>
                    </div>
                    
                    {/* Airport code badge */}
                    <div className="inline-flex items-center justify-center px-3 py-1 rounded-full border border-[var(--border-subtle)] bg-[var(--surface)]">
                      <span className="text-[var(--text-muted)] text-xs tracking-[0.2em] uppercase font-medium">
                        {c.code}
                      </span>
                    </div>
                  </div>
                  
                  {/* Status indicator at bottom */}
                  <div className="absolute bottom-6 flex items-center gap-1.5">
                    <div className="w-1.5 h-1.5 rounded-full bg-[var(--accent-primary)] animate-pulse"></div>
                    <span className="text-[var(--accent-primary)] text-xs font-medium tracking-wide">
                      Available
                    </span>
                  </div>
                </div>

                {/* Decorative corner markers */}
                <div className="absolute -top-1 -right-1 w-3 h-3 border-t-2 border-r-2 border-[var(--accent-primary)] opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="absolute -bottom-1 -left-1 w-3 h-3 border-b-2 border-l-2 border-[var(--accent-primary)] opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}