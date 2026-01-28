"use client"

import { useEffect, useRef, useState } from "react"

const testimonials = [
  {
    id: 1,
    name: "Sarah Chen",
    title: "CEO, Tech Innovations",
    quote: "The level of service exceeded every expectation. From seamless booking to impeccable in-flight attention, Luxe Aviation redefined what private travel should be.",
    initials: "SC",
  },
  {
    id: 2,
    name: "Marcus Thompson",
    title: "Investment Partner",
    quote: "Absolute discretion and flawless execution. They understand that privacy isn't optional—it's essential. My most trusted travel partner.",
    initials: "MT",
  },
  {
    id: 3,
    name: "Elena Rodriguez",
    title: "Pharmaceutical Executive",
    quote: "The attention to detail is extraordinary. Every aspect curated to perfection. This isn't just transportation—it's an experience crafted for excellence.",
    initials: "ER",
  }
]

export function CallToAction() {
  const sectionRef = useRef<HTMLElement>(null)
  const [isVisible, setIsVisible] = useState(false)
  const [visibleItems, setVisibleItems] = useState<number[]>([])

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.2 },
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (!isVisible) return

    const itemObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const index = Number(entry.target.getAttribute("data-index"))
          if (entry.isIntersecting && !isNaN(index)) {
            setVisibleItems((prev) => [...new Set([...prev, index])])
          }
        })
      },
      { threshold: 0.1 }, // Lowered threshold so they appear sooner
    )

    const items = sectionRef.current?.querySelectorAll("[data-index]")
    items?.forEach((item) => itemObserver.observe(item))

    return () => itemObserver.disconnect()
  }, [isVisible])

  return (
    <section id="testimonials" ref={sectionRef} className="py-32 md:py-28 bg-[var(--surface-elev)]">
      <div className="container mx-auto px-6 md:px-12">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <p className={`text-[var(--text-muted)] text-sm tracking-[0.3em] uppercase mb-8 transition-all duration-700 ${
              isVisible ? "animate-fade-in-up opacity-100" : "opacity-0 translate-y-4"
            }`}>
              Testimonials
            </p>

            <h2 className={`text-3xl md:text-4xl lg:text-6xl font-serif font-medium leading-[1.1] tracking-tight mb-6 text-balance transition-all duration-700 text-[var(--text-heading)] ${
              isVisible ? "animate-fade-in-up opacity-100" : "opacity-0 translate-y-4"
            }`}
            style={{ animationDelay: "0.1s" }}
            >
              What Our Clients Say
            </h2>

            <p className={`text-[var(--text-body)] text-lg md:text-xl leading-relaxed max-w-2xl mx-auto transition-all duration-700 ${
              isVisible ? "animate-fade-in-up opacity-100" : "opacity-0 translate-y-4"
            }`}
            style={{ animationDelay: "0.2s" }}
            >
              Trusted by leaders who demand nothing less than exceptional.
            </p>
          </div>

          {/* Testimonials Grid */}
          <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
            {testimonials.map((testimonial, index) => (
              <div
                key={testimonial.id}
                data-index={index}  // Fixed: was data-testimonial-index
                className={`transition-all duration-700 ${
                  visibleItems.includes(index) ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                }`}
                style={{ transitionDelay: `${index * 150}ms` }}
              >
                <div className="bg-[var(--surface)] border border-[var(--border-subtle)] p-8 h-full flex flex-col hover:border-[var(--border-accent)] transition-colors duration-300">
                  {/* Quote */}
                  <p className="text-[var(--text-body)] leading-relaxed mb-8 flex-grow text-lg">
                    "{testimonial.quote}"
                  </p>

                  {/* Author */}
                  <div className="flex items-center gap-4 pt-6 border-t border-[var(--border-subtle)]">
                    <div className="w-12 h-12 rounded-full bg-[var(--accent-primary)] flex items-center justify-center text-[#0F1115] font-medium text-sm">
                      {testimonial.initials}
                    </div>
                    <div>
                      <p className="text-[var(--text-heading)] font-medium">
                        {testimonial.name}
                      </p>
                      <p className="text-[var(--text-muted)] text-sm">
                        {testimonial.title}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}