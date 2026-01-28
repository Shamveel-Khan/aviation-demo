"use client"

import { useEffect, useRef, useState } from "react"
import { MapPin } from "lucide-react"

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
              A curated list of key destinations we regularly operate in. Don’t see your city? Our concierge can still arrange
              access through our global network.
            </p>
          </div>

          <div className="flex items-center gap-3 text-[var(--text-muted)]">
            <MapPin className="w-4 h-4 text-[var(--accent-primary)]" />
            <span className="text-sm tracking-wide">Global coverage, tailored dispatch</span>
          </div>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
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
              <div className="h-full border border-[var(--border-subtle)] bg-[var(--surface)] p-6">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-[var(--text-heading)] font-medium text-lg leading-tight">
                      {c.city}
                    </p>
                    <p className="text-[var(--text-muted)] text-sm mt-1">
                      {c.country}
                    </p>
                  </div>
                  <span className="text-[var(--text-muted)] text-xs tracking-[0.25em] uppercase">
                    {c.code}
                  </span>
                </div>

                <div className="mt-6 pt-5 border-t border-[var(--border-subtle)] flex items-center justify-between">
                  <span className="text-[var(--text-body)] text-sm">
                    On-demand charter
                  </span>
                  <span className="text-[var(--accent-primary)] text-sm font-medium">
                    Available
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

